<template>
  <div>
    <v-text-field-cep
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        disabled: false,
        variant: variant,
        clearable: true,
        placeholder: ''
      }"
      v-bind:options="{
        outputMask: '########',
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
import Cep from "@/components/Cep.vue";

export default {
  props: {
    variant: String
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
