/* eslint-disable @typescript-eslint/no-require-imports */
// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      // Cache your backend API (hotel listings)
      urlPattern: /^https:\/\/joyful-otter-53707a\.netlify\.app\/api/,
      handler: "NetworkFirst",
      options: {
        cacheName: "hotel-api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
    {
      // Cache all other requests (JS, CSS, images)
      urlPattern: /.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
  ],
});

module.exports = withPWA({
  images: {
    domains: ["res.cloudinary.com"],
  },
});
