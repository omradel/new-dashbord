<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLoadingStore } from './stores/loading'
import AppLoading from './components/loading/AppLoading.vue'
import router from './router'

const loading = useLoadingStore()

router.isReady().then(() => {
  loading.setAppLoading(false)
})
</script>

<template>
  <AppLoading />
  <router-view v-slot="{ Component, route }">
    <transition :name="'fade'" mode="out-in">
      <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
    </transition>
  </router-view>
</template>
