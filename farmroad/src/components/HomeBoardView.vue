<template>
  <v-dialog v-model="dialog" max-width="650px">
    <!-- <v-btn @click="viewClicked()" flat slot="activator" class="success">view</v-btn> -->
    <v-btn flat slot="activator" class="success">정보 확인</v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap class="cont">
            <v-flex sm6>
              <v-avatar id="avatar" size="220px">
                <img
                v-if="candidateData.profileImg"
                :src="candidateData.profileImg"
                alt="Avatar">
                <v-icon id="altImg" size="100px"
                v-else
                >person</v-icon>  
              </v-avatar>
              <!-- <v-card-text> -->
                <!-- <div class="rating"> -->
                <!-- <v-rating :value="board.difficulty" readonly></v-rating> -->
                <!-- <v-rating :value="10" readonly></v-rating> -->
                <!-- </div> -->
              <!-- </v-card-text> -->
            </v-flex>
            <v-flex sm6>
            <v-layout row wrap>
            <v-flex sm5 class="grey--text font-weight-bold">아이디</v-flex>
            <v-flex sm6>{{candidateData.userName}}</v-flex>
            <v-flex sm5 class="grey--text font-weight-bold">이름</v-flex>
            <v-flex sm6>{{candidateData.name}}</v-flex>
            <v-flex sm5 class="grey--text font-weight-bold">성별</v-flex>
            <v-flex sm6>{{candidateData.gender}}</v-flex>
            <v-flex sm5 class="grey--text font-weight-bold">나이</v-flex>
            <v-flex sm6>{{candidateData.age}}</v-flex>
            <v-flex sm5 class="grey--text font-weight-bold">전화번호</v-flex>
            <v-flex sm6>{{candidateData.phone}}</v-flex>
            <v-flex sm5 class="grey--text font-weight-bold">이메일</v-flex>
            <v-flex sm6>{{candidateData.email}}</v-flex>
            <v-flex sm5 v-if="role==='0'" class="grey--text font-weight-bold" >위치</v-flex>
            <v-flex sm6 v-if="role==='0'">{{candidateData.location}}</v-flex>
            <v-flex sm5 v-if="role==='1'" class="grey--text font-weight-bold" >능력</v-flex>
            <v-flex sm6 v-if="role==='1'">{{candidateData.ability}}</v-flex>
            </v-layout>
            </v-flex>
            <v-flex sm12 offset-sm5>
              <v-layout column wrap>
               <v-flex sm3>
                <v-card-actions>
                <v-btn flat slot="activator" color="success" :disabled="nowApprove" @click="approveCandidate(candidateData.userName)">
                  <v-icon small left>favorite</v-icon>
                  <span>승낙</span>
                  </v-btn>
                <v-btn flat slot="activator" color="success" :disabled="nowRefuse" @click="refuseCandidate(candidateData.userName)">
                  <v-icon small left>clear</v-icon>
                  <span>거절</span>
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-flex>
            </v-layout>
        </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      // candidateInfo : ""
      boards: [],
      dialog : false,
      candidateData : {

      },
      nowApprove : false,
      nowRefuse : false,
    };
  },
  props : ['candidateInfo', 'notificationId', 'state', 'boardId','writerId', 'boardTitle'],
  created() {
    // console.log("view is created");
    console.log("props로 받은 값 : " + this.candidateInfo);
    console.log("board id : " + this.notificationId);
    this.viewClicked();
    console.log(this.state);
    if(this.state === "approve"){
      this.nowApprove = true;
    }else if(this.state === "refuse"){
      this.nowRefuse = true;
    }else{
      this.nowApprove = false;
      this.nowRefuse = false;
    }
    console.log("거절 상태 : " +this.nowRefuse);
    console.log("승인 상태 : " +this.nowApprove);
    this.role=localStorage.role;
  },
  mounted(){
    this.viewClicked();
    console.log(this.state);
    if(this.state === "approve"){
      this.nowApprove = true;
    }else if(this.state === "refuse"){
      this.nowRefuse = true;
    }else{
      this.nowApprove = false;
      this.nowRefuse = false;
    }
    this.role = localStorage.role;
  },

  methods: {
    viewClicked(){
      console.log("view is clicked!");
      // localStorage.role == 0 이면 guest && 1이면 host
        let userId = this.candidateInfo;
        // console.log("로컬 스토리지 역할 정보 : "+localStorage.role);
        //내가 guest일 경우 host의 정보를 가져옴 
        if(localStorage.role === '0'){
        this.axios
          .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/host/${userId}`)
          .then(response => {
            console.log(response.data[0]);
            let userData = response.data[0];
            console.log("받은 data 이름: " + userData.userName);
            // console.log("받은 data 이름2: " + this.candidateData.userName);
            this.candidateData.userName = userData.userName;
            console.log("받은 data 이름2: " + this.candidateData.userName);
            this.candidateData.name = userData.name;
            this.candidateData.profileImg = userData.profileImg;
            this.candidateData.age = userData.age;
            this.candidateData.gender = userData.gender;
            this.candidateData.work = userData.work;
            this.candidateData.address = userData.address;
            this.candidateData.location = userData.location;
            this.candidateData.phone = userData.phone;
            this.candidateData.email = userData.email;
            this.candidateData.reference = userData.reference;

            // this.candidateData.boardId = userData.boardId;
            this.candidateData.notificationId = userData.notificationId;

          });
      }else{
        //내가 host일 경우 guest정보를 가져옴 
        this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/guest/${userId}`)
        .then(response =>{
          console.log(response.data[0]);
            let userData = response.data[0];
            this.candidateData.userName = userData.userName;
            this.candidateData.name = userData.name;
            this.candidateData.profileImg = userData.profileImg;
            this.candidateData.age = userData.age;
            this.candidateData.gender = userData.gender;
            this.candidateData.ability = userData.ability;
            this.candidateData.phone = userData.phone;
            this.candidateData.email = userData.email;
            this.candidateData.reference = userData.reference;

            // this.candidateData.boardId = userData.boardId;

            this.candidateData.notificationId = userData.notificationId;

        });
      };
    },
    approveCandidate(name){
      console.log("notify state ");
      console.log("보낼 보드 id : " + this.boardId);
      console.log("보낼 writer id : " + this.writerId);
        // console.log(name);
        //guest일때 host 승인
         if(localStorage.role === '0'){
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/guestApprove",
            {
            userName : name,
            notificationId : this.notificationId,
            boardId : this.boardId,
            writerName : this.writerId,
            boardTitle : this.boardTitle
            }
          )
          .then(response => {
            if (response.data.state == -1) {
              alert("승인에 실패했습니다.");
            } else {
              console.log("승인에 성공했습니다.");
              location.reload();
            }
         });
        //host일때 guest 승인
         }else if(localStorage.role === '1'){
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/hostApprove",
            {
            userName : name,
            notificationId : this.notificationId,
            boardId : this.boardId,
            writerName : this.writerId,
            boardTitle : this.boardTitle
            }
          )
          .then(response => {
            if (response.data.state == -1) {
              alert(response.data.msg);
            } else {
              console.log(response.data.msg);
              location.reload();
            }
          });
      }

    },
    refuseCandidate(name){
        console.log("notify state ");
        // console.log(name);
        console.log("보낼 보드 id : " + this.boardId);
      console.log("보낼 writer id : " + this.writerId);
        // console.log(boardId);
        if(localStorage.role === '0'){
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/guestRefuse",
          {
            userName : name,
            notificationId : this.notificationId,
            boardId : this.boardId,
            writerName : this.writerId
          }
          )
          .then(response => {
            if (response.data.state == -1) {
              alert("거절에 실패했습니다.");
            } else {
              console.log("거절에 성공했습니다.");
              location.reload();
            }
         });
         
         }else if(localStorage.role === '1'){
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/hostRefuse",
          {
            userName : name,
            notificationId : this.notificationId,
            boardId : this.boardId,
            writerName : this.writerId
            }
          )
          .then(response => {
            if (response.data.state == -1) {
              alert("거절에 실패했습니다.");
            } else {
              console.log("거절에 성공했습니다.");
              location.reload();
            }
          });
         }

    },
  }
};
</script>
<style>
.info1 div{
  margin-left:12px;
  margin-bottom:10px;
}
/* .rating{
  margin-left:5px;
  margin-top:0px;
} */
.cont{
  margin-left:30px;
  margin-top:30px;
}
</style>
