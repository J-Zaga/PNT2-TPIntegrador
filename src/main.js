import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index.js'
import '@fortawesome/fontawesome-free/css/all.css'
import { createPinia } from 'pinia'

createApp(App)
  .use(router) 
  .use(createPinia())
  .mount('#app')
