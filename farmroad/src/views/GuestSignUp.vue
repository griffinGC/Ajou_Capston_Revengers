<template>
  <v-card>
    <v-card-title class="headline">Guest Sign Up</v-card-title>
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

        <!--username check btn and alert-->
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

        <!--phone-->
        <v-text-field v-model="phone" label="phone" required prepend-icon="phone"></v-text-field>
        <v-slider
          v-model="age"
          :rules="rules"
          label="age"
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
          label="gender"
          required
          prepend-icon="wc"
        ></v-select>

        <!--ability-->
        <v-text-field v-model="ability" label="ability" required prepend-icon="list_alt"></v-text-field>

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
      select: null,
      gender: ["Male", "Female"],
      age: 20,
      rules: [v => v <= 100 || "Really?!"],
      ability: "",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      alertSuccess: false,
      alertError: false,
      myName: "",
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/signUp/guest",
            {
              userName: this.username,
              password: this.password,
              email: this.email,
              phone: this.phone,
              name: this.myName,
              age: this.age,
              gender: this.select,
              ability: this.ability
            }
          )
          .then(response => {
            console.log(response.data);
            if (response.data.state == 0) {
              localStorage.username = this.username;
              localStorage.role = 0;
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
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/signUp/guestConfirm/" +
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
    },
  }
};
</script>

