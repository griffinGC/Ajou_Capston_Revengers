<template>
  <div>
    <div class="signup-form">
      <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
      <form class>
         <h1>guest sign up</h1>
        <input type="text" placeholder="Username" class="txtb">
        <input type="email" placeholder="e-mail" class="txtb">
        <input type="password" placeholder="Password" class="txtb">
        <input type="password" placeholder="Confirm Password" class="txtb">
        <input type="date" value="2019-01-01" class="txtb">
        <input type="tel" placeholder="Phone" class="txtb">
        <input type="text" placeholder="Ability" class="txtb">
        <span><label>Male</label><input class="b" type ="radio" name = "gender"></span>
        <span><label>Female</label><input class="b" type ="radio" name = "gender"></span>
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
<style scoped>
body {
  margin: 0;
  padding: 0;
  /*background: #487eb0;*/
  background: white;
}
.signup-form {
  width: 40%;
  padding: 30%;
  text-align: center;
  position: absolute;
  background: url(../assets/bg.png);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.signup-form logo {
  width: auto;
  height: 40px;
}

.signup-form h1 {
  margin-top: 50px;
  font-family: "Permanent Marker", cursive;
  color: #fff;
  font-size: 40px;
}

.signup-form input {
  font-family: "Montserrat", sans-serif;
  display: block;
  text-align: center;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  outline: none;
  border: none;
}

.signup-form select {
  font-family: "Montserrat", sans-serif;
  display: block;
  text-align: center;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  outline: none;
  border: none;
}

.txtb {
  margin: 20px 0;
  background: rgba(255, 255, 255, 5);
  border-radius: 6px;
}

.signup-btn {
  margin-top: 60px;
  margin-bottom: 20px;
  background: #1e90ff;
  border-radius: 44px;
  cursor: pointerl;
  transition: 0.8s;
  color: #fff;
}

.signup-btn :hover {
  transform: scale(0.96);
}

.signup-form a {
  text-decoration: none;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  padding: 10px;
  transform: 0.8s;
}

.signup-form a:hover {
  background: rgba(0, 0, 0, 3);
}
.signup-form{
  width:350px;
}
.signup-form input{
  height: 50px;
}
.signup-form span{
  display:inline-block;
  align-content: center;
  width: 50px;
  height: 50px;
  color:white;
  margin-left:35px;
  margin-right:50px;
}
.signup-form label{
  margin-left:5px;
}
</style>

