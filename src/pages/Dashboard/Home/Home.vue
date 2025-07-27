<template>
  <div class="flex flex-1 flex-col gap-4 pt-0">
    <div class="grid auto-rows-min gap-4 md:grid-cols-4">
      <Card title="Total Revenue" desc="+20.1% from last month" :number="45231.89">
        <template #icon>
          <DollarSign class="w-4 h-4 text-[#9d9d9d]" />
        </template>
      </Card>

      <Card title="Total Products" desc="+20.1% from last month" :number="100">
        <template #icon>
          <ScanQrCode class="w-4 h-4 text-[#9d9d9d]" />
        </template>
      </Card>
      <Card title="Total Orders" desc="+20.1% from last month" :number="497">
        <template #icon>
          <ShoppingCart class="w-4 h-4 text-[#9d9d9d]" />
        </template>
      </Card>
      <Card title="Total Users" desc="+20.1% from last month" :number="1000">
        <template #icon>
          <UsersRound class="w-4 h-4 text-[#9d9d9d]" />
        </template>
      </Card>
    </div>
    <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
  </div>
</template>

<script setup lang="ts">
import Card from './HomeCard.vue'
import { DollarSign, ScanQrCode, ShoppingCart, UsersRound } from 'lucide-vue-next'
</script>
