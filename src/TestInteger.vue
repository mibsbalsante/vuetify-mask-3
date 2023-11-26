<template>
  <div>
    <v-text-field-integer
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        readonly: false,
        disabled: false,
        clearable: true,
        variant: variant,
        placeholder: ''
      }"
      v-bind:options="{
        inputMask: '#########',
        outputMask: '#########',
        empty: null,
        applyAfter: false
      }"
    />
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
    variant: String
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
