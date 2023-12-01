<template>
  <v-text-field
    v-bind="properties"
    v-model="cmpValue"
    :modelModifiers="{
      lazy: modelModifiers.lazy
    }"
    :label="label"
    :maxlength="inputMask.length"
    :base-color="statusColor"
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
    <template v-if="!properties.appendInnerIcon" #append-inner="props">
      <slot name="append-inner" v-bind="props">
        <v-icon v-if="success" :color="statusColor" icon="mdi-check-circle" />
      </slot>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "VTextFieldCpf",
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
          outputMask: "###########",
          empty: ""
        };
      }
    }
  },
  data: () => ({
    internalValue: "",
    inputMask: "###.###.###-##"
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
    },
    success: function () {
      return this.modelValue && this.cmpValue.length === this.inputMask.length;
    },
    statusColor: function () {
      if (this.properties.baseColor) return this.properties.baseColor;
      return this.success ? "success" : null;
    }
  },
  watch: {},
  methods: {
    humanFormat: function (value) {
      if (value) {
        value = this.formatValue(value, this.inputMask);
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
        // Apply the mask only only after filling
        if (this.modelModifiers.lazy) {
          if (value.length < this.options.outputMask.length) {
            value = this.options.empty;
          } else {
            if (!this.validateCpf(value)) {
              value = this.options.empty;
            } else {
              // Event sended after filling the mask
              this.$emit("update:masked");
            }
          }
        }
      } else {
        value = this.options.empty;
      }
      return value;
    },

    formatValue: function (value, mask) {
      return this.formatCpf(value, mask);
    },

    formatCpf: function (value, mask) {
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
      this.$emit("keydown", $event);

      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      // backspace
      if (keyCode === 8 && this.success) {
        this.cmpValue = this.options.empty;
        return;
      }

      if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
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
    },

    validateCpf: function (cpf) {
      cpf = cpf.replace(/[^\d]+/g, "");
      if (cpf == "") return false;

      // Eliminar CPFs invalidos conhecidos
      if (cpf.split("").every(char => char === cpf[0])) return false;

      // Validar 1o digito
      let add = 0;
      let rev = 0;

      for (var i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11) rev = 0;
      if (rev != parseInt(cpf.charAt(9))) return false;

      // Validar 2o digito
      add = 0;
      for (var j = 0; j < 10; j++) add += parseInt(cpf.charAt(j)) * (11 - j);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11) rev = 0;
      if (rev != parseInt(cpf.charAt(10))) return false;
      return true;
    }
  }
};
</script>
