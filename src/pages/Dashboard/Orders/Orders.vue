<template>
  <DataTable :columns="columns" :data="data" />
</template>

<script setup lang="ts">
import type { order } from '@/utils/columns'
import { onMounted, ref } from 'vue'
import { columns } from '@/utils/columns'
import DataTable from '@/components/ui/DataTable.vue'

const data = ref<order[]>([])

async function getData(): Promise<order[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 0,
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 0,
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 0,
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 1,
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 2,
      email: 'm@example.com',
    },
  ]
}

onMounted(async () => {
  data.value = await getData()
})
</script>
