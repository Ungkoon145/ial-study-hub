/* IAL Revise · relay passwords for study rooms (Cloudflare Worker)

   The site asks here for a relay (TURN) password when someone opens a camera room.
   1. The request must carry a Firebase sign-in token for the IAL Revise project; we check its
      signature against Google's public keys, so only signed-in students get a password.
   2. We ask Metered for a password that expires after 4 hours, and keep it for that person for
      3 hours, so joining again reuses it (this also stops anyone requesting hundreds).
   The Metered secret key lives only in this Worker's settings (METERED_SECRET); it is never sent
   to the browser. */
const PROJECT = 'ial-revise';            // Firebase project
const APP = 'ialrevise';                 // Metered app: ialrevise.metered.live
const TTL = 4 * 3600, REUSE = 3 * 3600;  // password life, and how long one person reuses theirs
const RELAY = 'global.relay.metered.ca';

let JWKS = null, JWKS_AT = 0;
async function googleKeys(){
  if (!JWKS || Date.now() - JWKS_AT > 3600e3){
    const r = await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com');
    JWKS = (await r.json()).keys; JWKS_AT = Date.now();
  }
  return JWKS;
}
function b64u(s){ s = s.replace(/-/g, '+').replace(/_/g, '/'); s += '='.repeat((4 - s.length % 4) % 4); return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }
// returns the signed-in user's id, or null
async function verify(token){
  const parts = String(token || '').split('.'); if (parts.length !== 3) return null;
  let head, body;
  try { head = JSON.parse(new TextDecoder().decode(b64u(parts[0]))); body = JSON.parse(new TextDecoder().decode(b64u(parts[1]))); } catch(e){ return null; }
  if (head.alg !== 'RS256') return null;
  const jwk = (await googleKeys()).find(k => k.kid === head.kid); if (!jwk) return null;
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64u(parts[2]), new TextEncoder().encode(parts[0] + '.' + parts[1]));
  const now = Math.floor(Date.now() / 1000);
  if (!ok || body.aud !== PROJECT || body.iss !== 'https://securetoken.google.com/' + PROJECT || !body.sub || body.exp < now || body.iat > now + 300) return null;
  return body.sub;
}
function cors(req){
  return { 'Access-Control-Allow-Origin': req.headers.get('Origin') || '*', 'Access-Control-Allow-Headers': 'Authorization', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Max-Age': '86400', 'Vary': 'Origin' };
}
function json(req, status, data){ return new Response(JSON.stringify(data), { status, headers: Object.assign({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, cors(req)) }); }

export default {
  async fetch(req, env){
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors(req) });
    if (req.method !== 'GET') return json(req, 405, { error: 'method' });
    const uid = await verify((req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, ''));
    if (!uid) return json(req, 401, { error: 'signin' });
    if (!env.METERED_SECRET) return json(req, 500, { error: 'setup' });
    // reuse this person's password while it has at least an hour left
    const cache = caches.default, ck = new Request('https://turn.cache/' + encodeURIComponent(uid));
    let cred = null;
    const hit = await cache.match(ck);
    if (hit) cred = await hit.json();
    if (!cred){
      const r = await fetch('https://' + APP + '.metered.live/api/v1/turn/credential?secretKey=' + encodeURIComponent(env.METERED_SECRET), {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ expiryInSeconds: TTL, label: 'room-' + uid.slice(0, 12) })
      });
      if (!r.ok) return json(req, 502, { error: 'relay' });
      const d = await r.json();
      if (!d.username || !d.password) return json(req, 502, { error: 'relay' });
      cred = { username: d.username, credential: d.password, exp: Date.now() + TTL * 1000 };
      await cache.put(ck, new Response(JSON.stringify(cred), { headers: { 'Cache-Control': 'max-age=' + REUSE } }));
    }
    return json(req, 200, {
      exp: cred.exp,
      iceServers: [
        { urls: ['stun:stun.relay.metered.ca:80'] },
        { urls: ['turn:' + RELAY + ':80', 'turn:' + RELAY + ':80?transport=tcp', 'turn:' + RELAY + ':443', 'turns:' + RELAY + ':443?transport=tcp'], username: cred.username, credential: cred.credential }
      ]
    });
  }
};
