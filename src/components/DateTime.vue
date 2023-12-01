<template>
  <v-text-field
    v-bind="properties"
    v-model="cmpValue"
    :label="label"
    :maxlength="options.inputMask.length"
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
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default {
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
          inputMask: "YYYY-MM-DD HH:mm:ss",
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
    },
    success: function () {
      return this.modelValue;
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
        value = dayjs(this.toDate(this.toInteger(value))).format(
          this.options.inputMask
        );
      } else {
        value = this.options.empty;
      }
      return value;
    },

    machineFormat: function (value) {
      if (value) {
        value = this.formatValue(value, this.options.inputMask);
        if (value === "") {
          value = this.options.empty;
        } else {
          // Apply the mask only only after filling
          if (value.length !== this.options.inputMask.length) {
            value = this.options.empty;
          } else {
            let stringDate = dayjs(value, this.options.inputMask).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            value = this.toMillisecond(stringDate);
            if (!value) {
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
      return this.formatDate(value, mask);
    },

    formatDate: function (value, mask) {
      value = this.clearValue(value);
      let result = "";
      let count = 0;
      if (value) {
        let arrayValue = value.toString().split("");
        let arrayMask = mask.toString().split("");
        for (var i = 0; i < arrayMask.length; i++) {
          if (i < arrayValue.length + count) {
            if (/[ymdhs]/.test(arrayMask[i].toLowerCase())) {
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

    toInteger(value) {
      return Number.parseInt(value);
    },

    /* String Date to Milliseconds */
    toMillisecond: function (value) {
      return Date.parse(value);
    },

    /* Milliseconds to Date*/
    toDate: function (value) {
      return new Date(value); // Return String
    },

    focus: function () {
      setTimeout(() => {
        this.$refs.ref.focus();
      }, 500);
    }
  }
};
</script>
