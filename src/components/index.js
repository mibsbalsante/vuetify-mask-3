import Decimal from "./Decimal.vue";
import Integer from "./Integer.vue";
import DateTime from "./DateTime.vue";
import DateTimePicker from "./DateTimePicker.vue";
import SimpleMask from "./SimpleMask.vue";
import Cpf from "./Cpf.vue";
import Cnpj from "./Cnpj.vue";
import Cep from "./Cep.vue";
import FileBase64 from "./FileBase64.vue";
import DotNumber from "./DotNumber.vue";

function install(app) {
  app.component("v-text-field-money", Decimal);
  app.component("v-text-field-percent", Decimal);
  app.component("v-text-field-integer", Integer);
  app.component("v-text-field-datetime", DateTime);
  app.component("v-text-field-datetimepicker", DateTimePicker);
  app.component("v-text-field-simplemask", SimpleMask);
  app.component("v-text-field-cpf", Cpf);
  app.component("v-text-field-cnpj", Cnpj);
  app.component("v-text-field-cep", Cep);
  app.component("v-text-field-filebase64", FileBase64);
  app.component("v-text-field-dotnumber", DotNumber);
}

export default install;
