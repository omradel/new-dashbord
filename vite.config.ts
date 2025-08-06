import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
// import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    svgLoader(),
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: true,
    //   },
    //   manifest: {
    //     name: 'My Vue PWA',
    //     short_name: 'VuePWA',
    //     description: 'A progressive web app built with Vue 3',
    //     theme_color: '#42b883',
    //     background_color: '#ffffff',
    //     display: 'standalone',
    //     orientation: 'portrait',
    //     icons: [
    //       {
    //         src: '/logo.svg',
    //         sizes: '192x192',
    //         type: 'image/svg+xml',
    //       },
    //       {
    //         src: '/logo.svg',
    //         sizes: '512x512',
    //         type: 'image/svg+xml',
    //       },
    //     ],
    //   },
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    //     globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
    //     runtimeCaching: [
    //       {
    //         urlPattern: ({ request }: { request: Request }) => request.destination === 'document',
    //         handler: 'NetworkFirst',
    //         options: { cacheName: 'html-cache' },
    //       },
    //       {
    //         urlPattern: ({ request }: { request: Request }) =>
    //           request.destination === 'script' || request.destination === 'style',
    //         handler: 'StaleWhileRevalidate',
    //         options: { cacheName: 'asset-cache' },
    //       },
    //       {
    //         urlPattern: ({ request }: { request: Request }) => request.destination === 'image',
    //         handler: 'CacheFirst',
    //         options: {
    //           cacheName: 'image-cache',
    //           expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
    //         },
    //       },
    //     ],
    //   },
    //   outDir: 'dist',
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    chunkSizeWarningLimit: 600,
  },
})
