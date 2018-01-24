import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

import ElementUI from 'element-ui'
import Viser from 'viser-vue'
import './assets/js/resize'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/normalize.scss'
import 'font-awesome/css/font-awesome.css'

import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Viser)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
