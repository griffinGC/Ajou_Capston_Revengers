<template>
<v-container grid-list-md>
    <v-layout column wrap>
      <v-flex xs12 sm12 md4>
      <v-card >
        <v-title>개인정보 </v-title>
         <v-img v-if="profileImg" :src="profileImg" alt="Avatar">
         </v-img>
         <v-icon v-else>person</v-icon>
        <v-layout row wrap>
        <v-flex xs5 sm5 offset-xs1 class="grey--text font-weight-bold">유저 아이디</v-flex>
        <v-flex xs6 sm6>{{userName}}</v-flex>
        <v-flex xs5 sm5 offset-xs1 v-if="role === '1'" class="grey--text font-weight-bold">유저정보</v-flex>
        <v-flex xs5 sm5 v-if="role === '1'">Host</v-flex>
        <v-flex xs5 sm5 offset-xs1 v-if="role === '0'" class="grey--text font-weight-bold">유저정보</v-flex>
        <v-flex xs6 v-if="role === '0'">Guest</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">이름</v-flex>
        <v-flex xs6>{{name}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">성별</v-flex>
        <v-flex xs6>{{gender}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">나이</v-flex>
        <v-flex xs6>{{age}}</v-flex>
        <v-flex xs5 offset-xs1 v-if="role === '0'" class="grey--text font-weight-bold">능력</v-flex>
        <v-flex xs6 v-if="role === '0'">{{ability}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">전화번호</v-flex>
        <v-flex xs6>{{phone}}</v-flex>
        <v-flex xs5 offset-xs1 v-if="role === '1'" class="grey--text font-weight-bold">직업</v-flex>
        <v-flex xs6 v-if="role === '1'">{{work}}</v-flex>
        <v-flex xs5 offset-xs1 v-if="role === '1'" class="grey--text font-weight-bold">지역</v-flex>
        <v-flex xs6 v-if="role === '1'">{{location}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">주소</v-flex>
        <v-flex xs6>{{address}}</v-flex>
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">평점</v-flex>
        <v-flex xs6></v-flex>
        <v-flex xs12 sm8 md8 text-md-right offset-xs3 offset-md7 mb-3>
          <v-btn class="light-blue lighten-2 white--text" v-on:click.native="editInfo">수정하기</v-btn>
          <v-btn class="light-blue lighten-2 white--text" v-on:click.native="saveCancel">취소 </v-btn>
        </v-flex>
        <v-divider></v-divider>
        </v-layout>
      </v-card>
      </v-flex>
      <v-flex md5>
      <v-card>
        <v-title>방문한 목록 </v-title>
          <v-card class="pa-1" v-for="reference in referenceList" :key="reference.id">
          <v-layout row wrap :class="`pa-1 project.${reference.title}`">

            <v-flex xs5 md2>
              <div class="caption grey--text">글 제목</div>
              <div>{{reference.boardInfo.title}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">글 작성자</div>
              <div>{{reference.writer}}</div>
            </v-flex>

            <v-flex xs4 sm4 md4>
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
    </v-layout>
  </v-container>
     
      <!-- <v-flex xs12>
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
  </v-container> -->
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