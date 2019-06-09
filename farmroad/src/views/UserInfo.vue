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
          <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon  color="pink">done</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title >후기</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="reference in getMyReferenceList"
            :key="reference.boardId"
            avatar  
          >

            <v-list-tile-avatar v-if="reference.writerImg">
              <img  :src="reference.writerImg">
            </v-list-tile-avatar>
            <v-icon v-else size="40px">person</v-icon>

            <v-list-tile-content>
              <v-list-tile-title v-text="reference.title"></v-list-tile-title>
              <v-list-tile-sub-title v-text="reference.content"></v-list-tile-sub-title>
            </v-list-tile-content>
            


            <!-- <v-btn v-if="board.report === false" color="error" @click="updateToError(board)">게시글 금지 </v-btn>
            <v-btn v-else color="success" @click="updateToAble(board)">게시글 해제 </v-btn> -->

          </v-list-tile>
        </v-list>          
      </v-card>
      <v-flex xs12>
    <v-flex xl12>
      <div class="grey--text text--darken-1"></div>
        <v-card color="lime lighten-5" height="450" v-chat-scroll>
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
                <WriteReference if="!"
                :boardId="`${reference.boardInfo.boardId}`" 
                :boardWriter="`${reference.writer}`"
                />
                <!-- {{reference.boardInfo.Info}} -->
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
      ],
      getMyReferenceList :[

      ],
      // notificationList:[],
      alreadyReference :[]
    };
  },
  components: {
    WriteReference
  },
  created(){
    console.log("userInfo is created");
    this.role = localStorage.role
    this.getInfo();
    this.getWriteReference();
    this.getMyReference();
    this.getNotificationInfo();
    // this.compareReference(this.referenceList, this.alreadyReference);
    console.log("들어있는 값 : " + this.referenceList);
    console.log("reference 값 : " + this.getMyReferenceList);
  },
  mounted(){
    this.role = localStorage.role;
    this.getInfo();
    this.getWriteReference();
    this.getMyReference();
    this.getNotificationInfo();
    console.log("들어있는 값 : " + this.referenceList);
  },
  methods: {
    getInfo() {
      // localStorage.role == 0 이면 guest && 1이면 host
        let userId = localStorage.username;
        if(localStorage.role === '0'){
        this.axios
          .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/guest/${userId}`)
          .then(response => {
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
      this.$router.push('/editUserInfo');
    },
    saveCancel(){
      this.$router.push('/');
    },
    getNotificationInfo(){
      let userId = localStorage.username;
      //guest일때는 host가 approve한 것 보여줌
      if (localStorage.role == 0) {
      this.axios
        .get(
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/getHostApprove/${userId}`
        )
        .then(response => {
          // console.log("notification 정보 값1")
          // console.log(response.data);
          // console.log("notification 정보 값1")
          // this.notificationList = response.data;
          this.referenceList = response.data;
        });
      } else if (localStorage.role == 1) {
      this.axios
        .get(
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/getGuestApprove/${userId}`
        )
        .then(response => {
          // console.log("notification 정보 값2")
          // console.log(response.data);
          // console.log("notification 정보 값2")
          // this.notificationList = response.data;
          this.referenceList = response.data;
        });
      }
    },
    getWriteReference(){
      //자기가 작성한 reference가져오기
      let userId = localStorage.username;
            if (localStorage.role == 0) {
      this.axios
        .get(
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/getGuestMyReference/${userId}`
        )
        .then(response => {
          // console.log("reference 정보")
          // console.log(response.data);
          // console.log("reference 정보")
          this.alreadyReference = response.data;
        });
      } else if (localStorage.role == 1) {
      this.axios
        .get(
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/getHostMyReference/${userId}`
        )
        .then(response => {
          // console.log("reference 정보")
          // console.log(response.data);
          // console.log("reference 정보")
          this.alreadyReference = response.data;
        });
      }
    },
    getMyReference(){
      let userId = localStorage.username;
      //guest일때는 host가 approve한 것 보여줌
      if (localStorage.role == 0) {
      this.axios
        .get(
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/getGuestReference/${userId}`
        )
        .then(response => {
          console.log("나한테 작성된 reference 정보 값1")
          console.log(response.data);
          console.log("나한테 작성된 reference 정보 값1")
          this.getMyReferenceList = response.data;
        });
      } else if (localStorage.role == 1) {
      this.axios
        .get(
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/getHostReference/${userId}`
        )
        .then(response => {
          console.log("나한테 작성된 reference 정보 값1")
          console.log(response.data);
          console.log("나한테 작성된 reference 정보 값1")
          this.getMyReferenceList = response.data;
        });
      }
    },
    compareReference(exist){
      let temp = new Array();
        console.log("작성한 값 : " +temp);
        this.referenceList.forEach(item =>{
          for(let i = 0; i<exist.length; i++){
            if((exist[i].boardId === item.boardInfo.boardId)&& (exist[i].writer === item.userName)){
              item = exist[i];
            }
          }
        })
        console.log("수정된 값1")
        console.log(this.referenceList);   
        console.log("수정된 값1")
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