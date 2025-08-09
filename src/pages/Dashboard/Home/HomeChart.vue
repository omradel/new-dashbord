<template>
  <div class="flex items-center justify-center h-full">
    <div class="text-center">
      <div class="flex justify-center">
        <AlarmClock class="w-[5rem] h-[5rem] text-[#9d9d9d]" />
      </div>
      <span class="text-lg font-bold text-[#9d9d9d]">Comming Soon</span>
    </div>
  </div>

  <!-- <Suspense>
    <template #default>
      <apexchart type="bar" height="100%" :options="chartOptions" :series="series" />
    </template>

    <template #fallback>
      <ComponentLoading />
    </template>
  </Suspense> -->
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import ComponentLoading from '@/components/loading/ComponentLoading.vue'
import { AlarmClock } from 'lucide-vue-next'
const apexchart = defineAsyncComponent(() => import('vue3-apexcharts'))

const series = ref([
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
  {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  },
])

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
  },
  colors: ['#000', '#13b982'],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 5,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return '$ ' + val + ' thousands'
      },
    },
  },
})
</script>
