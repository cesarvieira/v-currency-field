<script setup lang="ts">
import { ref, computed } from 'vue';
import { VCurrencyField } from '../src/index.ts';

const currency = ref(1000);
const currency2 = ref(50000);
const currency3 = ref(null);

const formattedCurrency = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currency.value ?? 0);
});

const formattedCurrency2 = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(currency2.value ?? 0);
});

const formattedCurrency3 = computed(() => {
  if (currency3.value === null) {
    return 'No value defined';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currency3.value);
});
</script>

<template>
  <VApp>
    <VMain>
      <VContainer class="py-8">
        <div class="text-center mb-8">
          <h1 class="text-h3 font-weight-bold mb-2">
            VCurrencyField
          </h1>
          <p class="text-body-1 text-medium-emphasis">
            Currency field component for Vuetify 3
          </p>
        </div>

        <VRow>
          <VCol cols="12" md="6">
            <VCard class="h-100">
              <VCardTitle>
                <VIcon icon="mdi-currency-usd" class="me-2" />
                USD Example (Default)
              </VCardTitle>
              <VCardText>
                <VCurrencyField
                  v-model="currency"
                  label="USD Amount"
                  placeholder="Enter a value"
                  variant="outlined"
                  density="comfortable"
                  class="mb-4"
                />
                <div class="d-flex flex-column gap-2">
                  <VChip
                    color="primary"
                    variant="flat"
                    prepend-icon="mdi-currency-usd"
                  >
                    Formatted: {{ formattedCurrency }}
                  </VChip>
                  <VChip
                    color="primary"
                    variant="outlined"
                    prepend-icon="mdi-code-braces"
                  >
                    Raw: {{ currency }}
                  </VChip>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12" md="6">
            <VCard class="h-100">
              <VCardTitle>
                <VIcon icon="mdi-currency-brl" class="me-2" />
                BRL Example (Brazilian Real)
              </VCardTitle>
              <VCardText>
                <VCurrencyField
                  v-model="currency2"
                  label="BRL Amount"
                  placeholder="Enter a value"
                  variant="outlined"
                  density="comfortable"
                  currency="BRL"
                  locale="pt-BR"
                  class="mb-4"
                />
                <div class="d-flex flex-column gap-2">
                  <VChip
                    color="success"
                    variant="flat"
                    prepend-icon="mdi-currency-brl"
                  >
                    Formatted: {{ formattedCurrency2 }}
                  </VChip>
                  <VChip
                    color="success"
                    variant="outlined"
                    prepend-icon="mdi-code-braces"
                  >
                    Raw: {{ currency2 }}
                  </VChip>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard>
              <VCardTitle>
                <VIcon icon="mdi-form-select" class="me-2" />
                Optional Field (No initial value)
              </VCardTitle>
              <VCardText>
                <VCurrencyField
                  v-model="currency3"
                  label="Optional value"
                  placeholder="Enter a value or leave empty"
                  variant="outlined"
                  density="comfortable"
                  clearable
                  class="mb-4"
                  hint="This field can be cleared"
                  persistent-hint
                />
                <div class="d-flex flex-column gap-2">
                  <VChip
                    :color="currency3 === null ? 'default' : 'info'"
                    variant="flat"
                    prepend-icon="mdi-currency-usd"
                  >
                    Formatted: {{ formattedCurrency3 }}
                  </VChip>
                  <VChip
                    :color="currency3 === null ? 'default' : 'info'"
                    variant="outlined"
                    prepend-icon="mdi-code-braces"
                  >
                    Raw: {{ currency3 === null ? 'null' : currency3 }}
                  </VChip>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </VMain>
  </VApp>
</template>
