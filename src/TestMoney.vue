<template>
  <v-text-field-money
    v-model="value"
    :label="label"
    :properties="{
      prefix: 'R$',
      readonly: false,
      disabled: disabled,
      clearable: true,
      variant: variant,
      persistentClear: persistentClear,
      placeholder: ' '
    }"
    :options="{
      locale: 'pt-BR',
      length: 11,
      precision: 2,
      empty: null
    }"
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
    }}
    <v-btn @click="$refs.ref.focus()">Focus</v-btn>
    <v-btn @click="disabled = !disabled">{{
      disabled ? "Enabled" : "Disabled"
    }}</v-btn>
  </div>
</template>

<script>
import Money from "@/components/Decimal.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "v-text-field-money": Money
  },
  data: () => ({
    value: 123456789.0, // 1.23 or "1.23" or "" or null
    label: "Money",
    disabled: false
  })
};
</script>
