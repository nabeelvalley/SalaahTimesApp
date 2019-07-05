importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
)

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)

  workbox.precaching.precacheAndRoute([])

  // workbox.routing.registerRoute(
  //   /\//,
  //   workbox.strategies.staleWhileRevalidate({
  //     cacheName: 'home-cache',
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         maxEntries: 50,
  //         maxAgeSeconds: 2 * 24 * 60 * 60 // 2 Days
  //       })
  //     ]
  //   })
  // )

  // workbox.routing.registerRoute(
  //   /\.(?:ico|png|gif|jpg|js|css|html|svg)$/,
  //   workbox.strategies.staleWhileRevalidate({
  //     cacheName: 'static-cache',
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         maxEntries: 50,
  //         maxAgeSeconds: 2 * 24 * 60 * 60 // 2 Days
  //       })
  //     ]
  //   })
  // )

  // workbox.routing.registerRoute(
  //   /masjids.*/,
  //   workbox.strategies.staleWhileRevalidate({
  //     cacheName: 'times-cache',
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         maxEntries: 50,
  //         maxAgeSeconds: 0.3 * 24 * 60 * 60 // 0.3 days
  //       })
  //     ]
  //   })
  // )

  workbox.routing.registerRoute(
    /^https:\/\/api.aladhan.com/,
    workbox.strategies.staleWhileRevalidate({
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

avigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister()
  }
})
