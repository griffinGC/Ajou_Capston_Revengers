<template>
<v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6 sm7 md4>
      <v-card >
        
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
        <v-flex xs8 sm8 md8 text-md-right offset-xs4 offset-md3 mb-3>
          <v-btn class="light-blue lighten-2 white--text" v-on:click.native="editInfo">수정하기</v-btn>
          <v-btn class="light-blue lighten-2 white--text" v-on:click.native="saveCancel">취소 </v-btn>
        </v-flex>
        <v-divider></v-divider>
        </v-layout>
          
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
            

          </v-list-tile>
        </v-list>          
      </v-card>
      </v-flex>
      <v-flex md5>
      <v-card>
        
          <v-card class="pa-1" v-for="reference in referenceList" :key="reference.id">
          <v-layout row wrap :class="`pa-1 project.${reference._id}`">

            <v-flex xs5 md3>
              <div class="caption grey--text">글 제목</div>
              
              <div>{{reference.boardTitle}}</div>
            </v-flex>

            <v-flex xs6 sm4 md5>
              <div class="caption grey--text">글 작성자</div>
              <div>{{reference.writer}}</div>
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
    this.getMyReference();
    this.getNotificationInfo();
    // this.compareReference(this.referenceList, this.alreadyReference);
    console.log("들어있는 값 : " + this.referenceList);
    console.log("reference 값 : " + this.getMyReferenceList);
  },
  mounted(){
    this.role = localStorage.role;
    this.getInfo();
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
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/getGuestMyReference/${userId}`
        )
        .then(response => {
          console.log("notification 정보 값1")
          console.log(response.data);
          console.log("notification 정보 값1")
          // this.notificationList = response.data;
          this.referenceList = response.data;
        });
      } else if (localStorage.role == 1) {
      this.axios
        .get(
          `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/getHostMyReference/${userId}`
        )
        .then(response => {
          console.log("notification 정보 값2")
          console.log(response.data);
          console.log("notification 정보 값2")
          // this.notificationList = response.data;
          this.referenceList = response.data;
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
          let result = response.data;
          for(let i = 0; i<result.length; i++){
            if(result[i].title === undefined)
            {
              result.splice(i, 1);
            }
          }
          this.getMyReferenceList = result;
          
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
          let result = response.data;
          for(let i = 0; i<result.length; i++){
            if(result[i].title === undefined)
            {
              result.splice(i, 1);
            }
          }
          this.getMyReferenceList = result;
        });
      }
    },
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