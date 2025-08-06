<template>
  <div class="relative w-6 h-6">
    <div
      v-if="isLoading"
      class="absolute inset-0 w-6 h-6 border-2 border-[#f3f3f3] border-t-black rounded-full animate-spin"
    ></div>

    <div
      class="w-full h-full icon cursor-pointer flex justify-center items-center"
      @click="changeLang(locale === 'ar' ? 'en' : 'ar')"
    >
      <img :src="locale === 'ar' ? en : ar" class="object-cover rounded-full w-5 h-5" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ar from '@/assets/images/ar.svg'
import en from '@/assets/images/en.svg'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isLoading = ref(false)

function changeLang(lang: string) {
  isLoading.value = true
  localStorage.setItem('lang', lang)

  setTimeout(() => {
    locale.value = localStorage.getItem('lang') || 'en'
    document.documentElement.lang = locale.value
    document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
    isLoading.value = false
  }, 800)
}
</script>
