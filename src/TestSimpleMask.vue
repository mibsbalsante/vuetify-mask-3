<template>
  <v-text-field-simplemask
    v-model="value"
    :label="label"
    :properties="{
      prefix: '',
      suffix: '',
      readonly: false,
      disabled: false,
      clearable: true,
      variant: variant,
      persistentClear: persistentClear,
      placeholder: ''
    }"
    :options="{
      inputMask: '##-####-####-###',
      outputMask: '##-####-####-###',
      empty: null,
      alphanumeric: true,
      lowerCase: false
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
import SimpleMask from "@/components/SimpleMask.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "v-text-field-simplemask": SimpleMask
  },
  data: () => ({
    value: "23-A568-B953-356", // 1.23 or "1.23" or "" or null
    label: "Simple Mask"
  })
};
</script>
