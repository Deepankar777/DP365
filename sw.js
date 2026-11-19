// Network first, so updates arrive straight away; the cached copy keeps the app opening offline.
const C='yearone-v2';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const h=new URL(e.request.url).hostname;if(h!==location.hostname&&!/^fonts\.(googleapis|gstatic)\.com$/.test(h))return; // never cache API calls
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c)).catch(()=>{});return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
