import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vueSampleDirectTranslate from 'packages/vue-translate-directive/index.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vueSampleDirectTranslate)

app.mount('#app')
