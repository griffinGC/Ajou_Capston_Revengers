<template>
  <div class="home">
    <h1 class="subheading grey--text">Message</h1>
    <v-container row class="mb-3">
      <!--card container-->
      <!-- <v-card class="pa-3" v-for="project in projects" :key="project.id"> -->
      <v-card class="pa-3" v-for="notification in notificationList" :key="notification.id">
        <v-layout row wrap :class="`pa-3 project.${notification.boardInfo.title}`">

          <v-flex xs12 md6>
            <div class="caption grey--text">title</div>
            <!-- <div>{{project.title}}</div> -->
            <div>{{notification.boardInfo.title}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">preson</div>
            <!-- <div>{{project.guestInfo}}</div> -->
            <div>{{notification.userName}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due</div>
            <!-- <div>{{project.due}}</div> -->
            <div></div>
          </v-flex>

          <v-flex xs6 sm4 md2>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "home",
  components: {
    // HomeBoardView
  },
  data() {
    return {
      notificationList : ""
    };
  },
  created(){
    console.log("home is created!");
    this.role = localStorage.role;
    this.getNotification();
  },
  methods:{
    getNotification(){
      let userId = localStorage.username;
      // localStorage.role == 0 이면 guest && 1이면 host
      // console.log("로컬 스토리지 역할 정보 : "+localStorage.role);
        if(localStorage.role === '0'){
        this.axios
          .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/main/guest/getNotification/${userId}`)
          .then(response => {
            // console.log("응답 값 : " + JSON.stringify(response));
            // console.log(response.data[0]);
            this.notificationList = response.data;
            // console.log(this.notificationList);
            // console.log("notification list 값 : " + this.notificationList);
            // console.log(response.data[0].boardInfo.title);
            // console.log(response.data[0].boardInfo.content);
            // console.log(response.data[0].userName);
          });
      }else{
        this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/main/host/getNotification/${userId}`)
        .then(response =>{
          console.log(response);
            // console.log("응답 값 : " + JSON.stringify(response));
            // console.log(response.data[0]);
            this.notificationList = response.data;

        });
      };
    },
  },

};
</script>
