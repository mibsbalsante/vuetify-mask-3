<template>
  <v-text-field-yearmonthdayday
    v-model="value"
    :label="label"
    :placeholder="placeholder"
    :properties="{
      prefix: '',
      suffix: '',
      readonly: false,
      disabled: false,
      clearable: false,
      variant: variant,
      persistentClear: persistentClear,
      persistentPlaceholder: true
    }"
    :options="{
      empty: ''
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
import YearMonthDayDay from "@/components/YearMonthDayDay.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    "v-text-field-yearmonthdayday": YearMonthDayDay
  },
  data: () => ({
    value: "",
    label: "Ano;Mes;DiaInicial;DiaFinal;",
    placeholder: "AAAA;MM;DD;DD;"
  })
};
</script>
