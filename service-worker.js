// 缓存名称和版本
const CACHE_NAME = 'nvc-journal-v1';
const CACHE_ASSETS = [
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css'
];

// 安装事件 - 缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('已打开缓存');
        return cache.addAll(CACHE_ASSETS);
      })
  );
  // 立即激活新的service worker
  self.skipWaiting();
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('删除旧缓存:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 立即控制所有客户端
  self.clients.claim();
});

//  fetch事件 - 处理网络请求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // 先尝试从网络获取
    fetch(event.request)
      .then((response) => {
        // 如果网络请求成功，将响应克隆并缓存
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseClone);
          });
        return response;
      })
      .catch(() => {
        // 如果网络请求失败，尝试从缓存获取
        return caches.match(event.request);
      })
  );
});