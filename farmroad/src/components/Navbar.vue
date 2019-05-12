<template>
  <nav>
    <v-toolbar color="cyan"  app dark tabs>
      <v-toolbar-side-icon class="white--text" @click="drawer= !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase white-text">
        <span class="font-weight-light">Farm</span>
        <span>Load</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!--dropdown menu-->
      <v-menu offset-y>
        <v-btn flat slot="activator" class="white--text">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{link.text}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <Popup/>

      <v-btn flat color="white">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      
      <!--Tabs-->
      <!-- <template v-slot:extension>
        <v-tabs v-model="model" centered color="cyan" slider-color="yellow" fixed-tabs>
          <v-tab v-for="i in 3" :key="i" :href="`#tab-${i}`">Item {{ i }}</v-tab>
        </v-tabs>
      </template> -->
    </v-toolbar>

    <!--Tab items-->
    <!-- <v-tabs-items v-model="model">
      <v-tab-item v-for="i in 3" :key="i" :value="`tab-${i}`">
        <v-card flat>
          <v-card-text>{{text}}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->

    <v-navigation-drawer app v-model="drawer" class="primary">

      <!--头像和名字-->
      <v-layout column align-center>
        <v-flex class="mt-5">
        
          <!-- <v-avatar size="100">
            <img src="/img/imgs/avatar-2.png">
          </v-avatar> -->
          <p class="white--text subheading mt-1">{{showUser}}</p>
        </v-flex>
      </v-layout>
      <!--menu item-->

      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import Popup from "./Popup"
export default {
  
  components: {
    Popup
  },
  data() {
    return {
      drawer: false,

      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "dashboard", text: "Boards", route: "/about" },
        { icon: "person", text: "Profile", route: "/userInfo" }
      ],
    };
  },
  computed:{
    showUser: function(){
      var role = ''
      if(localStorage == 1){
        role = 'host'
      }else{
        role = 'guest'
      }
      return 'Hello! '+role+','+localStorage.username
    }
  }
};
</script>

