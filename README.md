# V-Currency-Field

A Vue 3 currency input component for Vuetify 3, built with TypeScript. Provides a powerful and intuitive way to handle currency input with automatic formatting, validation, and localization support.

## Features

- 🎨 Full integration with **Vuetify 3**
- 💰 Automatic currency formatting
- 🌍 Multi-currency and locale support
- 🔢 Returns raw numeric values (not formatted strings)
- 📱 Fully responsive
- 🎭 TypeScript support
- ✅ Inherits all VTextField props and features
- 🧹 Clearable field support
- 🎯 Hide currency symbol/separator on focus (configurable)

## Requirements

- Vue 3.5+
- Vuetify 3.11+

## Installation

```bash
npm install @cesarv/v-currency-field
```

## Usage

### Setup

If you're using the component as a plugin:

```typescript
import { createApp } from 'vue';
import VCurrencyField from '@cesarv/v-currency-field';

const app = createApp(App);
app.use(VCurrencyField);
```

Or import the component directly:

```html
<script setup lang="ts">
import { VCurrencyField } from '@cesarv/v-currency-field';
</script>
```

### Basic Example

```html
<template>
  <VCurrencyField
    v-model="amount"
    label="Amount"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VCurrencyField } from '@cesarv/v-currency-field';

const amount = ref(1000); // Raw numeric value
</script>
```

## Examples

### Default USD

```html
<template>
  <VCurrencyField
    v-model="currency"
    label="USD Amount"
    placeholder="Enter a value"
  />
  <p>Raw value: {{ currency }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currency = ref(1000);
</script>
```

### Custom Currency and Locale

```html
<template>
  <VCurrencyField
    v-model="currency"
    label="BRL Amount"
    currency="BRL"
    locale="pt-BR"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currency = ref(50000);
</script>
```

### Clearable Field

```html
<template>
  <VCurrencyField
    v-model="currency"
    label="Optional Amount"
    clearable
    hint="This field can be cleared"
    persistent-hint
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currency = ref<number | null>(null);
</script>
```

### All VTextField Props

Since `VCurrencyField` extends `VTextField`, you can use all VTextField props:

```html
<template>
  <VCurrencyField
    v-model="currency"
    label="Amount"
    variant="outlined"
    density="comfortable"
    prepend-inner-icon="mdi-currency-usd"
    hint="Enter the amount"
    persistent-hint
    :rules="[rules.required, rules.min]"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currency = ref(0);

const rules = {
  required: (v: number | null) => (v !== null && v !== undefined) || 'Amount is required',
  min: (v: number | null) => (v !== null && v >= 0) || 'Amount must be positive',
};
</script>
```

### Hide Currency Symbol on Focus

```html
<template>
  <VCurrencyField
    v-model="currency"
    label="Amount"
    hide-currency-symbol-on-focus
    hide-grouping-separator-on-focus
  />
</template>
```

## API

### Props

The component accepts all props from `VTextField` (see [Vuetify VTextField documentation](https://vuetifyjs.com/en/components/text-fields/)) plus the following currency-specific props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `number \| null` | `undefined` | The raw numeric value (not formatted) |
| `currency` | `string` | `'USD'` | ISO 4217 currency code (e.g., 'USD', 'BRL', 'EUR') |
| `locale` | `string` | `'en-US'` | BCP 47 language tag (e.g., 'en-US', 'pt-BR', 'de-DE') |
| `currencyDisplay` | `'symbol' \| 'narrowSymbol' \| 'code' \| 'name'` | `'symbol'` | How to display the currency |
| `hideCurrencySymbolOnFocus` | `boolean` | `false` | Hide currency symbol when field is focused |
| `hideGroupingSeparatorOnFocus` | `boolean` | `false` | Hide grouping separator when field is focused |
| `valueAsInteger` | `boolean` | `false` | Return value as integer (multiplied by 100) |
| `precision` | `number` | `undefined` | Decimal precision (defaults to currency's minor unit) |
| `distractionFree` | `boolean \| object` | `false` | Combined option for hiding symbol and separator on focus |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number \| null` | Emitted when the value changes, returns raw numeric value |

### Slots

All slots from `VTextField` are supported (see [Vuetify VTextField slots](https://vuetifyjs.com/en/components/text-fields/#slots)):

- `prepend-inner`
- `append-inner`
- `append`
- `prepend`
- `label`
- `default` (messages)

## Value Handling

**Important**: The `v-model` binding returns a **raw numeric value**, not a formatted string.

```typescript
const amount = ref(1000); // number

// When user types "$1,234.56"
// amount.value = 1234.56 (number, not string)
```

## Currency and Locale

The component uses the `Intl.NumberFormat` API for formatting, which means:

- **Currency**: Uses ISO 4217 currency codes (USD, BRL, EUR, etc.)
- **Locale**: Uses BCP 47 language tags (en-US, pt-BR, de-DE, etc.)

Common combinations:

- USD with en-US: `$1,234.56`
- BRL with pt-BR: `R$ 1.234,56`
- EUR with de-DE: `1.234,56 €`
- EUR with en-US: `€1,234.56`

## Vuetify Defaults

You can configure default props using Vuetify's defaults system:

```typescript
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({
  defaults: {
    VCurrencyField: {
      currency: 'BRL',
      locale: 'pt-BR',
      variant: 'outlined',
    },
  },
});
```

## Notes

- The component wraps `VTextField` and extends its functionality
- All validation rules from Vuetify work with the numeric values
- The `clearable` prop works correctly, setting the value to `null`
- The component automatically formats the displayed value while keeping the model value as a number
- Make sure Vuetify is properly configured in your project

## License

ISC

## Author

[Cesar Vieira](https://github.com/cesarvieira)
