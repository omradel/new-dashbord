<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <InputField
      type="text"
      lable="username"
      required
      v-model:input-value="form.userName"
      rules="required|email|minLength:20"
    />
    <InputField type="text" lable="age" v-model:input-value="form.age" />
    <!-- <DataTable :columns="columns" :data="data" /> -->
  </div>
</template>

<script setup lang="ts">
import type { order } from '@/utils/columns'
import { onMounted, ref } from 'vue'
import { columns } from '@/utils/columns'
import DataTable from '@/components/ui/data-table/DataTable.vue'
import OrdersControl from './OrdersControl.vue'
import InputField from '@/components/ui/inputs/InputField.vue'
import { reactive } from 'vue'

//Reactive States
const form = reactive({
  userName: '',
  age: '',
})
</script>
