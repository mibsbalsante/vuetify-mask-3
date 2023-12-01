<template>
  <v-text-field-filebase64
    v-model="value"
    :label="label"
    :properties="{
      variant: variant,
      persistentClear: persistentClear,
      placeholder: ' ',
      appendIcon: 'mdi-message-image-outline',
      baseColor: value && 'success'
    }"
    :options="{
      acceptFile: 'image/*'
    }"
    @fileName="fileName = $event"
  />
  <div class="d-flex flex-column justify-center align-space-between">
    <p class="base64">
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
    </p>
    fileName: {{ fileName }}
  </div>
</template>

<script>
import fileBase64 from "@/components/FileBase64.vue";

export default {
  props: {
    variant: String,
    persistentClear: {
      type: Boolean,
      default: true
    }
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

<style scoped>
.base64 {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
