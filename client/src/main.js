// Vendors
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import SocialSharing from 'vue-social-sharing';
import VueRouter from "vue-router";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Routs
import routes from './routes';
// Components
import App from './App.vue';
// Store
import store from '@/store';

Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.use(SocialSharing);
Vue.config.productionTip = false
const router = new VueRouter({
  mode:'history',
  routes,
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
