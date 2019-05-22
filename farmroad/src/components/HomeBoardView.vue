<template>
  <v-dialog v-model="dialog" max-width="600px">
    <!-- <v-btn @click="viewClicked()" flat slot="activator" class="success">view</v-btn> -->
    <v-btn flat slot="activator" class="success">view</v-btn>
      <v-card>
        <v-img class="white--text" height="200px" >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <!-- <span class="headline">{{board.title}}</span> -->
                <!-- <span class="headline">{{candidateData.userName}}</span> -->
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <!-- <h2 class="center teal-text">{{board.title}}</h2> -->
          <h2 class="center teal-text">{{candidateData.userName}}</h2>
        </v-card-title>
        <v-card-text>
          <div>
            <span class="grey--text">유저 이름 : {{candidateData.name}}</span>
            <br>
            <!-- <span>{{board.content}}</span> -->
            <span>{{candidateData.userName}}</span>
          </div>
          <div class="text-xs">
            <!-- <v-rating :value="board.difficulty" readonly></v-rating> -->
            <v-rating :value="10" readonly></v-rating>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            flat
            slot="activator"
            color="success"
            @click="approve()"
          >
            <v-icon small left>favorite</v-icon>
            <span>Approve</span>
          </v-btn>
          <v-btn flat slot="activator" color="success" @click="refuse()">
            <v-icon small left>clear</v-icon>
            <span>Refuse</span>
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      // candidateInfo : ""
      dialog : false,
      candidateData : {

      }
    };
  },
  props : ['candidateInfo'],
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  created() {
    // console.log("view is created");
    console.log("props로 받은 값 : " + this.candidateInfo);
    this.viewClicked();
  },
  mounted(){

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