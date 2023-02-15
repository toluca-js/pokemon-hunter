import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import App from './App.vue'
import router from './router'
import {
  MdButton,
  MdCard,
  MdTable,
  MdIcon,
  MdProgress,
  MdAvatar,
  MdField,
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import './assets/main.css'

Vue.use(PiniaVuePlugin)
Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdTable)
Vue.use(MdIcon)
Vue.use(MdProgress)
Vue.use(MdAvatar)
Vue.use(MdField)

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')
