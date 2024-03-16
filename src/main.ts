import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vueTranslateDirect from 'packages/vue-translate-directive'

import App from './App.vue'
import router from './router'

import i18nEn from '@/i18n/en/i18n.json'
import i18nZh from '@/i18n/zh/i18n.json'

const message = {
    zh: i18nZh,
    en: i18nEn
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus)
app.use(vueTranslateDirect, {
    data: message,
    locale: 'en'
  })

app.mount('#app')
