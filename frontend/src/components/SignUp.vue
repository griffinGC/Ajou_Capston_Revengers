<template>
  <div>
    <div class="signup-form">
      <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
      <form class>
        <h1>sign up</h1>
        <input type="text" placeholder="Username" class="txtb">
        <input type="email" placeholder="e-mail" class="txtb">
        <input type="password" placeholder="Password" class="txtb">
        <input type="password" placeholder="Confirm Password" class="txtb">
        <input type="submit" @click="signUp()" value="Create Account" class="signup-btn">
        <a href="#" @click="signUp()">Already Have one ?</a>
      </form>
    </div>
  </div>
</template>

<script scoped>
export default {
  methods:{
    signUp(){
      this.$router.push('/')
    },
  }
};
</script>
<style>
</style>


