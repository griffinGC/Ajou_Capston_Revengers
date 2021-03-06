import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLocalStorage from 'vue-localstorage'
import VueChatScroll from 'vue-chat-scroll'


Vue.use(VueChatScroll)
Vue.use(VueAxios, axios)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
