<template>
  <Button
    variant="outline"
    size="icon"
    class="border-0 dark:bg-transparent shadow-none"
    @click="mode = mode === 'dark' ? 'light' : 'dark'"
  >
    <Moon
      width="0rem"
      class="h-[0rem] w-[0rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />

    <Sun
      class="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
  </Button>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-vue-next'
const mode = useColorMode({
  initialValue: 'light',
})
</script>
