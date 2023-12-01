<template>
  <v-text-field-percent
    v-model="value"
    :label="label"
    :properties="{
      suffix: '%',
      readonly: false,
      disabled: false,
      clearable: true,
      variant: variant,
      persistentClear: persistentClear,
      placeholder: ''
    }"
    :options="{
      locale: 'pt-BR',
      length: 3,
      precision: 2,
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
    "v-text-field-percent": Money
  },
  data: () => ({
    value: "34.2", // 1.23 or "1.23" or "" or null
    label: "Percent"
  }),
  watch: {
    value: function (value) {
      if (Number(value) > 100) this.value = "100.00";
    }
  }
};
</script>
