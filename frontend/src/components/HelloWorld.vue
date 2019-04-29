<template>
  <div class="signup-form">
    <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <img alt="logo" src="../assets/logo.png">
    <form class>
      <h1>Sign In</h1>
      <input type="text" placeholder="Username" class="txtb" v-model="id">
      <input type="password" placeholder="Password" class="txtb" v-model="pwd">
      <input type="submit" @click="signIn()" value="Sign In" class="signup-btn">
      <a href="#" @click="signUp()">Sign up one?</a>
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      id: "",
      pwd: ""
    };
  },
  methods: {
    signIn() {
      this.axios.post('http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/signIn',{
        id: this.id,
        pwd: this.pwd
      }).then(response=>{
        console.log(response)
        if(response.data.state == -1){
          alert(response.data.msg)
          return
        }
        if(response.data.state == 0){
          this.$router.push("/about")
        }
        
      })
    },
    signUp() {
      this.$router.push("/signup");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
</style>
