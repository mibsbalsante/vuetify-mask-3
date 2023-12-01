# vuetify-mask-3

> This is a fork from [vuetify-mask](https://github.com/juareznasato/vuetify-mask) updated to work with Vuetify 3.x and Vue 3.x. Please refer to the original project if you need Vue 2.x compatibility.

## Project

vuetify-mask is a component for working with some of the main types of masks in the v-text-field.

## Links

- ~~[See Demo here](#)~~ soon.
- [GitHub](https://github.com/mibsbalsante/vuetify-mask-3).

## Dependencies

- vuejs
- vuetify ($ npm install vuetify --save)
- dayjs ($ npm install dayjs --save)
- material design icon ($ npm install @mdi/font -D --save)

## Install

_Only available installing with GitHub repo_

```
$ npm install github:mibsbalsante/vuetify-mask-3
```

Register the component globally in your main.js file:

```js
import VuetifyMask from "vuetify-money-3";
app.use(VuetifyMask);
```

Or import locally as a component:

```js
import { VTextFieldCep } from "vuetify-money-3";

export default {
  props: {},
  components: { VTextFieldCep },
  render: () => {}
};
```

## Properties (v-bind:properties)

You can add any v-text-field property  
[v-text-field properties](https://vuetifyjs.com/en/components/text-fields/#text-fields).

Properties that have hyphens (single-line, background-color...) should be changed as follows:

```html
:properties="{ singleLine: true, backgroundColor: 'red' }"
```

or

```html
:properties="{ 'single-line': true, 'background-color': 'red' }"
```

## Options (v-bind:options)

| Option         | Component                                                                | Default    | Description                                                           |
| -------------- | ------------------------------------------------------------------------ | ---------- | --------------------------------------------------------------------- |
| inputMask      | Money, Percent, Integer, DateTime, SimpleMask                            |            | Mask that will be applied in the v-text-field                         |
| outputMask     | Money, Percent, Integer, SimpleMask, CPF, CNPJ, CEP                      |            | Mask that will be applied in the v-model                              |
| empty          | Money, Percent, Integer, DateTime, SimpleMask, CPF, CNPJ, CEP, DotNumber | ""         | Value in v-model when v-text-field is empty. Can be null, "" or other |
| ~~applyAfter~~ | ~~Integer, SimpleMask, CPF, CNPJ, CEP, DotNumber~~                       | deprecated | Use v-model.lazy instead                                              |
| alphanumeric   | SimpleMask                                                               | false      |                                                                       |
| lowerCase      | SimpleMask                                                               | false      |                                                                       |
| acceptFile     | FileBase64                                                               | image/\*   | Sets the file type to convert to base64                               |

## Events

| Event             | Component                                                | value | Description                                                     |
| ----------------- | -------------------------------------------------------- | ----- | --------------------------------------------------------------- |
| update:modelValue | All                                                      | Event | Emitted on v-model update                                       |
| update:masked     | Cep, CNPJ, CPF, DateTime, DotNumber, Integer, SimpleMask | Event | Emitted when the input mask is updated                          |
| update:signal     | NegativeDecimal                                          | Event | Emitted when the value is updated between positive and negative |

| Native event | value         | Description                                       |
| ------------ | ------------- | ------------------------------------------------- |
| blur         | Event         | Emitted when the input is blurred                 |
| ~~change~~   |               | Use update:modelValue with .lazy modifier instead |
| click        | MouseEvent    | Emitted when input is clicked                     |
| focus        | Event         | Emitted when component is focused                 |
| ~~input~~    |               | Use update:modelValue instead                     |
| keydown      | KeyboardEvent | Emitted when any key is pressed                   |
| mousedown    | MouseEvent    | Emitted when click is pressed                     |
| mouseup      | MouseEvent    | Event mouseup                                     |

## How to use

### - Money (v-text-field-money)

```html
<template>
  <v-text-field-money
    v-model="value"
    :label="label"
    :properties="{
      prefix: 'R$',
      readonly: false,
      disabled: false,
      variant: 'filled',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      locale: 'pt-BR',
      length: 11,
      precision: 6,
      empty: null
    }"
  />
</template>
<script>
  export default {
    data: () => ({
      value: "123456789.00", // 123456789.00 or "123456789.00" or "" or null
      label: "Money",
      disabled: false
    })
  };
</script>
```

### - Percent (v-text-field-percent)

```html
<template>
  <v-text-field-percent
    v-model="value"
    :label="label"
    :properties="{
      suffix: '%',
      readonly: false,
      disabled: false,
      variant: 'filled',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      locale: 'pt-BR',
      length: 3,
      precision: 2,
      empty: null
    }"
  />
</template>
<script>
  export default {
    data: () => ({
      value: "12.34", // 12.34 or "12.34" or "" or null
      label: "Percent",
      focus: false
    })
  };
</script>
```

### - Integer (v-text-field-integer)

```html
<template>
  <v-text-field-integer
    v-model="value"
    :label="label"
    :properties="{
      readonly: false,
      disabled: false,
      variant: 'filled',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      inputMask: '#########',
      outputMask: '#########',
      empty: null
    }"
    :focus="focus"
    @focus="focus = false"
  />
</template>
<script>
  export default {
    data: () => ({
      value: "123456789", // 123456789 or "123456789" or "" or null
      label: "Integer",
      focus: false
    })
  };
</script>
```

### - DateTime (v-text-field-datetime)

Works in milliseconds.

```html
<template>
  <v-text-field-datetime
    v-model="value"
    :label="label"
    :properties="{
      readonly: false,
      disabled: false,
      variant: 'filled',
      clearable: true,
      placeholder: 'YYYY-MM-DD HH:mm:ss',
      'prepend-icon': 'mdi-calendar'
    }"
    :options="{
      inputMask: 'YYYY-MM-DD HH:mm:ss',
      empty: null
    }"
    :focus="focus"
    @focus="focus = false"
  />
</template>
<script>
  export default {
    data: () => ({
      value: "1595386800000", // Milliseconds
      label: "DateTime",
      focus: false
    })
  };
</script>
```

### - ~~DateTimePicker (v-text-field-datetimepicker)~~

~~ Works in milliseconds~~ not reimplemented yet.

```html
<template>
  <v-text-field-datetimepicker
    v-model="value"
    label="Date Time"
    :properties="{
      backgroundColor: '#EEE9E9',
      clearable: false,
      variant: 'outlined',
      prependIcon: 'mdi-calendar',
      appendIcon: 'mdi-av-timer'
    }"
    :options="{
      tabDateTitle: 'Date',
      tabTimeTitle: 'Time',
      tabBackgroundColor: 'green',
      locale: 'en-US',
      format: 'YYYY-MM-DD',
      closeOnDateClick: false,
      useSeconds: false
    }"
  />
</template>
<script>
  export default {
    data: () => ({
      value: 1558220700000
    })
  };
</script>
```

### - Credit Card (v-text-field-simplemask)

```html
<template>
  <v-text-field-simplemask
    v-model="value"
    :label="label"
    :properties="{
      prefix: '',
      suffix: '',
      readonly: false,
      disabled: false,
      variant: 'filled',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      inputMask: '#### #### #### ####',
      outputMask: '################',
      empty: null,
      alphanumeric: true,
      lowerCase: false
    }"
    :focus="focus"
    @focus="focus = false"
  />
</template>
<script>
  export default {
    data: () => ({
      value: "1234432112344321",
      label: "Credit Card",
      focus: false
    })
  };
</script>
```

### - Phone Number (v-text-field-simplemask)

```html
<template>
  <v-text-field-simplemask
    v-model="value"
    :label="label"
    :properties="{
      prefix: '',
      suffix: '',
      readonly: false,
      disabled: false,
      variant: 'filled',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      inputMask: '(##) #####-####',
      outputMask: '###########',
      empty: null,
      alphanumeric: true,
      lowerCase: false
    }"
    :focus="focus"
    @focus="focus = false"
  />
</template>

<script>
  export default {
    data: () => ({
      value: "99999999999",
      label: "Phone Number",
      focus: false
    })
  };
</script>
```

### - Simple Mask (v-text-field-simplemask)

You can create your masks.

```html
<template>
  <v-text-field-simplemask
    v-model="value"
    :label="label"
    :properties="{
      prefix: '',
      suffix: '',
      readonly: false,
      disabled: false,
      variant: 'filled',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      inputMask: '##-####-####-###',
      outputMask: '##-####-####-###',
      empty: null,
      alphanumeric: true,
      lowerCase: false
    }"
    :focus="focus"
    @focus="focus = false"
  />
</template>
<script>
  export default {
    data: () => ({
      value: "23-A568-B953-356", // "23-A568-B953-356" or "" or null
      label: "Simple Mask",
      focus: false
    })
  };
</script>
```

### - Files (v-text-field-filebase64)

Convert files to base 64.

```html
<template>
  <v-text-field-filebase64
    v-model="value"
    :label="label"
    :properties="{
      variant: 'outlined',
      placeholder: '',
      appendIcon: 'mdi-message-image-outline'
    }"
    :options="{
      acceptFile: 'image/*'
    }"
    @fileName="fileName = $event"
  />
</template>

<script>
  export default {
    data: () => ({
      value: "",
      fileName: "",
      label: "Select Image"
    })
  };
</script>

<!--
Other acceptFile options: acceptFile:'image/*' acceptFile:'application/pdf'
acceptFile:'image/jpeg,image/gif,image/png,application/pdf'
acceptFile:'image/jpeg,image/gif,image/png,application/pdf,image/x-eps'
-->
```

### - DotNumber (v-text-field-dotnumber)

Accept only dot and numbers.

```html
<template>
  <v-text-field-dotnumber
    v-model="value"
    :label="label"
    :properties="{
      readonly: false,
      disabled: false,
      variant: 'filled',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      length: 20,
      empty: null
    }"
  />
</template>
<script>
  export default {
    data: () => ({
      value: "1.23.456.789", // "" or null
      label: "Only Dot and Number"
    })
  };
</script>
```

### - CPF (v-text-field-cpf)

Brazilian mask.

```html
<template>
  <v-text-field-cpf
    v-model="value"
    :label="label"
    :properties="{
      readonly: false,
      disabled: false,
      variant: 'outlined',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      outputMask: '###########',
      empty: null
    }"
    :focus="focus"
    @focus="focus = false"
  />
</template>
<script>
  export default {
    data: () => ({
      value: "97702036028", // 97702036028 or "97702036028" or "" or null
      label: "CPF (Brazilian mask)",
      focus: false
    })
  };
</script>
```

### - CNPJ (v-text-field-cnpj)

Brazilian mask.

```html
<template>
  <v-text-field-cnpj
    v-model="value"
    :label="label"
    :properties="{
      disabled: false,
      variant: 'outlined',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      outputMask: '##############',
      empty: null
    }"
    :focus="focus"
    @focus="focus = false"
  />
</template>
<script>
  export default {
    data: () => ({
      value: "50703512000192", // 50703512000192 or "50703512000192" or "" or null
      label: "CNPJ (Brazilian mask)",
      focus: false
    })
  };
</script>
```

### - CEP (v-text-field-cep)

Brazilian mask.

```html
<template>
  <v-text-field-cep
    v-model="value"
    :label="label"
    :properties="{
      disabled: false,
      variant: 'outlined',
      clearable: true,
      placeholder: ''
    }"
    :options="{
      outputMask: '########',
      empty: null
    }"
    :focus="focus"
    @focus="focus = false"
  />
</template>

<script>
  export default {
    data: () => ({
      value: "82515260", // 82515260 or "82515260" or "" or null
      label: "CEP (Brazilian mask)",
      focus: false
    })
  };
</script>
```
