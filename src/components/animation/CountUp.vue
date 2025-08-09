<template>
  <span>{{ formattedValue }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
const {
  startVal = 0,
  endVal,
  duration = 3000,
  decimals = 2,
  locale = 'en-US',
  slowCount = 3,
  slowDelay = 250,
} = defineProps<{
  startVal?: number | string
  endVal: number | string
  duration?: number
  decimals?: number
  locale?: string
  slowCount?: number
  slowDelay?: number
}>()

const toNumber = (val: number | string): number => {
  const number = typeof val === 'string' ? parseFloat(val) : val
  return isNaN(number) ? 0 : number
}

const startValNum = ref(toNumber(startVal))
const endValNum = ref(toNumber(endVal))
let displayVal = ref(startValNum.value)

let startTime: number | null = null
let rafId: number | null = null
let isSlowPhase = false
const timeouts: number[] = []

const unit = 1 / Math.pow(10, decimals)
let threshold = endValNum.value - slowCount * unit

const formater = new Intl.NumberFormat(locale, {
  minimumFractionDigits: decimals,
  maximumFractionDigits: decimals,
})

const easeOutQuad = (t: number) => {
  return t * (2 - t)
}

const cancelAll = () => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  timeouts.forEach((id) => clearTimeout(id))
  timeouts.length = 0
}

const animate = (ts: number) => {
  if (isSlowPhase) return

  if (startTime === null) {
    startTime = ts
  }
  const elapsed = ts - startTime
  const rawProgress = Math.min(elapsed / duration, 1)
  const easedProgress = easeOutQuad(rawProgress)

  const current = startValNum.value + (endValNum.value - startValNum.value) * easedProgress

  if (rawProgress >= 1 || current >= threshold) {
    isSlowPhase = true

    if (threshold < endValNum.value) {
      for (let n = 1; n <= slowCount; n++) {
        const nextVal = threshold + n * unit

        const clamped = nextVal > endValNum.value ? endValNum.value : nextVal

        const t = window.setTimeout(() => {
          displayVal.value = clamped
        }, n * slowDelay)
        timeouts.push(t)
      }
    } else {
      displayVal.value = endValNum.value
    }
    return
  }

  displayVal.value = current
  rafId = requestAnimationFrame(animate)
}

const startAnimation = () => {
  cancelAll()
  startTime = null
  isSlowPhase = false

  startValNum.value = toNumber(startVal)
  endValNum.value = toNumber(endVal)

  threshold = endValNum.value - slowCount * unit

  if (endValNum.value <= startValNum.value) {
    displayVal.value = endValNum.value
    return
  }

  displayVal.value = startValNum.value
  rafId = requestAnimationFrame(animate)
}

onMounted(startAnimation)
onBeforeUnmount(cancelAll)

watch(
  () => [startVal, endVal, duration],
  () => {
    startAnimation()
  },
)

const formattedValue = computed(() => {
  return formater.format(displayVal.value)
})
</script>
