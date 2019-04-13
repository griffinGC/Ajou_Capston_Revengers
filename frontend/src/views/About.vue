<template>
  <div class="about">
    <div class="head">
      <h1>Ajou Revengers</h1>
    </div>

    <div class="nav">
      London
      <br>Paris
      <br>Tokyo
      <br>
    </div>

    <div class="nav-center">
      <a>Host </a>|
      <a>Guest </a>

      <div class="section">
        <Host></Host>
      </div>
    </div>

    <div class="footer">Copyright Ajou Uni.com</div>
  </div>
</template>

<script>
import Host from '@/components/HostBoards.vue'

export default {
  name: 'about',
  components:{
    Host
  }
};
</script>
<style >

.head {
  background-color: #57606f;
  color: white;
  text-align: center;
  padding: 5px;
  font-family: 'Permanent Marker', cursive;
}
.nav {
  line-height: 30px;
  background-color: #eeeeee;
  font-family: 'Montserrat', sans-serif;
  height: 880px;
  width: 10%;
  float: left;
  padding: 5px;
}
.nav-center{
  border-bottom-style:outset
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
  font-family: 'Montserrat', sans-serif;
}
</style>