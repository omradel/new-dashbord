<template>
  <div class="input-field">
    <div class="relative" v-if="type == 'text'">
      <input
        type="text"
        :id="id"
        placeholder=" "
        v-model="model"
        @blur="onBlur"
        @input="onInput"
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
import { reactive, ref, computed, inject } from 'vue'

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
  rules?: Array<any> | string
}

// Props=============================================
const { type = 'text', lable = 'field', required = false, rules = '' } = defineProps<Props>()

// Computed=========================================
const isValid = computed(() => errors.length === 0)

// validator inject=================================
type ValidatorAPI = {
  validate: (
    value: any,
    rules: (string | { name: string; params?: any })[],
  ) => Promise<{ valid: boolean; errors: string[] }>
}
const validator = inject<ValidatorAPI>('validator')
if (!validator) {
  console.warn('Validator plugin not found. Please provide validator via app.provide("validator")')
}

// functions=========================================
function parseRules(raw: string | any[]): (string | { name: string; params?: any })[] {
  if (!raw || (Array.isArray(raw) && raw.length === 0)) return []

  if (Array.isArray(raw)) {
    return raw
  }

  const parts = String(raw)
    .split('|')
    .map((p) => p.trim())
    .filter(Boolean)
  return parts.map((part) => {
    const [name, rest] = part.split(':', 2)
    if (rest === undefined) return name
    if (rest.includes(',')) {
      const arr = rest.split(',').map((s) => parseParam(s))
      return { name, params: arr }
    } else {
      return { name, params: parseParam(rest) }
    }
  })
}

function parseParam(p: string) {
  const trimmed = p.trim()
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false
  if (!isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed)
  return trimmed
}

async function runValidation(value: any) {
  errors.length = 0

  if (!validator) return { valid: true, errors: [] }

  const parsed = parseRules(rules)
  if (!parsed.length) {
    if (required && (value === null || value === undefined || String(value).trim() === '')) {
      errors.push('This field is required')
      triggerShake()
      return { valid: false, errors: errors }
    }
    return { valid: true, errors: [] }
  }

  try {
    const result = await validator.validate(value, parsed)
    if (!result.valid) {
      errors.push(...result.errors.map((msg) => ({ msg })))
    }
    return result
  } catch (err) {
    errors.push('Validation error')
    return { valid: false, errors: errors }
  }
}

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

function onInput() {
  runValidation(model.value)
}

function onBlur() {
  if (!model.value && required) {
    runValidation(model.value)
    triggerShake()
  }
}
</script>
