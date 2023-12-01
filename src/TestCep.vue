<template>
  <v-text-field-cep
    v-model="value"
    :label="label"
    :properties="{
      disabled: false,
      variant: variant,
      persistentClear: persistentClear,
      clearable: true,
      placeholder: ''
    }"
    :options="{
      outputMask: '########',
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
import Cep from "@/components/Cep.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "v-text-field-cep": Cep
  },
  data: () => ({
    value: "82515260", // 1.23 or "1.23" or "" or null
    label: "CEP (Brazilian mask)"
  })
};
</script>
