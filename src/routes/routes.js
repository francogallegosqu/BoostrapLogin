import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    meta: { requiresGuest: true },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      
    ]
  },
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    // meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/products',
        name: 'products',
        component: () => import(/* webpackChunkName: "demo" */ '../Pizzeria/Productos/Products.vue')
      },
      {
        path: '/product/:id',
        name: 'product',
        props:true,
        component: () => import(/* webpackChunkName: "demo" */ '../Pizzeria/Productos/DetailsProduct.vue')
      },
      {
        path: '/addproduct',
        name: 'addproduct',
        
        component: () => import(/* webpackChunkName: "demo" */ '../Pizzeria/Productos/AddProduct.vue')
      },
      {
        path: '/carry',
        name: 'carry',
        
        component: () => import(/* webpackChunkName: "demo" */ '../User/Carry.vue')
      },
      {
        path: '/order',
        name: 'order',
        
        component: () => import(/* webpackChunkName: "demo" */ '../User/Order.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
        
        
        
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      }
      
    ]
  },
  
  { 
    path: '*', 
    component: AuthLayout,
    redirect: 'NotFound',
    children:[
      {
        path:'/404',
        name:'NotFound',
        component:NotFound
      }
    ]
  }
]



export default routes;
