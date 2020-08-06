import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.axios=axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
