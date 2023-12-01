<template>
  <template>
    <v-row dense>
      <v-col cols="12" sm="2" md="4">
        <v-text-field
          v-bind="properties"
          name="namYear"
          ref="refYear"
          maxlength="4"
          v-model="year"
          :modelModifiers="{
            lazy: modelModifiers.lazy
          }"
          :label="label.toString().split(';')[0]"
          :placeholder="placeholder.toString().split(';')[0]"
          @keyup="keyUpYear"
          @blur="$emit('blur')"
          @click="$emit('click')"
          @focus="$emit('focus')"
          @keydown="keyDown"
          @mousedown="$emit('mousedown')"
          @mouseup="$emit('mouseup')"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="10" md="2">
        <v-text-field
          v-bind="properties"
          name="namMonth"
          ref="refMonth"
          maxlength="2"
          v-model="month"
          :modelModifiers="{
            lazy: modelModifiers.lazy
          }"
          :label="label.toString().split(';')[1]"
          :placeholder="placeholder.toString().split(';')[1]"
          @keyup="keyUpMonth"
          @blur="$emit('blur')"
          @click="$emit('click')"
          @focus="$emit('focus')"
          @keydown="keyDown"
          @mousedown="$emit('mousedown')"
          @mouseup="$emit('mouseup')"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="10" md="2">
        <v-text-field
          v-bind="properties"
          name="namStartDay"
          ref="refStartDay"
          maxlength="2"
          v-model="startDay"
          :modelModifiers="{
            lazy: modelModifiers.lazy
          }"
          :label="label.toString().split(';')[2]"
          :placeholder="placeholder.toString().split(';')[2]"
          @keyup="keyUpStartDay"
          @blur="$emit('blur')"
          @click="$emit('click')"
          @focus="$emit('focus')"
          @keydown="keyDown"
          @mousedown="$emit('mousedown')"
          @mouseup="$emit('mouseup')"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="10" md="2">
        <v-text-field
          v-bind="properties"
          name="namFinalDay"
          ref="refFinishDay"
          maxlength="2"
          v-model="finishDay"
          :modelModifiers="{
            lazy: modelModifiers.lazy
          }"
          :label="label.toString().split(';')[3]"
          :placeholder="placeholder.toString().split(';')[2]"
          @keyup="keyUpFinishDay"
          @blur="$emit('blur')"
          @click="$emit('click')"
          @focus="$emit('focus')"
          @keydown="keyDown"
          @mousedown="$emit('mousedown')"
          @mouseup="$emit('mouseup')"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </template>
</template>

<script>
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default {
  emits: [
    "update:modelValue",
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
      default: "Year;Month;StartDay;FinishDay;"
    },
    placeholder: {
      type: String,
      default: "yyyy;mm;dd;"
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
          empty: ""
        };
      }
    }
  },
  data: () => ({
    year: "",
    month: "",
    startDay: "",
    finishDay: ""
  }),
  watch: {
    value: {
      handler() {
        this.$nextTick(() => {
          if (this.modelValue) {
            this.year = this.modelValue.toString().split(";")[0];
            this.month = this.modelValue.toString().split(";")[1];
            this.startDay = this.modelValue.toString().split(";")[2];
            this.finishDay = this.modelValue.toString().split(";")[3];
          }
        });
      },
      immediate: true
    },
    year() {
      this.$emit(
        "update:modelValue",
        this.year +
          ";" +
          this.month +
          ";" +
          this.startDay +
          ";" +
          this.finishDay +
          ";"
      );
    },
    month() {
      this.$emit(
        "update:modelValue",
        this.year +
          ";" +
          this.month +
          ";" +
          this.startDay +
          ";" +
          this.finishDay +
          ";"
      );
    },
    startDay() {
      this.$emit(
        "update:modelValue",
        this.year +
          ";" +
          this.month +
          ";" +
          this.startDay +
          ";" +
          this.finishDay +
          ";"
      );
    },
    finishDay() {
      this.$emit(
        "update:modelValue",
        this.year +
          ";" +
          this.month +
          ";" +
          this.startDay +
          ";" +
          this.finishDay +
          ";"
      );
    }
  },
  methods: {
    keyDown: function ($event) {
      this.$emit("keydown", $event);

      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
        $event.preventDefault();
      }
    },
    keyUpYear() {
      if (this.year) {
        if (this.year.length === 4) {
          this.month = this.options.empty;
          this.startDay = this.options.empty;
          this.finishDay = this.options.empty;
          this.$refs.refMonth.focus();
        } else {
          if (this.year.length === 0) {
            this.year = this.options.empty;
          }
        }
      } else {
        this.month = this.options.empty;
        this.startDay = this.options.empty;
        this.finishDay = this.options.empty;
      }
    },
    keyUpMonth() {
      if (this.year && this.year.length === 4) {
        if (this.month) {
          if (Number(this.month) < 0 || Number(this.month) > 12) {
            this.month = this.options.empty;
          } else {
            if (this.month.length === 2) {
              this.$refs.refStartDay.focus();
            }
          }
        } else {
          this.startDay = this.options.empty;
          this.finishDay = this.options.empty;
        }
      } else {
        this.month = this.options.empty;
        this.$refs.refYear.focus();
      }
    },
    keyUpStartDay() {
      if (this.year && this.year.length === 4) {
        if (this.month && this.month.length === 2) {
          if (this.startDay) {
            if (this.startDay.length === 2) {
              let m = dayjs(
                this.year + "-" + this.month + "-" + this.startDay,
                "YYYY-MM-DD"
              );
              if (!m.isValid()) {
                this.startDay = this.options.empty;
              } else {
                this.$refs.refFinishDay.focus();
              }
            }
          } else {
            this.finishDay = this.options.empty;
          }
        } else {
          this.startDay = this.options.empty;
          this.$refs.refMonth.focus();
        }
      } else {
        this.startDay = this.options.empty;
        this.$refs.refYear.focus();
      }
    },
    keyUpFinishDay() {
      if (this.year && this.year.length === 4) {
        if (this.month && this.month.length === 2) {
          if (this.startDay && this.startDay.length === 2) {
            if (this.finishDay) {
              let m = dayjs(
                this.year + "-" + this.month + "-" + this.finishDay,
                "YYYY-MM-DD"
              );
              if (!m.isValid()) {
                this.finishDay = this.options.empty;
              } else {
                if (this.finishDay.length === 2) {
                  if (this.startDay > this.finishDay) {
                    this.startDay = this.options.empty;
                    this.finishDay = this.options.empty;
                    this.$refs.refStartDay.focus();
                  }
                }
              }
            }
          } else {
            this.finishDay = this.options.empty;
            this.$refs.refStartDay.focus();
          }
        } else {
          this.finishDay = this.options.empty;
          this.$refs.refMonth.focus();
        }
      } else {
        this.finishDay = this.options.empty;
        this.$refs.refYear.focus();
      }
    },

    focus: function () {
      if (!this.year) {
        this.$refs.refYear.focus();
      } else {
        if (!this.month) {
          this.$refs.refMonth.focus();
        } else {
          if (!this.startDay) {
            this.$refs.refStartDay.focus();
          } else {
            this.$refs.refFinishDay.focus();
          }
        }
      }
    }
  }
};
</script>
