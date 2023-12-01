<template>
  <v-text-field
    v-bind="properties"
    v-model="cmpValue"
    :modelModifiers="{
      lazy: modelModifiers.lazy
    }"
    :label="label"
    :maxlength="options.inputMask.length"
    @blur="$emit('blur')"
    @click="$emit('click')"
    @focus="$emit('focus')"
    @keydown="keyDown"
    @mousedown="$emit('mousedown')"
    @mouseup="$emit('mouseup')"
    ref="ref"
  >
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "VTextFieldSimpleMask",
  emits: [
    "update:modelValue",
    "update:masked",
    "blur",
    "click",
    "focus",
    "keydown",
    "mousedown",
    "mouseup"
  ],
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
          inputMask: "#########",
          outputMask: "#########",
          empty: "", // v-model value when v-text-field is empty. You can use "0" or "" or null or other.
          alphanumeric: false,
          lowerCase: false
        };
      }
    }
  },
  data: () => ({}),
  /*
   v-model="cmpValue": Dessa forma, ao digitar, o valor é atualizado automaticamente no componente pai.
   O valor digitado entra pelo newValue do Set é emitido para o componente pai, retorna pelo get e pára.
  */
  computed: {
    cmpValue: {
      get: function () {
        return this.humanFormat(this.modelValue) || this.internalValue;
      },
      set: function (newValue) {
        this.internalValue = newValue;
        this.$emit("update:modelValue", this.machineFormat(newValue));
      }
    }
  },
  watch: {},
  methods: {
    humanFormat: function (value) {
      if (value) {
        value = this.formatValue(value, this.options.inputMask);
      } else {
        value = this.options.empty;
      }
      return value;
    },

    machineFormat: function (value) {
      if (value) {
        value = this.formatValue(value, this.options.outputMask);
        if (value === "") {
          value = this.options.empty;
        }
        // UpperCase or LowerCase
        if (this.options.lowerCase) {
          value = value ? value.toLowerCase() : value;
        } else {
          value = value ? value.toUpperCase() : value;
        }
        // Apply the mask only after filling
        if (this.modelModifiers.lazy) {
          if (value.length < this.options.outputMask.length) {
            value = this.options.empty;
          } else {
            // Event sended after filling the mask
            this.$emit("update:masked");
          }
        }
      } else {
        value = this.options.empty;
      }
      return value;
    },

    formatValue: function (value, mask) {
      return this.formatDefault(value, mask);
    },

    formatDefault: function (value, mask) {
      value = this.clearValue(value);
      let result = "";
      let count = 0;
      if (value) {
        let arrayValue = value.toString().split("");
        let arrayMask = mask.toString().split("");
        for (var i = 0; i < arrayMask.length; i++) {
          if (i < arrayValue.length + count) {
            if (arrayMask[i] === "#") {
              result = result + arrayValue[i - count];
            } else {
              result = result + arrayMask[i];
              count++;
            }
          }
        }
      }
      return result;
    },

    keyDown: function ($event) {
      if (!this.options.alphanumeric) {
        this.$emit("keydown", $event);

        const key = $event.key;

        if (Number.isNaN(Number(key)) && !["Tab", "Backspace"].includes(key)) {
          $event.preventDefault();
        }
      }
    },

    clearValue: function (value) {
      let result = "";
      if (value) {
        let arrayValue = value.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isValid(arrayValue[i])) {
            result = result + arrayValue[i];
          }
        }
      }
      return result;
    },

    isValid(value) {
      if (this.options.alphanumeric) {
        return this.isAlphaNumeric(value);
      } else {
        return this.isInteger;
      }
    },

    isInteger: function (value) {
      let result = false;
      if (Number.isInteger(parseInt(value))) {
        result = true;
      }
      return result;
    },

    isAlphaNumeric(value) {
      let letterNumber = /^[0-9a-zA-Z]+$/;
      if (value.match(letterNumber)) {
        return true;
      }
      return false;
    },

    focus: function () {
      setTimeout(() => {
        this.$refs.ref.focus();
      }, 500);
    }
  }
};
</script>
