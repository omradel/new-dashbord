import './assets/main.css'
import { defineAsyncComponent } from 'vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const VueApexCharts = defineAsyncComponent(() => import('vue3-apexcharts'))

app.use(createPinia())
app.component('apexchart', VueApexCharts)
app.use(router)

app.mount('#app')
