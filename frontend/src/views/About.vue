<template>
  <div class="about">
    <div class="head">
      <h1>Farm Road</h1>
    </div>

    <div class="nav">
     
      <a>soul</a><br>
      <a>Paris</a><br>
      <a>My Page</a><br>
      <a>신고</a><br>
      <a>Login out</a>
    </div>

    <div class="nav-center">
      <a>Home  </a>| 
      <a>Host </a>|
      <a>Guest  </a>|
      <a>Messenger  </a>|
      <a>Search </a>


      <div class="section">
        <MainPage></MainPage>
      </div>
    </div>

    <div class="footer">Copyright Ajou University.com</div>
  </div>
</template>

<script>
import Host from "@/components/HostBoards.vue"
import MainPage from "@/components/MainPage.vue"

export default {
  name: "about",
  components: {
    Host,
    MainPage

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