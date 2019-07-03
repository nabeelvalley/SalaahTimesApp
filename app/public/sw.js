importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
)

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)

  workbox.precaching.precacheAndRoute([])

  workbox.routing.registerRoute(
    /\//,
    workbox.strategies.cacheFirst({
      cacheName: 'home-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 10 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  )

  workbox.routing.registerRoute(
    /\.(?:ico|png|gif|jpg|js|css|html|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'static-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  )

  workbox.routing.registerRoute(
    /masjids.*/,
    workbox.strategies.cacheFirst({
      cacheName: 'times-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 0.3 * 24 * 60 * 60
        })
      ]
    })
  )

  workbox.routing.registerRoute(
    /^https:\/\/api.aladhan.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'location-times-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 5 * 24 * 60 * 60
        })
      ]
    })
  )

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets'
    })
  )

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30
        })
      ]
    })
  )
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}
