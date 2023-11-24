<template>
  <v-app id="inspire">
    <v-card-title>
      <v-toolbar dark class="elevation-2" color="cyan">
        <v-toolbar-title>vuetify-mask</v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-money />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-negative-money />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-percent />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-integer />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-creditcard />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-phonenumber />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-simplemask />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-dotnumber />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-filebase64 />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-datetime />
          </v-col>
          <v-col cols="12" sm="4" md="12">
            <v-text-field-datetimepicker />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-cpf />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-cnpj />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-cep />
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <v-text-field-yearmonthdayday />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-app>
</template>

<script>
import TestMoney from "./TestMoney.vue";
import TestNegativeMoney from "./TestNegativeMoney.vue";
import TestPercent from "./TestPercent.vue";
import TestInteger from "./TestInteger.vue";
import TestDateTime from "./TestDateTime.vue";
import TestDateTimePicker from "./TestDateTimePicker.vue";
import TestCreditCard from "./TestCreditCard.vue";
import TestPhoneNumber from "./TestPhoneNumber.vue";
import TestSimpleMask from "./TestSimpleMask.vue";
import TestCpf from "./TestCpf.vue";
import TestCnpj from "./TestCnpj.vue";
import TestCep from "./TestCep.vue";
import TestFileBase64 from "./TestFileBase64.vue";
import TestDotNumber from "./TestDotNumber.vue";
import TestYearMonthDayDay from "./TestYearMonthDayDay.vue";

export default {
  name: "app",
  components: {
    "v-text-field-money": TestMoney,
    "v-text-field-negative-money": TestNegativeMoney,
    "v-text-field-percent": TestPercent,
    "v-text-field-integer": TestInteger,
    "v-text-field-datetime": TestDateTime,
    "v-text-field-creditcard": TestCreditCard,
    "v-text-field-phonenumber": TestPhoneNumber,
    "v-text-field-simplemask": TestSimpleMask,
    "v-text-field-cpf": TestCpf,
    "v-text-field-cnpj": TestCnpj,
    "v-text-field-cep": TestCep,
    "v-text-field-filebase64": TestFileBase64,
    "v-text-field-dotnumber": TestDotNumber,
    "v-text-field-datetimepicker": TestDateTimePicker,
    "v-text-field-yearmonthdayday": TestYearMonthDayDay,
  },
};
</script>
