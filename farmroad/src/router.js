import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HostSignUp from './views/HostSignUp'
import GuestSignUp from './views/GuestSignUp'
import UserInfo from './views/UserInfo'
import Signin from './views/Signin'
import EditUserInfo from './views/EditUserInfo'
import Chat from './views/Chat'
import Welcome from './views/Welcome'
import FileUpload from './views/FileUpload'

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
      path: '/guestsign',
      name: 'GuestSignup',
      component: GuestSignUp
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component : UserInfo,
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
      path : '/editUserInfo',
      name : 'editUserInfo',
      component : EditUserInfo,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/file',
      name: 'fileupload',
      component: FileUpload
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
      alert("Do not do this SB!!")
      next({name: 'Signin'})
    }
  }else{
    next()
  }
})

export default router