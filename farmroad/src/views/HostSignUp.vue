<template>
  <v-card>
    <v-card-title class="headline">Host Sign Up</v-card-title>
    <v-card-text>
      <!--input from-->
      <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
        <!--username-->
        <v-text-field
          label="Username"
          v-model="username"
          :rules="usernameRules"
          prepend-icon="person"
        ></v-text-field>
        <!--username check btn and alert -->
        <v-alert :value="alertSuccess" type="success">This is a success alert.</v-alert>
        <v-alert :value="alertError" type="error">This is a error alert.</v-alert>
        <v-btn left color="success" @click="checkUsername">check</v-btn>

        <!--img upload-->
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
          <img :src="imageUrl" height="150" v-if="imageUrl">
          <v-text-field
            label="Select Image"
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
        <v-text-field label="name" v-model="myName" prepend-icon="account_box"></v-text-field>

        <!--password-->
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :rules="[passwordRules.required, passwordRules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
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
          label="E-mail"
          required
          prepend-icon="email"
        ></v-text-field>
        <!--location-->
        <v-flex xs12 sm6 md6>
          <h3>location:</h3>
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
          label="phone"
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
          label="Age"
          step="1"
          thumb-label="always"
          ticks
          required
          prepend-icon="accessibility"
        ></v-slider>


        <v-select
          v-model="select"
          :items="gender"
          :rules="[v => !!v || 'Item is required']"
          label="gender"
          required
          prepend-icon="wc"
        ></v-select>


        <GMap/>

        <div class="grey--text text--darken-1">Ability</div>
        <v-layout row wrap>
          <v-flex sm2>
            <v-checkbox v-model="work" label="농업" value="농업"></v-checkbox>
          </v-flex>
          <v-flex sm2>
            <v-checkbox v-model="work" label="임업" value="임업"></v-checkbox>
          </v-flex>
          <v-flex sm2>
            <v-checkbox v-model="work" label="수산업" value="수산업"></v-checkbox>
          </v-flex>
          <v-flex sm2>
            <v-checkbox v-model="work" label="목축업" value="목축업"></v-checkbox>
          </v-flex>
          <v-flex sm2>
            <v-checkbox v-model="work" label="기타" value="기타"></v-checkbox>
          </v-flex>
        </v-layout>
        <!--signup btn-->
        <br>
        <v-btn :disabled="!valid" left color="success" @click="validate">Sign Up</v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <!--分界标签-->
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat router :to="{name: 'Signin'}">Back</v-btn>
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
        v => !!v || "Name is required",
        v => (v && v.length >= 8) || "Name must be less than 10 characters"
      ],
      password: "",
      passwordRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      },

      dialog: true,
      valid: true,
      feedback: "",
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],

      phone: "",
      phoneRules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      },

      confirmNumber: "",
      confirmRules: {
        required: value => !!value || "Required.",
        min: v => v.length === 4 || "4자리 숫자!",
        number: v => isNaN(v) === false || "숫자!"
      },

      select: null,
      gender: ["Male", "Female"],
      age: 30,
      rules: [v => v <= 100 || "Really?!"],

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
      formData.append('latitude',localStorage.lat)
      formData.append('longitude', localStorage.lng)
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