import './assets/main.css'
import i18n from './plugins/i18n.ts'
import Validator from './plugins/validator.ts'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Validator)

app.mount('#app')
