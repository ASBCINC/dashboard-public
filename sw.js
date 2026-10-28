const C='fo-dash-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icons/512.png','icons/192.png','icons/apple-touch-icon.png','icons/favicon.png','icons/maskable-512.png'])))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);const nav=(e.request.mode==='navigate'||u.pathname==='/'||u.pathname==='/index.html');if(nav){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match('./')))}else if(u.origin===location.origin){e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request)))}});
