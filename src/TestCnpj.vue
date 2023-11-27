<template>
  <v-text-field-cnpj
    v-model="value"
    v-bind:label="label"
    v-bind:properties="{
      disabled: false,
      variant: variant,
      persistentClear: persistentClear,
      clearable: true,
      placeholder: '',
      icon: 'mdi-check-circle'
    }"
    v-bind:options="{
      outputMask: '##############',
      empty: null,
      applyAfter: true
    }"
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
  </div>
</template>

<script>
import Cnpj from "@/components/Cnpj.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "v-text-field-cnpj": Cnpj
  },
  data: () => ({
    value: "50703512000192", // 123 or "123" or "" or null
    label: "CNPJ (Brazilian mask)"
  })
};
</script>
