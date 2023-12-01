<template>
  <v-text-field
    v-bind="properties"
    v-model="cmpValue"
    :modelModifiers="{
      lazy: modelModifiers.lazy
    }"
    :label="label"
    :maxlength="options.length"
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
  name: "VTextFieldDotNumber",
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
          length: 10,
          empty: ""
        };
      }
    }
  },
  data: () => ({
    internalValue: ""
  }),
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
        value = this.formatValue(value);
      } else {
        value = this.options.empty;
      }
      return value;
    },

    machineFormat: function (value) {
      if (value) {
        value = this.formatValue(value);
        if (value === "") {
          value = this.options.empty;
        }
        // Apply the mask only only after filling
        if (this.modelModifiers.lazy) {
          if (value.length !== this.options.length) {
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

    formatValue: function (value) {
      return value;
    },

    keyDown: function ($event) {
      this.$emit("keydown", $event);

      const key = $event.key;

      if (Number.isNaN(Number(key)) && !["Tab", "Backspace"].includes(key)) {
        $event.preventDefault();
      }
    },

    clearValue: function (value) {
      let result = "";
      if (value) {
        let arrayValue = value.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            result = result + arrayValue[i];
          }
        }
      }
      return result;
    },

    isInteger: function (value) {
      let result = false;
      if (Number.isInteger(parseInt(value))) {
        result = true;
      }
      return result;
    },

    focus: function () {
      setTimeout(() => {
        this.$refs.ref.focus();
      }, 500);
    }
  }
};
</script>
