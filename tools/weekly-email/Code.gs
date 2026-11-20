/* IAL Revise weekly email.
   The site posts each student's latest weekly summary here, signed with their Firebase sign-in token.
   This script checks the token with Google, keeps only the latest copy per student, and every Sunday at 18:00
   (Bangkok) emails it to that student's verified sign-in address. It never sends to any other address.
   Setup: paste this file and appsscript.json, run setup() once, then Deploy > New deployment > Web app
   (Execute as: Me, Who has access: Anyone). */
const API_KEY = 'AIzaSyCLV3j6Jx-v9w98q4jn5ISis6v_hSNS-oU';   // the site's public Firebase web key
const MAX_HTML = 60000, MAX_TESTS = 3, WEEK = 7 * 86400000;

function out(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doPost(e){
  try {
    const b = JSON.parse(e.postData.contents || '{}');
    const u = verify(b.token);
    if (!u) return out({ ok: false, err: 'auth' });
    if (!u.verified) return out({ ok: false, err: 'unverified' });
    const P = PropertiesService.getScriptProperties(), key = 'u_' + u.uid;
    const old = JSON.parse(P.getProperty(key) || 'null');
    if (b.action === 'off'){ P.deleteProperty(key); return out({ ok: true }); }
    if (b.action !== 'save' && b.action !== 'test') return out({ ok: false, err: 'action' });
    const html = String(b.html || ''), subject = String(b.subject || 'Your week on IAL Revise').replace(/[\r\n]+/g, ' ').slice(0, 120);
    if (!html || html.length > MAX_HTML) return out({ ok: false, err: 'size' });
    const z = Utilities.base64Encode(Utilities.gzip(Utilities.newBlob(html, 'text/html')).getBytes());
    const today = Utilities.formatDate(new Date(), 'Asia/Bangkok', 'yyyy-MM-dd');
    const rec = { e: u.email, s: subject, z: z, at: Date.now(), last: old ? old.last || 0 : 0, td: old && old.td === today ? old.td : today, tn: old && old.td === today ? old.tn || 0 : 0 };
    if (b.action === 'test'){
      if (rec.tn >= MAX_TESTS) return out({ ok: false, err: 'limit' });
      if (MailApp.getRemainingDailyQuota() < 5) return out({ ok: false, err: 'quota' });
      send(rec, html); rec.tn++;
    }
    const json = JSON.stringify(rec);
    if (json.length > 8800) return out({ ok: false, err: 'size' });
    P.setProperty(key, json);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, err: 'error' });
  }
}
function doGet(){ return out({ ok: true, service: 'IAL Revise weekly email' }); }

/* ask Google who this sign-in token belongs to */
function verify(token){
  if (!token || typeof token !== 'string' || token.length > 4000) return null;
  const r = UrlFetchApp.fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + API_KEY,
    { method: 'post', contentType: 'application/json', payload: JSON.stringify({ idToken: token }), muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return null;
  const x = (JSON.parse(r.getContentText()).users || [])[0];
  if (!x || !x.email) return null;
  return { uid: x.localId, email: x.email, verified: !!x.emailVerified };
}

function send(rec, html){
  if (!html) html = Utilities.ungzip(Utilities.newBlob(Utilities.base64Decode(rec.z), 'application/x-gzip')).getDataAsString();
  // Replies go to an address on the reserved .invalid domain, which can never receive mail, so a reply never reaches this inbox.
  MailApp.sendEmail({ to: rec.e, subject: rec.s, htmlBody: html, name: 'IAL Revise (do not reply)', replyTo: 'no-reply@ial-revise.invalid' });
}

/* Sunday 18:00: send each student the latest copy, if it was updated in the last 8 days */
function sendWeekly(){
  const P = PropertiesService.getScriptProperties(), all = P.getProperties(), now = Date.now();
  Object.keys(all).filter(k => k.indexOf('u_') === 0).forEach(k => {
    try {
      const rec = JSON.parse(all[k]);
      if (now - rec.at > 8 * 86400000) return;          // not opened the site for over a week: skip
      if (now - (rec.last || 0) < WEEK - 12 * 3600000) return;
      if (MailApp.getRemainingDailyQuota() < 1) return;
      send(rec); rec.last = now; P.setProperty(k, JSON.stringify(rec));
    } catch (err) {}
  });
}

/* run once */
function setup(){
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('sendWeekly').timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(18).nearMinute(0).create();
}
