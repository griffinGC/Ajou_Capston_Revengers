<template>
  <div class="signup-form">
    <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <img alt="logo" src="../assets/logo.png">
    <form class>
      <h1>Sign In</h1>
      <input type="text" placeholder="Id" class="txtb" v-model="id">
      <input type="password" placeholder="Password" class="txtb" v-model="pwd">
      <select id="roles" class="txtb">
        <option v-for="role in roles" :key="role" :value="role.value">{{role.name}}</option>
      </select>
      <input type="submit" @click="signIn()" value="Sign In" class="signup-btn">
      <a href="#" @click="hostSignUp()">Sign up host?</a>
      <br>
      <a href="#" @click="guestSignUp()">Sign up guest?</a>
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      id: "",
      pwd: "",
      roles: [
        {
          name: "host",
          value: 1
        },
        {
          name: "guest",
          value: 0
        }
      ]
    };
  },
  methods: {
    // signIn(){
    //   this.$router.push("/about");
    // },
    signIn() {
      var roleValue = parseInt(document.getElementById("roles").value);
      console.log(roleValue);
      this.axios
        .post(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/signIn",
          {
            id: this.id,
            pwd: this.pwd,
            radio: roleValue
          }
        )
        .then(response => {
          console.log(response);
          if (response.data.state == -1) {
            alert(response.data.msg);
            this.id = "";
            this.password = "";
          }
          if (response.data.state == 0) {
            localStorage.name = this.id;
            this.$router.push("/about");
          }

          this.axios
            .get(
              "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/signIn"
            )
            .then(response => {
              console.log("this is created function");
              console.log(response);
              if (response.data.state == -1) {
                this.$router.push("/");
              }
            });
        });
    },
    hostSignUp() {
      this.$router.push("/hsignup");
    },
    guestSignUp() {
      this.$router.push("/gsignup");
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
</style>
