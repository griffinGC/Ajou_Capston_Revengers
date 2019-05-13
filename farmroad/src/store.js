import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingStatus: 'loading',
    hostBoards: [],
    guestBoards: []
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status
    },
    SET_HOST_BOARDS(state, hostBoards) {
      state.hostBoards = hostBoards
    },
    SET_GUEST_BOARDS(state, guestBoards) {
      state.guestBoards = guestBoards
    }
  },
  actions: {
    fetchHostBoards(context) {
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get('http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/board/getHostList')
        .then(response => {
          context.commit('SET_LOADING_STATUS', 'notLoading')
          context.commit('SET_HOST_BOARDS', response.data)
        })
    },
    fetchGuestBoards(context){
      context.commit('SET_LOADING_STATUS', 'loading')
      axios.get('http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/board/getGuestList')
        .then(response=>{
          context.commit('SET_LOADING_STATUS', 'notLoading')
          context.commit('SET_GUEST_BOARDS', response.data)
        })
    }
  },
  getters: {
    doneHostBoards(state) {
      return state.hostBoards
    },
    doneGuestBoards(state){
      return state.guestBoards
    }
  }
})
