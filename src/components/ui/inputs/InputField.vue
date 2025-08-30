<template>
  <div class="input-field">
    <div class="relative" v-if="type == 'text'">
      <input
        type="text"
        :id="id"
        placeholder=" "
        v-model="model"
        @blur="handleBlur"
        autocomplete="off"
        :class="[
          {
            'focus:ring-red-500 focus:border-red-500 border-2 border-red-500': !isValid,
            'focus:ring-primary focus:border-primary border border-gray-300': isValid,
          },
          shakeClass,
        ]"
        class="peer block w-full rounded-md bg-white px-3 pt-3 pb-1 text-gray-900 placeholder-transparent focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      />
      <label
        for="username"
        :class="{
          'peer-focus:text-red-500 text-red-500': !isValid,
          'peer-focus:text-primary text-gray-500': isValid,
        }"
        class="absolute capitalize left-3 -top-3 bg-white px-1 text-sm transition-all peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm dark:bg-gray-900"
      >
        {{ lable }} <span v-if="required" class="text-red-500">*</span>
      </label>

      <template v-if="errors.length">
        <span
          class="error-msg text-sm text-red-500 font-semibold"
          v-for="(error, index) in errors"
          :key="index"
          >{{ error?.msg }}</span
        >
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'

//Reactive States====================================
const model = defineModel('inputValue')
const id = `field-${Math.random().toString(36).slice(2, 8)}`
let errors = reactive<any>([])
const shakeClass = ref('')

//Interfaces=========================================
interface Props {
  type: string
  lable: string
  required?: boolean
}

// Props=============================================
const { type = 'text', lable, required } = defineProps<Props>()

// Computed=========================================
const isValid = computed(() => errors.length === 0)

// functions=========================================
function triggerShake() {
  if (!model.value && required) {
    model.value = null
    shakeClass.value = 'animate-[shake_0.4s_ease-in-out]'
    setTimeout(() => (shakeClass.value = ''), 400)
  } else if (errors.length) {
    shakeClass.value = 'animate-[shake_0.4s_ease-in-out]'
    setTimeout(() => (shakeClass.value = ''), 400)
  }
}

function handleBlur() {
  triggerShake()
}

// Watchers==========================================
watch([() => model.value], () => {
  errors.length = 0
  const englishRegex = /^[A-Za-z]+$/
  if (model.value && !englishRegex.test(model.value as string)) {
    errors.push({ msg: 'english only allowed' })
  } else if (required && !model.value) {
    errors.push({ msg: 'This field cannot be empty' })
  }
})
</script>
