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
        <CountUp
          :from="0"
          :to="number"
          separator=","
          direction="up"
          :duration="1"
          :delay="0"
          :start-when="true"
          class-name="count-up-text"
        />
      </h1>
    </CardContent>
    <CardFooter>
      <span class="text-sm text-[#9d9d9d]">{{ desc }}</span>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import type { Slot } from 'vue'
import CountUp from '@/components/animation/CountUp.vue'

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

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
</script>
