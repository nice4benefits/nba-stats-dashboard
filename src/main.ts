import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { config } from '@/config'
import { globalConfig } from '@/symbols'

import App from './App.vue'
import router from './router'
import '@/assets/index.css'

router.afterEach((to) => {
  document.title = to?.meta?.pageTitle
    ? `${to.meta.pageTitle} · ${config.defaultPageTitle}`
    : config.defaultPageTitle
})

const app = createApp(App)

app.provide(globalConfig, config)
app.use(createPinia()).use(router).mount('#app')
