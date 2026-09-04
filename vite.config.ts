import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    base: '/ISO_80369-7_Navigation/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'clean-dist-standalone',
        closeBundle() {
          const distStandalone = path.resolve(__dirname, 'dist', 'slides-standalone.html');
          if (fs.existsSync(distStandalone)) {
            fs.unlinkSync(distStandalone);
            console.log('⚡ [MECE] Cleaned 27MB standalone offline file from dist/ to avoid redundancy.');
          }
        }
      },
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.svg',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'iso_80369_7_material_evaluation_matrix.html',
          'assets/**/*'
        ],
        manifest: {
          name: 'ISO 80369-7 & 20 Medical Small-Bore Connector Validation Navigator',
          short_name: 'ISO80369 Nav',
          description: 'Medical-grade Luer connector topic search, clause comparison, laboratory test procedures, and worst-case fixture navigation app',
          theme_color: '#2563eb',
          background_color: '#0f172a',
          display: 'standalone',
          orientation: 'any',
          scope: '/ISO_80369-7_Navigation/',
          start_url: '/ISO_80369-7_Navigation/',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
          globIgnores: ['**/slides-standalone.html'],
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024 // 15MB for blueprint assets
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
