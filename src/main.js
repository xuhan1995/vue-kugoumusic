// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mint from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import './assets/css/neat-min.css'
// import './assets/css/style.css'
Vue.use(mint)

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
