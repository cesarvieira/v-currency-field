<script setup lang="ts">
import { VTextField } from 'vuetify/components';
import { computed, watch, useAttrs, useSlots } from 'vue';
import { useCurrencyInput } from 'vue-currency-input';
import { type CurrencyInputOptions, CurrencyDisplay } from 'vue-currency-input';
import { useDefaults } from 'vuetify';

defineOptions({ inheritAttrs: false });

type VTextFieldProps = Omit<InstanceType<typeof VTextField>['$props'], keyof CurrencyInputOptions>;
interface Props extends
  /* @vue-ignore */ VTextFieldProps,
  /* @vue-ignore */ Omit<CurrencyInputOptions, 'currencyDisplay' | 'currency'> {
  modelValue?: number | null;
  currencyDisplay?: keyof typeof CurrencyDisplay;
  currency?: string;
  locale?: string;
};

const _props = defineProps<Props>();
const props = useDefaults(_props, 'VCurrencyField');

const attrs = useAttrs();
const textFieldProps = computed(() =>
  VTextField.filterProps({
    ...props,
    ...attrs,
  }),
);

// Used to strongly type the dynamic slot names in the template below.
const slots: Record<string, unknown> = useSlots() as Record<string, unknown>;
const slotNames = computed<string[]>(() => Object.keys(slots));

// Configuration of vue-currency-input
const {
  inputRef,
  formattedValue,
  setValue,
  numberValue,
} = useCurrencyInput({
  ...props,
  ...attrs,
  currency: props.currency ?? 'USD',
  locale: props.locale ?? 'en-US',
  hideCurrencySymbolOnFocus:
    props.hideCurrencySymbolOnFocus ?? false,
  hideGroupingSeparatorOnFocus:
    props.hideGroupingSeparatorOnFocus ?? false,
  currencyDisplay: (props.currencyDisplay ?? CurrencyDisplay.symbol) as CurrencyDisplay,
});

const clear = () => {
  setValue(null);
};

watch(
  () => props.modelValue,
  (value) => {
    if (value !== numberValue.value) {
      setValue(value ?? null);
    }
  },
  { immediate: true },
);
</script>

<template>
  <VTextField
    ref="inputRef"
    v-bind="textFieldProps"
    :value="formattedValue"
    @update:model-value="void(0)"
    @click:clear="clear"
  >
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </VTextField>
</template>
