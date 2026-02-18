import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'PokeWiki Retro PWA',
        short_name: 'PokeWiki',
        description: 'Pokedex con estilo retro de consolas portatiles',
        theme_color: '#ff0000',
        background_color: '#222222',
        display: 'standalone',
        icons: [
          {
            src: 'icons/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Esto permite que los datos de la PokeAPI se guarden en caché
        runtimeCaching: [{
          urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 86400 }
          }
        }]
      }
    })
  ]
})