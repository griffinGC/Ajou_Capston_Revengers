<template>
  <v-dialog v-model="dialog" max-width="650px">
    <!-- <v-btn @click="viewClicked()" flat slot="activator" class="success">view</v-btn> -->
    <v-btn flat slot="activator" class="success">view</v-btn>
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
              <v-card-text>
                <div class="rating">
                <!-- <v-rating :value="board.difficulty" readonly></v-rating> -->
                <v-rating :value="10" readonly></v-rating>
                </div>
              </v-card-text>
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
                    <div v-if="role === '0'" class="grey--text font-weight-bold">위치</div>
                    <div v-if="role === '1'" class="grey--text font-weight-bold">능력</div>
                    </v-flex>
                    <v-flex sm3>
                    <div>{{candidateData.userName}}</div>
                    <div>{{candidateData.name}}</div>
                    <div>{{candidateData.gender}}</div>
                    <div>{{candidateData.age}}</div>
                    <div>{{candidateData.phone}}</div>
                    <div>{{candidateData.email}}</div>
                    <div v-if="role === '0'">{{candidateData.location}}</div>
                    <div v-if="role === '0'">{{candidateData.work}}</div>
                    <div v-if="role === '1'">{{candidateData.ability}}</div>
                    <!-- <div>{{candidateData.reference}}</div> -->
                   </v-flex>
                 </v-layout>
               </v-flex>
               <v-flex sm3>
                <v-card-actions>
                <v-btn flat slot="activator" color="success" @click="approveCandidate()">
                  <v-icon small left>favorite</v-icon>
                  <span>Approve</span>
                  </v-btn>
                  <v-btn flat slot="activator" color="success" @click="refuseCandidate()">
                  <v-icon small left>clear</v-icon>
                  <span>Refuse</span>
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
    };
  },
  props : ['candidateInfo'],
  created() {
    // console.log("view is created");
    console.log("props로 받은 값 : " + this.candidateInfo);
    this.viewClicked();
    this.role=localStorage.role;
  },
  mounted(){
    this.viewClicked();
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
        });
      };
    },
    approveCandidate(){

    },
    refuseCandidate(){

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
