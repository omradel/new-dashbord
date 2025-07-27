<template>
  <div
    v-if="loading.appLoading"
    class="fixed inset-0 w-full h-full bg-white flex justify-center items-center z-[9999]"
  >
    <div class="text-center">
      <div
        class="w-[50px] h-[50px] border-3 border-[#f3f3f3] border-t-black rounded-full animate-spin mx-auto mb-4"
      />
      <p class="text-[#333] text-lg">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
const loading = useLoadingStore()
</script>
