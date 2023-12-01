<template>
  <v-text-field-cnpj
    v-model="value"
    :label="label"
    :properties="{
      disabled: false,
      variant: variant,
      persistentClear: persistentClear,
      clearable: true,
      placeholder: '',
      appendInnerIcon: 'mdi-check'
    }"
    :options="{
      outputMask: '##############',
      empty: null
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
    label: "CNPJ (Brazilian mask) - icon-append-inner prop"
  })
};
</script>
