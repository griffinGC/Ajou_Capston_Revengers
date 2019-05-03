<template>
<div class="main-page">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    >
  <div class="notification">
    <a>Request List</a>
    <br>
    <textarea></textarea>
  </div>
  <div class="chat">
    <a>Chat List</a>
    <br>
    <textarea></textarea>
  </div>
</div>
</template>


<script>
export default {
  name: "MainPage",
  data() {
    return {
      id: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
</style>
