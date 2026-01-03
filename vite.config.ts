import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue({}),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VCurrencyField',
      fileName: 'v-currency-field',
    },
    rollupOptions: {
      external: ['vue', 'vuetify', 'vue-currency-input'],
      output: {
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
          'vue-currency-input': 'VueCurrencyInput',
        },
      },
    },
  },
});
