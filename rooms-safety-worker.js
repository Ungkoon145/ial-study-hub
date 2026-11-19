/* IAL Revise: camera safety check, run off the page's main thread so it never stalls the video.
   Receives a 224x224 picture (ImageBitmap) of one video frame, returns NSFWJS scores. Nothing is stored or sent. */
let model = null, loading = null;
function load(){
  if (model) return Promise.resolve(model);
  if (!loading) loading = (async () => {
    importScripts('vendor/nsfwjs/nsfwjs.min.js', 'vendor/nsfwjs/model.min.js', 'vendor/nsfwjs/group1-shard1of1.min.js');
    model = await self.nsfwjs.load();
    return model;
  })();
  return loading;
}
self.onmessage = async e => {
  const { id, bmp } = e.data || {};
  try {
    const m = await load();
    const t0 = performance.now(), p = await m.classify(bmp, 5);
    try { bmp.close(); } catch(err){}
    self.postMessage({ id, p, took: performance.now() - t0 });
  } catch(err){ self.postMessage({ id, err: String(err && err.message || err) }); }
};
