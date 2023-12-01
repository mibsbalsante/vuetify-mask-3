<template>
  <v-text-field-datetime
    v-model="value"
    :label="label"
    :properties="{
      readonly: false,
      disabled: false,
      clearable: true,
      variant: variant,
      persistentClear: persistentClear,
      placeholder: 'YYYY-MM-DD HH:mm:ss',
      'prepend-icon': 'mdi-calendar'
    }"
    :options="{
      inputMask: 'YYYY-MM-DD HH:mm:ss',
      empty: null
    }"
  >
    <template #append-inner>
      <v-icon icon="mdi-calendar-check" color="primary" />
    </template>
  </v-text-field-datetime>
  <div class="d-flex justify-space-between align-center">
    v-model:
    {{
      value !== null && value !== ""
        ? value + " (milliseconds)"
        : value === null
          ? "null"
          : value === ""
            ? "''"
            : ""
    }}
  </div>
</template>

<script>
import DateTime from "@/components/DateTime.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "v-text-field-datetime": DateTime
  },
  data: () => ({
    value: "1595386800000", // Milliseconds
    label: "DateTime - append-inner slot"
  })
};
</script>
