import { createApp } from 'vue'

import App from './App.vue'
import './assets/main.css'
import router from './router'; // Importa el router
import './registerServiceWorker'

createApp(App).use(router).mount('#app')
