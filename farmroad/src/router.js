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
import MyBoards from './views/MyBoards'
import MyMap from './views/MyMap'
import Review from './views/Review'
import ChatRoom from './views/ChatRoom'
import ChatRoomList from './components/ChatRoomList'
import ReferenceProfile from './components/ReferenceProfile'

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
      },
      props: true,
      beforeEnter: (to, from, next) => {
        console.log('router beforEnter message: '+to.params.name)
        if(to.params.name){
          next()
        }
      }
    },
    {
      path: '/referenceProfile',
      name: 'ReferenceProfile',
      component: ReferenceProfile,
      meta:{
        requiresAuth: true
      },
      props: true,
      beforeEnter: (to, from, next) => {
        console.log('router beforEnter message: '+to.params.userName)
        if(to.params.userName){
          next()
        }
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
      component: FileUpload,
    },
    {
      path: '/myboards',
      name: 'myboards',
      component: MyBoards,
      meta:{
        requiresAuth: true
      },
    },
    {
      path: '/mymap',
      name: 'mymap',
      component: MyMap,
      props: true,
      beforeEnter: (to, from, next) => {
        console.log('router beforEnter message: '+to.params.boardId)
        if(to.params.boardId){
          next()
        }
      }
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    },
    {
      path: '/chatroom',
      name: 'chatroom',
      component: ChatRoom,
      props: true,
      beforeEnter: (to, from, next) => {
        console.log('router beforEnter message: '+to.params.chatRoomId)
        if(to.params.chatRoomId){
          next()
        }
      }
    },
    {
      path: '/chatroomlist',
      name: 'chatroomlist',
      component: ChatRoomList
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