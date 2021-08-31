self.addEventListener('install', e => {
    console.log('Install', e)
    e.waitUntil(
        caches.open('static').then(cache => {
            return cache.addAll([
                './',
                './style.css',
                './logo.png',
                './bg.mp3',
                './abstract.jpg',
                './script.js',
                './sound2.mp3'
            ])
        })
    )
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request)
        })
    )
})