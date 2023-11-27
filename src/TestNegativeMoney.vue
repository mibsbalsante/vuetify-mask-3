<template>
  <v-text-field-negative-money
    v-model="value"
    v-bind:label="label"
    v-bind:properties="{
      prefix: 'R$ ' + signal,
      readonly: false,
      disabled: disabled,
      variant: variant,
      persistentClear: persistentClear,
      clearable: true,
      placeholder: ''
    }"
    v-bind:options="{
      locale: 'pt-BR',
      length: 11,
      precision: 2,
      empty: null
    }"
    v-on:signal="signal = $event"
    ref="ref"
  />
  <div class="d-flex justify-space-between align-center">
    v-model:
    {{
      value !== null && value !== ""
        ? value
        : value === null
          ? "null"
          : value === ""
            ? "''"
            : ""
    }}<br />
    signal: {{ signal }}
  </div>
</template>

<script>
import NegativeMoney from "@/components/NegativeDecimal.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "v-text-field-negative-money": NegativeMoney
  },
  data: () => ({
    value: -123456789.0, // 1.23 or "1.23" or "" or null
    label: "Negative Money",
    disabled: false,
    signal: ""
  })
};
</script>
