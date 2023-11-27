<template>
  <v-text-field-simplemask
    v-model="value"
    v-bind:label="label"
    v-bind:properties="{
      prefix: '',
      suffix: '',
      readonly: false,
      disabled: false,
      clearable: true,
      variant: variant,
      persistentClear: persistentClear,
      placeholder: ''
    }"
    v-bind:options="{
      inputMask: '(##) #####-####',
      outputMask: '###########',
      empty: null,
      applyAfter: false,
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
    value: "99999999999",
    label: "Phone Number"
  })
};
</script>
