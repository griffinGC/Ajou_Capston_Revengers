<template>
  <!-- <v-layout> -->
    <!-- <v-dialog v-model="dialog" persistent fullscreen> -->
      <v-card max-width>
        <v-card-title class="title light-blue--text text--lighten-3 font-weight-bold">개인정보</v-card-title>
        <!-- <v-card-text> -->
          <v-card-title>
            <v-layout align-top>
              <v-flex lg3>
                <v-avatar size="225px">
                  <img v-if="profileImg" :src="profileImg" alt="Avatar">
                  <v-icon v-else >person</v-icon>
                </v-avatar>
              </v-flex>
              <v-flex lg1>
                <div class="grey--text font-weight-bold">유저 아이디</div>
                <div  v-if="role === '1'" class="grey--text font-weight-bold">유저정보</div>
                <div  v-if="role === '0'" class="grey--text font-weight-bold">유저정보</div>
                <div class="grey--text font-weight-bold">이름</div>
                <div class="grey--text font-weight-bold">성별</div>
                <div class="grey--text font-weight-bold">나이</div>
                <div  v-if="role === '0'" class="grey--text font-weight-bold">능력</div>
                <div class="grey--text font-weight-bold">전화번호</div>
                <div class="grey--text font-weight-bold">이메일</div>
                <div  v-if="role === '1'" class="grey--text font-weight-bold">직업</div>
                <div  v-if="role === '1'" class="grey--text font-weight-bold">지역</div>
                <div class="grey--text font-weight-bold">주소</div>
                <div class="grey--text font-weight-bold">평점</div>
              </v-flex>
              <v-flex lg1>
                <div>&nbsp;{{userName}}</div>
                <div v-if="role === '1'">Host</div>
                <div v-if="role === '0'">Guest</div>
                <div>{{name}}</div>
                <div>{{gender}}</div>
                <div>{{age}}</div>
                <div v-if="role === '0'">{{ability}}</div>
                <div>{{phone}}</div>
                <div>{{email}}</div>
                <div v-if="role === '1'">{{work}}</div>
                <div v-if="role === '1'">{{location}}</div>
                <div>{{address}}</div>
                <div>{{reference}}</div>
              </v-flex>
            </v-layout>
          </v-card-title>          
        <v-layout row wrap>
        <v-flex sm1 class="btn1">
        <v-btn class="light-blue lighten-2 white--text" v-on:click.native="editInfo">수정하기</v-btn>
        </v-flex>
        <v-flex xs1>
        <v-btn class="light-blue lighten-2 white--text" v-on:click.native="saveCancel">취소 </v-btn>
        </v-flex>
        </v-layout>
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
.btn1{
  margin-left:12.5px;
}
div{
  margin-bottom:7px;
}
</style>


