import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Signin from './views/Signin'


import Welcome from './views/Welcome'

import MyBoards from './views/MyBoards'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/myboards',
      name: 'myboards',
      component: MyBoards,
      meta:{
        requiresAuth: true
      },
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
      alert("Don't do this Dude!!")
      next({name: 'Signin'})
    }
  }else{
    next()
  }
})

export default router