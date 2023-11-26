<template>
  <div>
    <v-text-field-cpf
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        readonly: false,
        disabled: false,
        variant: variant,
        clearable: true,
        placeholder: ''
      }"
      v-bind:options="{
        outputMask: '###########',
        empty: null,
        applyAfter: true
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
import Cpf from "@/components/Cpf.vue";

export default {
  props: {
    variant: String
  },
  components: {
    "v-text-field-cpf": Cpf
  },
  data: () => ({
    value: "97702036028", // 123 or "123" or "" or null
    label: "CPF (Brazilian mask)"
  })
};
</script>
