<template>
  <v-card>
    <v-card-title class="headline">주인장 회원가입</v-card-title>
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
        <!--username check btn and alert -->
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
        <!--location-->
        <v-flex xs12 sm6 md6>
          <h3>지역:</h3>
          <v-radio-group v-model="location" row>
            <v-radio label="경기도" color="indigo" value="경기도"></v-radio>
            <v-radio label="인천" color="indigo" value="인천"></v-radio>
            <v-radio label="충청북도" color="indigo" value="충청북도"></v-radio>
            <v-radio label="충청남도" color="indigo" value="충청남도"></v-radio>
            <v-radio label="경상북도" color="indigo" value="경상북도"></v-radio>
            <v-radio label="경상남도" color="indigo" value="경상남도"></v-radio>
            <v-radio label="전라북도" color="indigo" value="전라북도"></v-radio>
            <v-radio label="전라남도" color="indigo" value="전라남도"></v-radio>
            <v-radio label="강원도" color="indigo" value="강원도"></v-radio>
            <v-radio label="제주도" color="indigo" value="제주도"></v-radio>
          </v-radio-group>
        </v-flex>
        <!--phone-->
        <v-text-field
          v-model="phone"
          label="전화번호"
          :rules="[phoneRules.required,phoneRules.min]"
          required
          prepend-icon="phone"
        ></v-text-field>
        <v-alert :value="alertPhoneSuccess" type="success">전화번호 전송 성공!</v-alert>
        <v-alert :value="alertPhoneError" type="error">전화번호 전송 에러!</v-alert>
        <v-btn left color="success" @click="sendPhoneNumber">전화번호 인증</v-btn>

        <v-text-field
          v-model="confirmNumber"
          label="인증번호"
          :rules="[confirmRules.required,confirmRules.min,confirmRules.number]"
          required
          prepend-icon="done"
        ></v-text-field>
        <v-alert :value="alertApproveSuccess" type="success">인증번호 확인 성공!</v-alert>
        <v-alert :value="alertApproveError" type="error">인증번호 확인 에러!</v-alert>
        <v-btn left color="success" @click="checkPhoneNumber">인증번호 확인</v-btn>

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


        <v-select
          v-model="select"
          :items="gender"
          :rules="[v => !!v || '성별을 선택 해야 합니다.']"
          label="성별"
          required
          prepend-icon="wc"
        ></v-select>


        <GMap/>

        <div class="grey--text text--darken-1">업종</div>
        <v-layout row wrap>
            <v-flex sm2><v-checkbox v-model="work" label="농업" value="agriculture"></v-checkbox></v-flex>
            <v-flex sm2><v-checkbox v-model="work" label="임업" value="forestry"></v-checkbox></v-flex>
            <v-flex sm2><v-checkbox v-model="work" label="수산업" value="fishery"></v-checkbox></v-flex>
            <v-flex sm2><v-checkbox v-model="work" label="목축업" value="livestock"></v-checkbox></v-flex>
            <v-flex sm2><v-checkbox v-model="work" label="기타" value="others"></v-checkbox></v-flex>
        </v-layout>
        <!--signup btn-->
        <br>
        <v-btn :disabled="!valid" left color="success" @click="validate">회원가입</v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <!--分界标签-->
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat router :to="{name: 'Signin'}">돌아가기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GMap from "../views/GMap";
export default {
  data() {
    return {
      work: "",
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
      feedback: "",
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
      age: 30,
      rules: [v => v <= 100 || "?!"],

      myName: "",
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
      imageName: "",
      imageUrl: "",
      imageFile: "",
      location: "경기도"
    };
  },
  components: {
    GMap
  },
  methods: {
    validate() {
      var formData = new FormData();
      formData.append("img", this.imageFile);
      formData.append("userName", this.username);
      formData.append("password", this.password);
      formData.append("name", this.myName);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("age", this.age);
      formData.append("gender", this.select);
      formData.append("work", this.work);
      formData.append("location", this.location);
      formData.append('lat',localStorage.lat)
      formData.append('lng', localStorage.lng)
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/hostSignUp/host",
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
              (localStorage.username = this.username), (localStorage.role = 1);
              this.$router.push("/");
              location.reload();
            } else {
              console.log("error" + response.data);
            }
          });
      }
    },
    checkUsername() {
      this.axios
        .get(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/hostSignUp/hostConfirm/" +
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
    checkPhoneNumber() {
      this.axios
        .post(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/hostSignUp/phoneConfirm",
          {
            phoneNumber: this.phone,
            confirmNumber: this.confirmNumber
          }
        )
        .then(response => {
          console.log(response);
          if (response.data.state == -1) {
            this.alertApproveSuccess = false;
            this.alertApproveError = true;
            this.valid = false;
          } else {
            this.alertApproveSuccess = true;
            this.alertApproveError = false;
          }
        });
    },
    sendPhoneNumber() {
      //phone번호는 string으로 보내야함
      this.axios
        .post(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/hostSignUp/sendPhoneNumber",
          {
            phoneNumber: this.phone
          }
        )
        .then(response => {
          console.log(response);
          if (response.data.state == -1) {
            this.alertPhoneSuccess = false;
            this.alertPhoneError = true;
            this.valid = false;
          } else {
            this.alertPhoneSuccess = true;
            this.alertPhoneError = false;
          }
        });
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