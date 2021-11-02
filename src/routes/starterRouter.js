import Vue from 'vue';
import Router from 'vue-router';
import DashboardLayout from '../views/Starter/SampleLayout.vue';
import Starter from '../views/Starter/SamplePage.vue';
import AuthLayout from '../views/Pages/AuthLayout.vue';

import login from '../views/Pages/Login.vue'
Vue.use(Router);

export default new Router({
  
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login',
      // component: DashboardLayout,
      component:AuthLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          components: { default: login }
        }
      ]
    }
  ],
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});
