import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png', 'assets/roamune-default-cover.jpg'],
      manifest: {
        name: 'Roamune Travel Journal',
        short_name: 'Roamune',
        description: 'A private, offline-first travel journal.',
        theme_color: '#101013',
        background_color: '#f3f2ef',
        display: 'standalone',
        start_url: './',
        scope: './',
        orientation: 'portrait-primary',
        icons: [
          { src: 'icons/pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webmanifest}'],
        cleanupOutdatedCaches: true
      }
    })
  ]
})
