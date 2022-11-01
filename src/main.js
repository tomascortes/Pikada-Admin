import { createApp } from 'vue';

import VueAxios from 'vue-axios';
import axios from 'axios';
import { MonthPicker, MonthPickerInput } from 'vue-month-picker';
import router from './router/index';

import App from './App.vue';

createApp(App)
  .use(VueAxios, axios)
  .use(MonthPicker)
  .use(MonthPickerInput)
  .use(router)
  .mount('#app');
