import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
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

function isloggedIn(){
  return localStorage.getItem('token')
}


router.beforeEach((to, from, next) => {
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if(!isloggedIn()){
      next({
        name:"login"
      });
    }else {
      next();
    }
  } else if(to.matched.some(record=> record.meta.requiresGuest)){
    if(isloggedIn()){
      next({
        name:"dashboard"
      });
    }else {
      next();
    }
  } else{
    next()
  }
})

export default router;
