const V="capi-v1";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("capi-")&&k!==V&&k!=="capi-fonts").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
 if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(V).then(ca=>ca.put("./index.html",c));return res}).catch(()=>caches.match("./index.html").then(m=>m||caches.match("./"))));return}
 if(u.origin===location.origin){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(ca=>ca.put(r,c))}return res})));return}
 if(/fonts\.(googleapis|gstatic)\.com$/.test(u.host)){e.respondWith(caches.open("capi-fonts").then(ca=>ca.match(r).then(m=>{const f=fetch(r).then(res=>{if(res.ok||res.type==="opaque")ca.put(r,res.clone());return res}).catch(()=>m);return m||f})))}
});
