<template>
  <div>
    <div class="signup-form">
      <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
      <form class>
        <h1>host sign up</h1>
        <div class="Id">
        <input type="text" placeholder="Id" class="txtb">
        <input type="submit" value="comfirm Id" class="confirm-btn">
        </div>  

        <div class="pwd">
        <input type="password" placeholder="Password" class="txtb">
        <input type="password" placeholder="Confirm Password" class="txtb">
        </div>

        <div class="info">
        <input type="email" placeholder="e-mail" class="txtb">
        <input type="number" placeholder="Age" class="txtb">
        <input type="tel" placeholder="phone" class="txtb">
        <input type="text" placeholder="Address" class="txtb">
        <input type="text" placeholder="Works" class="txtb">
        <input type="text" placeholder="Location" class="txtb">
        <input type="text" placeholder="Reference" class="txtb">
        </div>
        <input type="submit" @click="signUp()" value="Create Account" class="signup-btn">
        <a href="#" @click="signUp()">Already Have one ?</a>
      </form>
    </div>
  </div>
</template>

<script scoped>
export default {
  methods: {
    signUp() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
</style>


