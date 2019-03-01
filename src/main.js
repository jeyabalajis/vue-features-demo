import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify' 
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate);

Vue.use(Vuetify, {
  theme: {
    primary: '#34495e',
    accent: '#41b883'
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
