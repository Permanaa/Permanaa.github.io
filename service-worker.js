importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
    console.log('Workbox berhasil dimuat')
else
    console.log('Workbox gagal dimuat')

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revison: '1' },
    { url: '/team-detail.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/icon-512x512.png', revision: '1' },
    { url: '/icon-144x144.png', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/pacakge-lock.json', revision: '1' }
], {
    ignoreUrlParametersMatching: [/.*/]
})

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    new RegExp('/js/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'soccer-cache',
        cacheExpiration: {
            maxAgeSeconds: 60 * 30
        }
    })
);

self.addEventListener('push', event => {
    var body
    if (event.data) {
        body = event.data.text()
    } else {
        body = 'Push message no payload'
    }

    var options = {
        body: body,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    )
})