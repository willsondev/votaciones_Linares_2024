import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import router from './router';
 import { registerSW } from 'virtual:pwa-register';

// Crear y montar la aplicación Vue
createApp(App).use(router).mount('#app');

// Usar el plugin vite-plugin-pwa para registrar el Service Worker automáticamente
if ('serviceWorker' in navigator) {
 

  // Registro automático del Service Worker con el plugin PWA
  registerSW({
    onRegistered(registration) {
      console.log('Service Worker registrado con éxito con el scope:', registration.scope);
    },
    onOfflineReady() {
      console.log('La aplicación está lista para funcionar sin conexión.');
    },
    onError(error) {
      console.error('Error durante el registro del Service Worker:', error);
    }
  });
}
