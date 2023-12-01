<template>
  <div>
    <v-dialog v-model="showDialog" scrollable max-width="30%" v-if="fileBase64">
      <img :src="fileBase64" />
    </v-dialog>
    <v-text-field
      v-bind="properties"
      v-model="cmpValue"
      :label="label"
      @click="pickFile"
      @click:append.stop="
        showDialog ? (showDialog = false) : (showDialog = true)
      "
      readonly
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </v-text-field>
    <input
      ref="refImage"
      type="file"
      style="display: none"
      :accept="options.acceptFile"
      @change="onFilePicked"
    />
  </div>
</template>

<script>
export default {
  name: "VTextFieldFileBase64",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Number],
      default: "0"
    },
    modelModifiers: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: ""
    },
    properties: {
      type: Object,
      default: function () {
        return {};
      }
    },
    options: {
      type: Object,
      default: function () {
        return {
          acceptFile: "image/*,application/pdf"
        };
      }
    }
  },

  data: () => ({
    imageName: "",
    imageFile: "",
    fileBase64: "",
    showDialog: false
  }),

  computed: {
    cmpValue: {
      get: function () {
        this.setImage(this.modelValue);
        return this.imageName;
      }
    }
  },

  methods: {
    setImage(value) {
      this.fileBase64 = value;
    },
    pickFile() {
      this.$refs.refImage.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.addEventListener("load", () => {
          this.fileBase64 = fileReader.result;
          this.imageFile = files[0];
          this.$emit("update:modelValue", this.fileBase64);
          this.$emit("fileName", this.imageName);
        });
      } else {
        this.clear();
      }
    },
    clear() {
      this.imageName = "";
      this.imageFile = "";
      this.fileBase64 = "";
    }
  }
};
</script>
