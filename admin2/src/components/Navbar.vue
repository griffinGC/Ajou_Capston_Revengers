<template>
  <nav>
    <v-toolbar color="cyan" app dark>
      <v-toolbar-side-icon class="white--text" @click="drawer= !drawer" v-if="user"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase white-text">
        <span class="font-weight-light">Farm</span>
        <span>Road ADMIN</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    
      <li v-if="user">
        <a class="white--text subheading mt-1">{{user}}</a>
      </li>

      <v-btn flat color="white" @click="signOut" v-if="user">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <v-btn flat color="white" router :to="{name: 'Signin'}" v-if="!user">
        <v-icon left>account_circle</v-icon>
        <span>Sign In</span>
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

export default {
  components: {
    
  },
  data() {
    return {
      drawer: false,

      links: [
        { icon: "dashboard", text: "회원목록", route: "/userList" },
        { icon: "dashboard", text: "신고된 회원 목록", route: "/reportUser" },
        { icon: "dashboard", text: "게시글 목록", route: "/boardList" },
        { icon: "dashboard", text: "신고된 게시글 목록", route: "/reportBoard" }
      ],
      user: null,
      role: null
    };
  },
  methods: {
    signOut() {
      (localStorage.username = ""),
        (localStorage.role = ""),
        (this.user = ""),
        (this.drawer = false),
        this.$store.dispatch("UserSignout");
      this.$router.push({ name: "Signin" });
    }
  },
  created() {
    if (localStorage.username) {
      this.user = localStorage.username;
      if (localStorage.role == 1) {
        this.role = false;
      } else {
        this.role = true;
      }
    } else {
      this.user = false;
    }
  }
};
</script>

