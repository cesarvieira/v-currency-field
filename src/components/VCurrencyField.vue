<script setup lang="ts">
import { VTextField } from 'vuetify/components';
import { computed, getCurrentInstance, watch, useAttrs } from 'vue';
import { useCurrencyInput } from 'vue-currency-input';
import type { CurrencyInputOptions, CurrencyDisplay } from 'vue-currency-input';

defineOptions({ inheritAttrs: false });

type VTextFieldProps = Omit<InstanceType<typeof VTextField>['$props'], keyof CurrencyInputOptions>;
interface Props extends
  /* @vue-ignore */ VTextFieldProps,
  /* @vue-ignore */ Partial<Omit<CurrencyInputOptions, 'currencyDisplay'>> {
  modelValue?: number | null;
  currencyDisplay?: keyof typeof CurrencyDisplay;
};

const props = defineProps<Props>();

const instance = getCurrentInstance();
const defaults = computed(() => {
  // @ts-expect-error - $vuetify is not typed in the component public instance
  return instance?.proxy?.$vuetify?.defaults?.VCurrencyField;
});
const attrs = useAttrs();
const textFieldProps = computed(() => VTextField.filterProps({ ...defaults.value, ...props, ...attrs }));

// Configuration of vue-currency-input
const {
  inputRef,
  formattedValue,
  setValue,
  numberValue,
} = useCurrencyInput({
  ...props,
  currency: props.currency ?? 'USD',
  locale: props.locale ?? 'en-US',
  hideCurrencySymbolOnFocus: props.hideCurrencySymbolOnFocus ?? false,
  hideGroupingSeparatorOnFocus: props.hideGroupingSeparatorOnFocus ?? false,
  currencyDisplay: props.currencyDisplay as CurrencyDisplay,
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
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </VTextField>
</template>
