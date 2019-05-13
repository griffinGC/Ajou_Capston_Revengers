<template>
  <!-- <v-layout row> -->
    <!-- <v-dialog v-model="dialog" persistent fullscreen> -->
      <v-card>
        <v-card-title class="headline">유저정보수정</v-card-title>
        <!-- <v-card-text> -->
          <v-card-title>
          <v-flex lg12>
            <v-avatar size="80px">
              <img
                v-if="profileImg"
                :src="profileImg"
                alt="Avatar">
              <v-icon
                v-else
              >person</v-icon>
            </v-avatar>
          </v-flex>

          </v-card-title>
          <v-card-title>
          <v-flex xs md3 hidden-xs-only>
            <strong >유저 아이디 : </strong>
              <span>
              &nbsp;{{ userName }}
            </span>
          </v-flex>
          </v-card-title>
          <v-card-title><strong >비밀번호 : </strong ><v-text-field v-model="password"              
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field></v-card-title>          
          <v-card-title><strong >이름 : </strong ><v-text-field v-model="name"></v-text-field></v-card-title>
          <v-card-title><strong >성별 : </strong >{{gender}}</v-card-title>
          <v-card-title><strong >나이 : </strong >{{age}}</v-card-title>
          <!-- <v-card-title><strong >나이 : </strong ><v-text-field v-model="age"></v-text-field></v-card-title> -->
          <v-card-title v-if="role === '0'"><strong >능력 : </strong ><v-text-field v-model="ability"></v-text-field></v-card-title>
          <v-card-title><strong >전화번호 : </strong ><v-text-field v-model="phone"></v-text-field></v-card-title>
          <v-card-title><strong >이메일 : </strong ><v-text-field v-model="email"></v-text-field></v-card-title>
          <v-card-title v-if="role === '1'"><strong>직업 : </strong>{{work}}</v-card-title>
          <v-card-title v-if="role === '1'"><strong >지역 : </strong ><v-text-field v-model="location"></v-text-field></v-card-title>
          <v-card-title v-if="role === '1'"><strong >주소 : </strong ><v-text-field v-model="address"></v-text-field></v-card-title>
          <v-card-title><strong >평점 : </strong >{{reference}}</v-card-title>
        <!-- </v-card-text> -->
        <v-btn v-on:click.native="saveEdit">확인</v-btn>
        <v-btn v-on:click.native="saveCancel">취소 </v-btn>
      </v-card>

    <!-- </v-dialog> -->
  <!-- </v-layout> -->
</template>

<script>
import { constants } from "crypto";
export default {
  data() {
    return {
      dialog: true,
  // userName: localStorage.username,
      userName : "test",
      name : "default",
      profileImg : "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      password : "",
      gender : "man",
      age : "22",
      ability : "can do anything",
      phone : "01011112222",
      email : "chchch@gggg",
      reference : "",
      role : "dfdf",
      work : "dfdf",            
      address : "dfdf",
      location : "zzzz",

      show1: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      role : ""

    };
  },
  created(){
    console.log("userEdit is created");
    this.role = localStorage.role;
    this.getInfo();
  },
  methods: {
    getInfo() {
      // localStorage.role == 0 이면 guest && 1이면 host
        let userId = localStorage.username;
        if(localStorage.role === '0'){
        this.axios
          .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/guest/${userId}`)
          .then(response => {
            console.log(response.data[0]);
            let userData = response.data[0];
            this.userName = userData.userName;
            this.name = userData.name;
            this.profileImg = userData.profileImg;
            this.age = userData.age;
            this.ability = userData.ability;
            this.phone = userData.phone;
            this.email = userData.email;
            this.reference = userData.reference;
          });
      }else{
        this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/host/${userId}`)
        .then(response =>{
          console.log(response.data[0]);
            let userData = response.data[0];
            // userName = userData.userName;
            this.name = userData.name;
            this.profileImg = userData.profileImg;
            this.age = userData.age;
            this.work = userData.work;
            this.address = userData.address;
            this.location = userData.location;
            this.phone = userData.phone;
            this.email = userData.email;
            this.reference = userData.reference;

        });
      };
    },
    saveEdit(){
      console.log("save Action start! ");// localStorage.role == 0 이면 guest && 1이면 host
        let userId = localStorage.username;
        if(!this.password)
        {
          alert("비밀번호를 입력해주세요!");
          return;
        }
        if(localStorage.role === '0'){
        this.axios
          .post("http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/updateInfo/guest",{
            userName : this.userName,
            password : this.password,
            name : this.name,
            ability :this.ability,
            phone : this.phone,
            email : this.email 

          })
      }else{
        this.axios
        .post("http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/updateInfo/host",{
            userName : this.userName,
            password : this.password,
            name : this.name,
            ability :this.ability,
            phone : this.phone,
            email : this.email 
        })
        .then(console.log("save is success"));
      };
      this.$router.push('/userInfo')
    },
    saveCancel(){
      console.log("save cancel");
      this.$router.push('/');
    }
  }
};
</script>

