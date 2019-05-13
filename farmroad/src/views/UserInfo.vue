<template>
  <!-- <v-layout> -->
    <!-- <v-dialog v-model="dialog" persistent fullscreen> -->
      <v-card max-width>
        <v-card-title class="headline">개인정보</v-card-title>
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
                :color="color"
                v-text="person"
              ></v-icon>
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
          <v-card-title center><strong >이름 : </strong >{{name}}</v-card-title>
          <v-card-title><strong >성별 : </strong >{{gender}}</v-card-title>
          <v-card-title><strong >나이 : </strong >{{age}}</v-card-title>
          <v-card-title><strong >능력 : </strong >{{ability}}</v-card-title>
          <v-card-title><strong >전화번호 : </strong >{{phone}}</v-card-title>
          <v-card-title><strong >이메일 : </strong >{{email}}</v-card-title>
          <!-- <v-card-title>직업 : {{work}}</v-card-title> -->
          <v-card-title><strong >지역 : </strong >{{location}}</v-card-title>
          <v-card-title><strong >주소 : </strong >{{address}}</v-card-title>
          <v-card-title><strong >평점 : </strong >{{reference}}</v-card-title>
        <!-- </v-card-text> -->
        <v-btn v-on:click.native="editInfo">수정하기</v-btn>
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
      work : "dfdf",            
      address : "dfdf",
      location : "zzzz",
      role :""

    };
  },
  created(){
    console.log("userInfo is created");
    console.log(parseInt(localStorage.role));
    this.getInfo();
  },
  methods: {
    getInfo() {
      // localStorage.role == 0 이면 guest && 1이면 host
        let userId = localStorage.username;
        if(localStorage.role === 0){
        this.axios
          .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/guest/${userId}`)
          .then(respones => {
            console.log(respones.data);
            let userData = response.data;
            // userName = userData.userName;
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
        .then(responses =>{
          console.log(response.data);
            let userData = response.data;
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
    editInfo(){
      console.log("edit clicked!")
      this.$router.push('/editUserInfo');
    },
    saveCancel(){
      console.log("save cancel");
      this.$router.push('/');
    }
  }
};
</script>

