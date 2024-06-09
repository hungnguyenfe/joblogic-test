import App from './App.vue'
import './style.css'
import { createApp } from 'vue'
import { pinia } from './store'

createApp(App).use(pinia).mount('#app')
