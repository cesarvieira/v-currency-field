import type { App } from 'vue';
import VCurrencyField from './components/VCurrencyField.vue';

export { VCurrencyField };

export default {
  install(app: App) {
    app.component('VCurrencyField', VCurrencyField);
  },
};
