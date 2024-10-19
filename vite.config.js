import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate', // Auto-registro del service worker
      manifest: {
        name: 'Elecciones Linares',
        short_name: 'Linares',
        start_url: '/', // Usa una barra "/" para evitar problemas de rutas
        display: 'standalone', // Asegura el modo standalone para la PWA
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/elecciones-192x192.png', // Asegúrate de que la ruta sea correcta
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/elecciones-512x512.png', // Asegúrate de que la ruta sea correcta
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true, // Limpia los caches obsoletos
        sourcemap: true, // Habilita el sourcemap para depuración
      }
    })
  ],
  server: {
    host: true, // Asegura que se pueda acceder desde dispositivos locales
    port: 5173, // Puerto estándar de Vite
    open: true, // Abre automáticamente el navegador al iniciar el servidor
  }
});
