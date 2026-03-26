import '@mdi/font/css/materialdesignicons.css';

import { createApp } from 'vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';

const app = createApp(App);
app.use(createVuetify({
  theme: {
    // Vuetify 4 changes the default theme to "system"; pin to "light" to keep
    // the previous behavior and avoid OS-dependent rendering.
    defaultTheme: 'light',
  },
  defaults: {},
  components,
  directives,
}));
app.mount('#app');
