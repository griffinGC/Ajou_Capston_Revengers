import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HostSignUp from './views/HostSignUp'
import Signin from './views/Signin'
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta:{
        requiresAuth: true
      }
      
    },
    {
      path: '/hostsign',
      name: 'HostSignup',
      component: HostSignUp
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

router.beforeEach((to, before, next)=>{
  //check to see if the router requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check auth state of user
    let user = localStorage.username
    if(user){
      next()
    }else{
      //no user sign in ,redirect to login
      next({name: 'Signin'})
    }
  }else{
    next()
  }
})

export default router