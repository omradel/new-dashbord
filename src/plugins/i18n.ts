import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ar from '../locales/ar.json'

const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'ar',
  messages: {
    en,
    ar,
  },
  globalInjection: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
})

export default i18n
