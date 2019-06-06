<template>
<v-container grid-list-md>
  <v-layout row wrap>
    <v-card width="350">
      <v-img v-if="profileImg" :src="profileImg" alt="Avatar"></v-img>
        <v-icon v-else>person</v-icon>
        <v-layout row wrap>
        <v-flex xs5 sm5 offset-xs1 class="grey--text font-weight-bold">유저 아이디</v-flex>
        <v-flex xs6 sm6>{{userName}}</v-flex>
        <v-flex xs5 sm5 offset-xs1 v-if="role === '0'" class="grey--text font-weight-bold">유저정보</v-flex>
        <v-flex xs5 sm5 v-if="role === '0'">Host</v-flex>
        <v-flex xs5 sm5 offset-xs1 v-if="role === '1'" class="grey--text font-weight-bold">유저정보</v-flex>
        <v-flex xs6 v-if="role === '1'">Guest</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">이름</v-flex>
        <v-flex xs6>{{name}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">성별</v-flex>
        <v-flex xs6>{{gender}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">나이</v-flex>
        <v-flex xs6>{{age}}</v-flex>
        <v-flex xs5 offset-xs1 v-if="role === '1'" class="grey--text font-weight-bold">능력</v-flex>
        <v-flex xs6 v-if="role === '1'">{{ability}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">전화번호</v-flex>
        <v-flex xs6>{{phone}}</v-flex>
        <v-flex xs5 offset-xs1 v-if="role === '0'" class="grey--text font-weight-bold">직업</v-flex>
        <v-flex xs6 v-if="role === '0'">{{work}}</v-flex>
        <v-flex xs5 offset-xs1 v-if="role === '0'" class="grey--text font-weight-bold">지역</v-flex>
        <v-flex xs6 v-if="role === '0'">{{location}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">주소</v-flex>
        <v-flex xs6>{{address}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">평점</v-flex>
        <v-flex xs6></v-flex>
        <v-divider></v-divider>
        <v-flex xs5 offset-xs1 class="text-xs-center">asdf</v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
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
    // console.log("로컬 스토리지! : "+localStorage.role);
    this.role = localStorage.role
    this.getInfo();
  },
  mounted(){
    this.role = localStorage.role;
    this.getInfo();
  },
  methods: {
    getInfo() {
      // localStorage.role == 0 이면 guest && 1이면 host
        let userId = localStorage.username;
        // console.log("로컬 스토리지 역할 정보 : "+localStorage.role);
        if(localStorage.role === '1'){
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
            this.userName = userData.userName;
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
<style>
.btns{
  margin-top:10px;
}
.btn2{
  margin-left:5px;
}
div{
  margin-bottom:5px;
}
</style>


