import { type App } from 'vue'

type RuleFn = (value: any, params?: any, ctx?: any) => boolean | string | Promise<boolean | string>

export interface ValidatorAPI {
  addRule: (name: string, fn: RuleFn) => void
  validate: (
    value: any,
    rules: (string | { name: string; params?: any })[],
    options?: { stopOnFirstError?: boolean },
  ) => Promise<{ valid: boolean; errors: string[] }>
  rules: Record<string, RuleFn>
}

export default {
  install: (app: App, options = {}) => {
    const rules: Record<string, RuleFn> = {}

    // helper to add rule
    function addRule(name: string, fn: RuleFn) {
      rules[name] = fn
    }

    // validation flow - stops on first failed rule by default
    async function validate(
      value: any,
      ruleList: (string | { name: string; params?: any })[],
      opts: { stopOnFirstError?: boolean } = { stopOnFirstError: true },
    ) {
      const errors: string[] = []
      const stopOnFirst = opts.stopOnFirstError ?? true

      for (const r of ruleList) {
        let name: string, params: any
        if (typeof r === 'string') {
          name = r
          params = undefined
        } else {
          name = r.name
          params = r.params
        }

        const fn = rules[name]
        if (!fn) {
          console.warn(`Validator: rule "${name}" not found`)
          continue
        }

        // call rule (supports sync and async)
        const res = await Promise.resolve(fn(value, params))
        if (res !== true) {
          const msg = typeof res === 'string' ? res : 'Invalid value'
          errors.push(msg)

          // stop immediately if requested
          if (stopOnFirst) {
            return { valid: false, errors }
          }

          // if not stopping early, continue checking remaining rules
        }
      }

      return { valid: errors.length === 0, errors }
    }

    const api: ValidatorAPI = { addRule, validate, rules }

    app.provide('validator', api)

    // some default rules
    addRule(
      'required',
      (v) => (v !== undefined && v !== null && String(v).trim() !== '') || 'This field is required',
    )
    addRule('minLength', (v, len) => String(v || '').length >= len || `Minimum length is ${len}`)
    addRule('maxLength', (v, len) => String(v || '').length <= len || `Maximum length is ${len}`)
    addRule('email', (v) => /\S+@\S+\.\S+/.test(String(v || '')) || 'Invalid email')
  },
}
