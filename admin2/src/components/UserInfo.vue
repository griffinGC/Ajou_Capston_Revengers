<template>
  <v-dialog v-model="dialog" max-width="650px">
    <!-- <v-btn @click="viewClicked()" flat slot="activator" class="success">view</v-btn> -->
    <v-btn flat slot="activator" class="info">회원 정보 </v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap class="cont">
            <v-flex sm5>
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
            <v-flex>
                <v-layout column wrap>
                <v-flex xs12 sm11>
                  <v-layout row wrap align-top class="info1">
                    <v-flex sm4 sm6>
                    <div class="grey--text font-weight-bold">아이디</div>
                    <div class="grey--text font-weight-bold">이름</div>
                    <div class="grey--text font-weight-bold">성별</div>
                    <div class="grey--text font-weight-bold">나이</div>
                    <div class="grey--text font-weight-bold">전화번호</div>
                    <div class="grey--text font-weight-bold">이메일</div>
                    <div v-if="role === 'host'" class="grey--text font-weight-bold">위치</div>
                    <div v-if="role === 'host'" class="grey--text font-weight-bold">직업</div>
                    <div v-if="role === 'guest'" class="grey--text font-weight-bold">능력</div>
                    </v-flex>
                    <v-flex sm3>
                    <div>{{candidateData.userName}}</div>
                    <div>{{candidateData.name}}</div>
                    <div>{{candidateData.gender}}</div>
                    <div>{{candidateData.age}}</div>
                    <div >{{candidateData.phone}}</div>
                    <div>{{candidateData.email}}</div>
                    <div v-if="role === 'host'">{{candidateData.location}}</div>
                    <div v-if="role === 'host'">{{candidateData.work}}</div>
                    <div v-if="role === 'guest'">{{candidateData.ability}}</div>
                    <!-- <div>{{candidateData.reference}}</div> -->
                   </v-flex>
                 </v-layout>
               </v-flex>
               <v-flex sm3>
                <v-card-actions>
                <!-- <v-btn flat slot="activator" color="success" :disabled="nowApprove" @click="approveCandidate(candidateData.userName)">
                  <v-icon small left>favorite</v-icon>
                  <span>Approve</span>
                  </v-btn>
                <v-btn flat slot="activator" color="success" :disabled="nowRefuse" @click="refuseCandidate(candidateData.userName)">
                  <v-icon small left>clear</v-icon>
                  <span>Refuse</span>
                    </v-btn> -->
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
  props : ['userName', 'role'],
  created() {
    // console.log("view is created");
    console.log("props로 받은 값 : " + this.userName);
    console.log("props로 받은 값 : " + this.role);
    this.viewClicked();
    
  },
  mounted(){
    this.viewClicked();
    

  },

  methods: {
    viewClicked(){
      console.log("view is clicked!");
        let userId = this.userName;
        //내가 host일 경우 host의 정보를 가져옴 
        if(this.role === 'host'){
        this.axios
          .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/host/${userId}`)
          .then(response => {
            let userData = response.data[0];
            this.candidateData.userName = userData.userName;
            this.candidateData.name = userData.name;
            this.candidateData.profileImg = userData.profileImg;
            this.candidateData.age = userData.age;
            this.candidateData.gender = userData.gender;
            if(userData.work === 'agriculture'){
              console.log("1")
              this.work = "농업"
            }else if(userData.work === 'forestry'){
              this.work = "임업"
            }else if(userData.work === 'fishery'){
              this.work = "수산업"
            }else if(userData.work === 'livestock'){
              this.work = "목축업"
            }else if(userData.work === 'others'){
              this.work = "기타"
            }
            this.candidateData.address = userData.address;
            this.candidateData.location = userData.location;
            this.candidateData.phone = userData.phone;
            this.candidateData.email = userData.email;
            this.candidateData.reference = userData.reference;
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

            let abilityListKor = ["요리를 잘해요", "미용을 잘해요", "애를 잘돌봐요", "청소를 잘해요", "운전을 잘해요", "도배를 잘해요", "짐나르는거 잘해요", "노래를 잘해요", "말동무를 잘해요", "컴퓨터를 잘다뤄요", "농기계를 잘다뤄요", "농사경험이 있어요"];
            let abilityListEng = ["cook", "beauty", "baby", "clean", "drive", "paper", "carry", "sing", "talk", "comp", "machine", "farm"];
            let userAbility = new Array();
            let receiveAbility = userData.ability;
            for(let i = 0; i<receiveAbility.length; i++){
              for(let z = 0; z <abilityListEng.length;z++){
                if(receiveAbility[i] === abilityListEng[z]){
                  userAbility.push(abilityListKor[z]);
                }
              }
            }
            let tempStr = "";
            for(let j = 0; j<userAbility.length; j++){
              tempStr = tempStr +" , " + userAbility[j];
            }
            tempStr = tempStr.substring(2, tempStr.length);
            this.candidateData.gender = userData.gender;
            this.candidateData.ability = tempStr;
            this.candidateData.phone = userData.phone;
            this.candidateData.email = userData.email;
            this.candidateData.reference = userData.reference;
          });
      };
    },
    approveCandidate(name){
      console.log("notify state ");
        console.log(name);
        //guest일때 host 승인
         if(localStorage.role === '0'){
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/guestApprove",
            {
            userName : name,
            notificationId : this.notificationId
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
            notificationId : this.notificationId
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
        console.log(name);
        // console.log(boardId);
        if(localStorage.role === '0'){
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/guestRefuse",
          {
            userName : name,
            notificationId : this.notificationId
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
            notificationId : this.notificationId
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
