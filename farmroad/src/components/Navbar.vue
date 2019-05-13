<template>
  <nav>
    <v-toolbar color="cyan" app dark>
      <v-toolbar-side-icon class="white--text" @click="drawer= !drawer" v-if="user"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase white-text">
        <span class="font-weight-light">Farm</span>
        <span>Load</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- dropdown menu
      <v-menu offset-y v-if="user">
        <v-btn flat slot="activator" class="white--text">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{link.text}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>-->

      <!--add board btn-->
      <Popup v-if="user"/>

      <li v-if="user">
        <a class="white--text subheading mt-1">{{user}}</a>
      </li>

      <v-btn flat color="white" @click="signOut" v-if="user">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary" disable-resize-watcher>
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
import Popup from "./Popup";
export default {
  components: {
    Popup,
    GuestBoard
  },
  data() {
    return {
      drawer: false,

      links: [
        { icon: "home", text: "Home", route: "/" },
        { icon: "dashboard", text: "Boards", route: "/about" },
        { icon: "person", text: "Profile", route: "/userInfo" }
      ],
      user: null
    };
  },
  methods: {
    signOut() {
      (localStorage.username = ""),
        (localStorage.role = ""),
        (this.user = ""),
        (this.drawer=false),
        this.$store.dispatch("UserSignout");
      this.$router.push({ name: "Signin" });
    }
  },
  created() {
    if (localStorage.username) {
      this.user = localStorage.username;
    } else {
      this.user = false;
    }
  }
};
</script>

