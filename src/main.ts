import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vueTranslateDirect from 'vue-translate-directive'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vueTranslateDirect)

app.mount('#app')
