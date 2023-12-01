<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    data-app="true"
    offset-y
    max-width="100%"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-bind="{ ...properties, ...props }"
        v-model="compShow"
        :label="label"
        @click:append="(menu = true), (activeTab = 1)"
        @click:clear="menu = false"
      />
    </template>
    <v-tabs
      dark
      class="elevation-2"
      :background-color="options.tabBackgroundColor"
      v-model="activeTab"
    >
      <v-tab :key="0">
        <v-icon left>mdi-calendar-outline</v-icon>
        {{ options.tabDateTitle }}
      </v-tab>
      <v-tab :key="1">
        <v-icon left>mdi-calendar-clock</v-icon>
        {{ options.tabTimeTitle }}
      </v-tab>
      <v-tab :key="0">
        <v-card flat style="overflow: auto">
          <v-date-picker
            no-title
            v-model="modDate"
            @change="closingControl(), emit()"
            :locale="options.locale"
          ></v-date-picker>
        </v-card>
      </v-tab>
      <v-tab :key="1">
        <v-card flat>
          <v-time-picker
            landscape
            ref="refTimePicker"
            format="24hr"
            v-model="modTime"
            :color="options.tabBackgroundColor"
            :use-seconds="options.useSeconds"
            @change="(menu = false), emit()"
            :disabled="formattedDate === null || formattedDate === ''"
          ></v-time-picker>
        </v-card>
      </v-tab>
    </v-tabs>
  </v-menu>
</template>

<script>
import dayjs from "dayjs";
import customParseFormat from "dayjs/esm/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default {
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
      default: "Label"
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
        return {};
      }
    }
  },
  data: () => ({
    modDate: "",
    modTime: "00:00",
    formattedDate: "",
    menu: false,
    readonly: true,
    activeTab: 0
  }),
  computed: {
    compShow: {
      get: function () {
        const THIS = this;
        let mdf = this.modelValue
          ? (THIS.formattedDate = dayjs(this.modelValue).format(
              this.options.format
            ))
          : "";
        let mt = this.modelValue
          ? (THIS.modTime = dayjs(this.modelValue).format(
              this.options.useSeconds ? "HH:mm:ss" : "HH:mm"
            ))
          : "";
        return mdf + " " + mt;
      },
      set: function () {
        const THIS = this;
        THIS.modDate = null;
        THIS.modTime = this.options.useSeconds ? "00:00:00" : "00:00";
        THIS.formattedDate = null;
        this.$emit("update:modelValue", null);
      }
    }
  },
  watch: {
    // When computed.compShow.formattedDate is changed:
    formattedDate() {
      return this.modelValue
        ? (this.modDate = dayjs(this.modelValue).format("YYYY-MM-DD"))
        : null;
    },
    // Open always on date tab and selected hour
    menu() {
      if (!this.menu) {
        this.activeTab = 0;
        if (this.$refs.refTimePicker) {
          this.$refs.refTimePicker.selectingHour = true;
        }
      }
    }
  },
  methods: {
    emit() {
      this.$emit(
        "update:modelValue",
        this.stringToMillisecond(this.modDate, this.modTime)
      );
    },
    stringToMillisecond: function (date, time) {
      return Date.parse(date + " " + time);
    },
    closingControl() {
      if (this.options.closeOnDateClick === true) {
        this.menu = false;
      } else {
        this.activeTab = 1;
      }
    }
  }
};
</script>
