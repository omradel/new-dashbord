<template>
  <Card :title="title" :number="number" :desc="desc">
    <CardHeader>
      <CardTitle class="flex justify-between items-center pb-1">
        <div>{{ title }}</div>
        <slot v-if="icon" name="icon"></slot>
      </CardTitle>
    </CardHeader>
    <CardContent class="pb-1">
      <h1 class="font-bold text-3xl">
        <CountUp :endVal="number" :decimals="isFractions ? 2 : 0" />
      </h1>
    </CardContent>
    <CardFooter>
      <span class="text-sm text-[#9d9d9d]">{{ desc }}</span>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import type { Slot } from 'vue'
import { computed } from 'vue'
import CountUp from '@/components/ui/coutup/CountUp.vue'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  title: string
  desc: string
  number: number
}

interface Slots {
  icon?: Slot
}

const { title, number, desc } = defineProps<Props>()
const { icon } = defineSlots<Slots>()

const isFractions = computed(() => {
  return number.toString().split('').indexOf('.') !== -1
})
</script>
