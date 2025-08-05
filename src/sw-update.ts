import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    const refresh = confirm('A new version is available. Refresh now?')
    if (refresh) {
      updateSW()
    }
  },
  onOfflineReady() {
    console.log('App is ready to work offline!')
  },
})
