<template>
  <v-text-field-integer
    v-model="value"
    :label="label"
    :properties="{
      readonly: false,
      disabled: false,
      clearable: true,
      variant: variant,
      persistentClear: persistentClear,
      placeholder: ''
    }"
    :options="{
      inputMask: '#########',
      outputMask: '#########',
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
import Integer from "@/components/Integer.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "v-text-field-integer": Integer
  },
  data: () => ({
    value: "123456789", // 123 or "123" or "" or null
    label: "Integer"
  })
};
</script>
