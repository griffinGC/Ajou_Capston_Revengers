<template>
  <v-app class="grey lighten-4">
  <Navbar/>
    <v-content class="mx-4">
      <router-view/>
    </v-content>
    <Signin/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Signin from './components/Signin.vue'
import Tabs from './components/Tabs.vue'


export default {
  name: 'App',
  components: {
    Navbar,
    Signin,
    Tabs
  },
  data () {
    return {
      //
    }
  }
}
</script>
