<template>
  <div class="about">
    <div class="head">
      <h1>Farm Road</h1>
    </div>

    <div class="nav">
      <a>soul</a>
      <br>
      <a>Paris</a>
      <br>
      <a>My Page</a>
      <br>
      <a>신고</a>
      <br>
      <a>Login out</a>
    </div>

    <v-app id="inspire">
      <div>
        <v-tabs v-model="active" color="cyan" dark slider-color="yellow">
          <v-tab v-for="n in 3" :key="n" ripple>Item {{ n }}</v-tab>
          <v-tab-item v-for="n in 3" :key="n">
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>

        <div class="text-xs-center mt-3">
          <v-btn @click="next">next tab</v-btn>
        </div>
      </div>
    </v-app>

    <div class="footer">Copyright Ajou University.com</div>
  </div>
</template>

<script>
import Host from "@/components/HostBoards.vue";
import MainPage from "@/components/MainPage.vue";

export default {
  name: "about",
  components: {
    
    Host,
    MainPage
  },
  data() {
    return {
      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    }
  }
};
</script>
<style >
.head {
  background-color: #57606f;
  color: white;
  text-align: center;
  padding: 5px;
  font-family: "Permanent Marker", cursive;
}
.nav {
  line-height: 30px;
  background-color: #eeeeee;
  font-family: "Montserrat", sans-serif;
  height: 880px;
  width: 10%;
  float: left;
  padding: 5px;
}
.nav-center {
  border-bottom-style: outset;
}
.section {
  width: 80%;
  float: left;
  padding: 10px;
  height: 100%;
}
.footer {
  background-color: #57606f;
  color: white;
  clear: both;
  text-align: center;
  padding: 5px;
  font-family: "Montserrat", sans-serif;
}
</style>