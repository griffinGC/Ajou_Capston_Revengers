<template>
  <div class="login container">
    <v-card flat>
      <v-card-title class="headline">회원가입</v-card-title>
      <v-card-text>
        <!--输入框组-->
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="아이디"
            v-model="username"
            :rules="usernameRules"
            prepend-icon="person"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :rules="[passwordRules.required, passwordRules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="비밀번호"
<<<<<<< HEAD
            hint="최소 8글자 이상이어야 합니다"
=======
            hint="최소 8자 이상입력해야 합니다."
>>>>>>> 13212ebfc756948e129f7d8eb5b87c60d3ef1882
            counter
            required
            prepend-icon="lock"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="주인장" value="1"></v-radio>
            <v-radio label="여행객" value="0"></v-radio>
          </v-radio-group>
          <v-btn :disabled="!valid" left color="success" @click="validate">로그인</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <!--分界标签-->
        <v-spacer></v-spacer>

        <!--底部按钮组-->
        <v-btn color="green darken-1" flat router :to="{name: 'HostSignup'}">주인장 회원가입</v-btn>
        <v-btn color="green darken-1" flat router :to="{name: 'GuestSignup'}">여행객 회원가입</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      usernameRules: [
        v => !!v || "아이디를 입력해야 합니다.",
        v => (v && v.length >= 8) || "Name must be less than 10 characters"
      ],
      password: "",
      passwordRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 4 || "Min 4 characters",
        emailMatch: () => "The email and password you entered don't match"
      },

      valid: true,

      radios: "0",

      show1: false,
      show2: true,
      show3: false,
      show4: false,
      profile: "",

      hostRoute: "/hostsign",
      guestRoute: "/guestsign"
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/signIn",
            {
              userName: this.username,
              password: this.password,
              radio: parseInt(this.radios)
            }
          )
          .then(respones => {
            if (respones.data.state == -1) {
              alert("아이디 또는 비밀번호가 틀렸습니다!");
            } else if (respones.data.state == 0) {
              if (!respones.data.report) {
                console.log('login success!')
                localStorage.username = this.username;
                localStorage.role = parseInt(this.radios);
                localStorage.img = respones.data.profileImg

                this.$store.dispatch("UserSignin");
                this.$router.push({ name: "welcome" });
                location.reload();
              }else{
                alert("정지된 계정 입니다!")
              }
            }else{
              console.log('no state!')
            }

          });
      }
    }
  }
};
</script>
