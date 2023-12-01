<template>
  <v-text-field-simplemask
    v-model="value"
    :label="label"
    :properties="{
      prefix: '',
      suffix: '',
      readonly: false,
      disabled: false,
      variant: variant,
      persistentClear: persistentClear,
      clearable: true,
      placeholder: ''
    }"
    :options="{
      inputMask: '#### #### #### ####',
      outputMask: '################',
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
    value: "1234432112344321",
    label: "Credit Card"
  })
};
</script>
