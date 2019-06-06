<template>
  <v-container fluid grid-list-lg>
  <!-- <v-layout> -->
    <!-- <v-dialog v-model="dialog" persistent fullscreen> -->
      <v-card max-width>
        <v-card-title class="title light-blue--text text--lighten-3 font-weight-bold">개인정보</v-card-title>
        <!-- <v-card-text> -->
          <v-card-title>
              <v-layout align-top row wrap>
                <v-flex lg3>
                  <v-avatar size="225px">
                    <img v-if="profileImg" :src="profileImg" alt="Avatar">
                    <v-icon v-else >person</v-icon>
                  </v-avatar>
                  <v-layout column wrap class="btns">
                  <v-flex de-flex sm4>
                  <v-btn class="light-blue lighten-2 white--text" v-on:click.native="editInfo">수정하기</v-btn>
                  <v-btn class="light-blue lighten-2 white--text" v-on:click.native="saveCancel">취소 </v-btn>
                  </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex lg2>
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
      </v-card>
      <v-flex xs12>
    <v-flex xl12>
      <div class="grey--text text--darken-1"></div>
        <v-card color="lime lighten-5" height="450" v-chat-scroll>
          <v-title>방문한 목록 </v-title>
          <v-card class="pa-1" v-for="reference in referenceList" :key="reference.id">
          <v-layout row wrap :class="`pa-1 project.${reference.title}`">

            <v-flex xs6 md6>
              <div class="caption grey--text">글 제목</div>
              <div>{{reference.boardInfo.title}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">글 작성자</div>
              <!-- <div>{{project.guestInfo}}</div> -->
              <div>{{reference.writer}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">방문날짜</div>
              <div>{{reference.boardInfo.startDate}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div>
                <WriteReference :notificationInfo="`${reference.boardInfo}`"/>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-card>
    </v-flex>
  </v-flex>
  </v-container>
    <!-- </v-dialog> -->
  <!-- </v-layout> -->
</template>

<script>
import { constants } from "crypto";
import WriteReference from '../components/WriteReference'
export default {
  data() {
    
    return {
      dialog: true,
  // userName: localStorage.username,
      userName : "test",
      userId : "",
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
      role :"",
      referenceList :[
        // {title : "gggg"}
      ]

    };
  },
  components: {
    WriteReference
  },
  created(){
    console.log("userInfo is created");
    this.role = localStorage.role
    this.getInfo();
    this.getNotificationInfo();
  },
  mounted(){
    this.role = localStorage.role;
    this.getInfo();
    this.getNotificationInfo();

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
            // console.log(response.data[0]);
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
          // console.log(response.data[0]);
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
      // console.log("edit clicked!")
      this.$router.push('/editUserInfo');
    },
    saveCancel(){
      // console.log("save cancel");
      this.$router.push('/');
    },
    getNotificationInfo(){
      let userId = localStorage.username;
      if (localStorage.role == 0) {
      this.axios
        .get(
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/getHostApprove/${userId}`
        )
        .then(response => {
          console.log(response.data);
          // console.log("받아온 값")
          this.referenceList = response.data;
        });
      } else if (localStorage.role == 1) {
      this.axios
        .get(
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/getGuestApprove/${userId}`
        )
        .then(response => {
          // console.log(response.data);
          // console.log("받아온 값")
          this.referenceList = response.data;
        });
      }
    },
    writeReference(){

    }
  },
  
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


