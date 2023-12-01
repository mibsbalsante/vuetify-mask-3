<template>
  <v-text-field-dotnumber
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
      length: 20,
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
import DotNumber from "@/components/DotNumber.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "v-text-field-dotnumber": DotNumber
  },
  data: () => ({
    value: "1.23.456.789", // 123 or "123" or "" or null
    label: "Only Dot and Number"
  })
};
</script>
