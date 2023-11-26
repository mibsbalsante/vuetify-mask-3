<template>
  <div>
    <v-text-field-filebase64
      v-model="value"
      v-bind:label="label"
      v-bind:properties="{
        variant: variant,
        placeholder: ' ',
        appendIcon: 'mdi-message-image-outline'
      }"
      v-bind:options="{
        acceptFile: 'image/*'
      }"
      v-on:fileName="fileName = $event"
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
    }}<br />
    fileName: {{ fileName }}
  </div>
</template>

<script>
// acceptFile:'image/*'
// acceptFile:'application/pdf'
// acceptFile:'image/jpeg,image/gif,image/png,application/pdf'
// acceptFile:'image/jpeg,image/gif,image/png,application/pdf,image/x-eps'

import fileBase64 from "@/components/FileBase64.vue";

export default {
  props: {
    variant: String
  },
  components: {
    "v-text-field-filebase64": fileBase64
  },
  data: () => ({
    // value: "data:image/png;base64...",
    value: "",
    fileName: "",
    label: "Select Image"
  })
};
</script>
