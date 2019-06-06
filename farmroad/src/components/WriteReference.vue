<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-btn flat slot="activator" class="success">후기 남기기</v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap class="cont">
            <v-flex sm11>
            <v-form class="px-3">
              <v-text-field label="Title" v-model="title" prepend-icon="folder" required></v-text-field>
              <!--img upload-->
              <!--start date select-->
              <v-textarea label="Content" v-model="content" prepend-icon="edit" required></v-textarea>
            </v-form>
              <v-card-text>
                <div class="rating">
                <!-- <v-rating :value="board.difficulty" readonly></v-rating> -->
                <v-rating :value="3" readonly></v-rating>
                </div>
              </v-card-text>
                <v-card-actions>
                <v-btn flat slot="activator" color="success" @click="approveCandidate()">
                  <v-icon small left>favorite</v-icon>
                  <span>후기 작성</span>
                  </v-btn>
                  <v-btn flat slot="activator" color="success" @click="refuseCandidate()">
                  <v-icon small left>clear</v-icon>
                  <span>작성 취소</span>
                  </v-btn>
                  </v-card-actions>
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
  props : ['notificationInfo'],
  created() {
    // console.log("view is created");
    console.log("props로 받은 값 : " + this.notificationInfo);
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
      console.log("notify state ");
      let userState = localStorage.state; 
      this.axios
      .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState/${state}`)
      .then(response =>{
          console.log(response.data[0]);
            let userData = response.data[0];
            this.userState.state = userData.userName;
                        
        });
      
      
      if (localStorage.state === "approve") {
        console.log(this.state);
        
       
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState",
            userState
          )
          .then(console.log("sneding a candidate to state"));
      }

    },
    refuseCandidate(){
      console.log("notify state "); 
      let userState = localStorage.state;
      
      if (localStorage.state === "refuse") {
        console.log(this.state);
        
       
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyState",
            userState
          )
          .then(console.log("sneding a candidate to state"));
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
