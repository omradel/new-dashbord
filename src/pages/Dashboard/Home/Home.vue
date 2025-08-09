<template>
  <div class="flex flex-1 flex-col gap-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-4">
      <HomeCard title="Total Revenue" desc="+20.1% from last month" :number="45231.89">
        <template #icon>
          <DollarSign class="w-4 h-4 text-[#9d9d9d]" />
        </template>
      </HomeCard>

      <HomeCard title="Total Products" desc="+20.1% from last month" :number="100">
        <template #icon>
          <ScanQrCode class="w-4 h-4 text-[#9d9d9d]" />
        </template>
      </HomeCard>
      <HomeCard title="Total Orders" desc="+20.1% from last month" :number="497">
        <template #icon>
          <ShoppingCart class="w-4 h-4 text-[#9d9d9d]" />
        </template>
      </HomeCard>
      <HomeCard title="Total Users" desc="+20.1% from last month" :number="1000">
        <template #icon>
          <UsersRound class="w-4 h-4 text-[#9d9d9d]" />
        </template>
      </HomeCard>
    </div>

    <Card class="h-full p-4">
      <HomeChart />
    </Card>
  </div>
</template>

<script setup lang="ts">
import HomeCard from './HomeCard.vue'
import { Card } from '@/components/ui/card'
import HomeChart from './HomeChart.vue'

import { DollarSign, ScanQrCode, ShoppingCart, UsersRound } from 'lucide-vue-next'
</script>
