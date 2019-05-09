<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent fullscreen>
      <v-card>
        <v-card-title class="headline">Guest Sign Up</v-card-title>
        <v-card-text>
          <!--输入框组-->
          <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="Username"
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
              label="Password"
              hint="At least 8 characters"
              counter
              required
              prepend-icon="lock"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              prepend-icon="email"
            ></v-text-field>
            <v-text-field v-model="phone" label="phone" required prepend-icon="phone"></v-text-field>
            <v-slider
               v-model="value"
               :rules="rules"
               label="age"
               step="1"
               thumb-label="always"
               ticks
               required prepend-icon="accessibility">
            </v-slider>
            <v-select
              v-model="select"
              :items="gender"
              :rules="[v => !!v || 'Item is required']"
              label="gender"
              required prepend-icon="wc"
            ></v-select>
            <v-text-field v-model="ability" label="ability" required prepend-icon="list_alt"></v-text-field>
            <v-btn :disabled="!valid" left color="success" @click="validate">Sign Up</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <!--分界标签-->
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { constants } from "crypto";
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
      gender: [
        'Male',
        'Female',
      ],
      value: 20,
        rules: [
          v => v <= 100 || 'Really?!'
      ],
      show1: false,
      show2: true,
      show3: false,
      show4: false
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.axios
          .post("http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/signUp/guest", {
            userName: this.username,
            password: this.password,
            email: this.email,
            phone: this.phone
          })
          .then(respones => {
            console.log(respones.data);
            this.$router.push('/')
          });


        
      }
    }
  }
};
</script>

