<template>
  <v-card>
    <v-card-title class="headline">여행객 회원가입</v-card-title>
    <v-card-text>
      <!--input from-->
      <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
        <!--username-->
        <v-text-field
          label="아이디"
          v-model="username"
          :rules="usernameRules"
          prepend-icon="person"
        ></v-text-field>

        <!--username check btn and alert-->
        <v-alert :value="alertSuccess" type="success">사용 가능한 아이디입니다.</v-alert>
        <v-alert :value="alertError" type="error">중복된 아이디입니다.</v-alert>
        <v-btn left color="success" @click="checkUsername">아이디 중복 확인</v-btn>

        <!--img upload-->
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
          <img :src="imageUrl" height="150" v-if="imageUrl">
          <v-text-field
            label="이미지 선택"
            @click="pickFile"
            v-model="imageName"
            prepend-icon="attach_file"
          ></v-text-field>
          <input
            type="file"
            style="display: none"
            ref="image"
            accept="image/*"
            @change="onFilePicked"
          >
        </v-flex>

        <!--name-->
        <v-text-field label="이름" v-model="myName" prepend-icon="account_box"></v-text-field>

        <!--password-->
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :rules="[passwordRules.required, passwordRules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="패스워드"
          hint="At least 8 characters"
          counter
          required
          prepend-icon="lock"
          @click:append="show1 = !show1"
        ></v-text-field>

        <!--email-->
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="이메일"
          required
          prepend-icon="email"
        ></v-text-field>

        <!--phone-->
        <v-text-field v-model="phone" label="전화번호" :rules="[phoneRules.required,phoneRules.min]" required prepend-icon="phone"></v-text-field>
        <v-alert :value="alertPhoneSuccess" type="success">전화번호 전송 성공!</v-alert>
        <v-alert :value="alertPhoneError" type="error">전화번호 전송 에러!</v-alert>
        <v-btn  left color="success" @click="sendPhoneNumber">전화번호 인증</v-btn>

        <v-text-field v-model="confirmNumber" label="인증번호" :rules="[confirmRules.required,confirmRules.min,confirmRules.number]" required prepend-icon="done"></v-text-field>
        <v-alert :value="alertApproveSuccess" type="success">인증번호 확인 성공!</v-alert>
        <v-alert :value="alertApproveError" type="error">인증번호 확인 에러!</v-alert>
        <v-btn  left color="success" @click="checkPhoneNumber">인증번호 확인</v-btn>
        
        <v-slider
          v-model="age"
          :rules="rules"
          label="나이"
          step="1"
          thumb-label="always"
          ticks
          required
          prepend-icon="accessibility"
        ></v-slider>

        <!--gender select-->
        <v-select
          v-model="select"
          :items="gender"
          :rules="[v => !!v || 'Item is required']"
          label="성별"
          required
          prepend-icon="wc"
        ></v-select>

        <!--ability-->
        <!-- <v-text-field v-model="ability" label="ability" required prepend-icon="list_alt"></v-text-field> -->

        <div class="grey--text text--darken-1">능력</div>
        <v-layout row wrap>
          <v-item-group><span>
            <v-checkbox v-model="selected" label="요리를 잘해요" value="cook"></v-checkbox>
            <v-checkbox v-model="selected" label="미용을 잘해요" value="beauty"></v-checkbox></span>
          </v-item-group>
           <v-item-group>
            <v-checkbox v-model="selected" label="애를 잘돌봐요" value="baby"></v-checkbox>
            <v-checkbox v-model="selected" label="청소를 잘해요" value="clean"></v-checkbox>
          </v-item-group>
            <v-item-group>
            <v-checkbox v-model="selected" label="운전을 잘해요" value="drive"></v-checkbox>
            <v-checkbox v-model="selected" label="도배를 잘해요" value="paper"></v-checkbox>
          </v-item-group>
            <v-item-group>
            <v-checkbox v-model="selected" label="짐나르는거 잘해요" value="carry"></v-checkbox>
            <v-checkbox v-model="selected" label="노래를 잘해요" value="sing"></v-checkbox>
          </v-item-group>
          <v-item-group>
            <v-checkbox v-model="selected" label="말동무를 잘해요" value="talk"></v-checkbox>
            <v-checkbox v-model="selected" label="컴퓨터를 잘다뤄요" value="comp"></v-checkbox>
          </v-item-group>
          <v-item-group>
            <v-checkbox v-model="selected" label="농기계를 잘다뤄요" value="machine"></v-checkbox>
            <v-checkbox v-model="selected" label="농사경험이 있어요" value="farm"></v-checkbox>
          </v-item-group>
        </v-layout>
        {{selected}}
        <!--sign up btn-->
        <v-btn :disabled="!valid" left color="success" @click="validate">Sign Up</v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <!--分界标签-->
      <v-spacer></v-spacer>

      <!--back btn-->
      <v-btn color="green darken-1" flat router :to="{name: 'Signin'}">Back</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      username: "",
      usernameRules: [
        v => !!v || "아이디가 필요합니다.",
        v => (v && v.length >= 8) || "아이디는 최소 10글자 이상이어야 합니다."
      ],
      password: "",
      passwordRules: {
        required: value => !!value || "패스워드를 입력해야 합니다.",
        min: v => v.length >= 8 || "패스워드를 최소 8글자 이상이어야 합니다."
      },

      dialog: true,
      valid: true,

      email: "",
      emailRules: [
        v => !!v || "이메일을 입력해야 합니다.",
        v => /.+@.+/.test(v) || "정상적인 이메일이어야 합니다."
      ],

      phone: "",
      phoneRules: {
        required: value => !!value || "전화번호를 입력해야 합니다.",
        min: v => v.length >= 8 || "최소 8글자 이상이어야 합니다"
      },

      confirmNumber: "",
      confirmRules: {
        required: value => !!value || "인증번호를 입력해야 합니다",
        min: v => v.length === 4 || "4자리의 숫자이어야 합니다",
        number: v => isNaN(v) === false || "숫자를 입력해야 합니다"
      },


      select: null,
      gender: ["남성", "여성"],
      age: 20,
      rules: [v => v <= 100 || "?!"],
      ability: "",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      alertSuccess: false,
      alertError: false,
      alertPhoneSuccess: false,
      alertPhoneError: false,
      alertApproveSuccess: false,
      alertApproveError: false,
      myName: "",
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  methods: {
    validate() {
      var formData = new FormData();
      formData.append("img", this.imageFile);
      formData.append("userName", this.username);
      formData.append("name", this.myName);
      formData.append("password", this.password);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("age", this.age);
      formData.append("gender", this.select);
      formData.append("ability", JSON.stringify(this.selected));
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        console.log(this.selected);
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/guestSignUp/guest",
            // "http://localhost:3000/guestSignUp/guest",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          )
          .then(response => {
            console.log(response.data);
            if (response.data.state == 0) {
              localStorage.username = this.username;
              localStorage.role = 0;
              console.log(formData.forEach);
              this.$router.push("/");
              location.reload();
            } else {
              console.log(response.data.msg);
            }
          });
      }
    },
    checkUsername() {
      this.axios
        .get(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/guestSignUp/guestConfirm/" +
            this.username
        )
        .then(response => {
          console.log(response.data);
          if (response.data.state == -1) {
            this.alertSuccess = false;
            this.alertError = true;
            this.valid = false;
          } else {
            this.alertSuccess = true;
            this.alertError = false;
          }
        });
    },
    checkPhoneNumber(){
      this.axios
      .post("http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/guestSignUp/phoneConfirm",
      {
        phoneNumber : this.phone,
        confirmNumber : this.confirmNumber
      })
      .then(response =>{
        console.log(response);
        if(response.data.state == -1){
          this.alertApproveSuccess = false;
          this.alertApproveError = true;
          this.valid = false;
        }else{
          this.alertApproveSuccess = true;
          this.alertApproveError = false;
        }
      })
    },
    sendPhoneNumber(){
      //phone번호는 string으로 보내야함 
      this.axios
      .post("http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/guestSignUp/sendPhoneNumber",
      {
        phoneNumber : this.phone
      })
      .then(response =>{
        console.log(response);
          if(response.data.state == -1){
          this.alertPhoneSuccess = false;
          this.alertPhoneError = true;
          this.valid = false;
        }else{
          this.alertPhoneSuccess = true;
          this.alertPhoneError = false;
        }
      })
    },

    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  }
};
</script>

