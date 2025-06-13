import '../src/assets/main.css' // ← IMPORTE le fichier CSS principal
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'      // ← IMPORTE le routeur

createApp(App)
  .use(router)                    // ← MONTE le routeur
  .mount('#app')
