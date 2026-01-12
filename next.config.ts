/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      // Match all API calls to your backend
      urlPattern: /^https:\/\/joyful-otter-53707a\.netlify\.app\/api/,
      handler: "NetworkFirst", // try network first, fallback to cache
      options: {
        cacheName: "hotel-api-cache",
        expiration: {
          maxEntries: 50,          // max 50 cached items
          maxAgeSeconds: 24 * 60 * 60, // 1 day
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
