<template>
  <v-text-field
    v-bind="properties"
    v-model="cmpValue"
    :modelModifiers="{
      lazy: modelModifiers.lazy
    }"
    :label="label"
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
  name: "VTextFieldNegativeNumber",
  emits: [
    "update:modelValue",
    "update:signal",
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
    signal: {
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
          locale: "pt-BR",
          length: 11,
          precision: 2,
          empty: null
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
  methods: {
    humanFormat: function (typelessValue) {
      let value = Number(typelessValue);
      if (Number.isNaN(value)) {
        if (value < 0) {
          value = value * -1;
          this.$emit("update:modelValue", value);
          this.$emit("update:signal", "-");
        }
        value = value.toLocaleString(this.options.locale, {
          maximumFractionDigits: this.options.precision,
          minimumFractionDigits: this.options.precision
        });
      } else {
        value = this.options.empty;
      }
      return value;
    },

    machineFormat: function (value) {
      if (value) {
        value = this.clearNumber(value);
        // Ajustar quantidade de zeros à esquerda
        value = value.padStart(parseInt(this.options.precision) + 1, "0");
        // Incluir ponto na casa correta, conforme a precisão configurada
        value =
          value.substring(0, value.length - parseInt(this.options.precision)) +
          "." +
          value.substring(
            value.length - parseInt(this.options.precision),
            value.length
          );
        if (value === "") {
          value = this.options.empty;
        }
      } else {
        value = this.options.empty;
      }
      return value;
    },

    // Retira todos os caracteres não numéricos e zeros à esquerda
    clearNumber: function (value) {
      let result = "";
      if (value) {
        let flag = false;
        let arrayValue = value.toString().split("");
        for (var i = 0; i < arrayValue.length; i++) {
          if (this.isInteger(arrayValue[i])) {
            if (!flag) {
              // Retirar zeros à esquerda
              if (arrayValue[i] !== "0") {
                result = result + arrayValue[i];
                flag = true;
              } else {
                // Permitir zero quando valor igual a zero - Tipo 3 (Money or Percent)
                if (Number(value) === 0) {
                  result = result + arrayValue[i];
                }
              }
            } else {
              result = result + arrayValue[i];
            }
          }
        }
      }
      return result;
    },

    targetLength: function () {
      return (
        Number(this.clearNumber(this.modelValue).length) >=
        Number(this.options.length + this.options.precision)
      );
    },

    keyDown: function ($event) {
      this.$emit("keydown", $event);

      const key = $event.key;

      if (key === "+") {
        this.$emit("update:signal", ""); // +
      }
      if (key === "-") {
        this.$emit("update:signal", "-");
      }

      if (
        (Number.isNaN(Number(key)) || this.targetLength()) &&
        !["Tab", "Backspace"].includes(key)
      ) {
        $event.preventDefault();
      }
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
