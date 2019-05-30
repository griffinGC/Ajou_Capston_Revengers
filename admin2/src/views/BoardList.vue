<template>
  <v-layout column>
    <v-flex sm12>
      <div>
      <v-btn color="success" @click="clickTrue()">Guest 글 정보</v-btn>
      <v-btn color="info" @click="clickFalse()">Host 글 정보</v-btn>
      </div>
    </v-flex>
    <v-flex xs12 sm6>
      <v-card v-if="guestShow">
        <v-toolbar color="indigo" dark>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
          <v-toolbar-title>게스트 글 정보 </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-tile
            v-for="board in guestBoardList"
            :key="board.id"
            avatar  
          >
            <v-list-tile-action>
              <v-icon v-if="board.icon" color="pink">done</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="board.userName"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-content>
              <v-list-tile-title v-text="board.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar v-if="board.profileImg">
              <img  :src="board.profileImg">
            </v-list-tile-avatar>
            <v-icon v-else size="40px">person</v-icon>

            <v-btn v-if="board.report === false" color="error" @click="updateToError(board)">계정 정지 </v-btn>
            <v-btn v-else color="success" @click="updateToAble(board)">계정 해제 </v-btn>

          </v-list-tile>
        </v-list>
      </v-card>

      <v-card v-else>
        <v-toolbar color="indigo" dark>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
          <v-toolbar-title>호스트 유저 정보 </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-tile
            v-for="board in hostBoardList"
            :key="board._id"
            avatar  
          >
            <v-list-tile-action >
              <v-icon v-if="board.icon" color="pink">done</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="board.userName"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-content>
              <v-list-tile-title v-text="board.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar v-if="board.profileImg">
              <img  :src="board.profileImg">
            </v-list-tile-avatar>
            <v-icon v-else size="40px">person</v-icon>

            <v-btn v-if="user.report === false" color="error" @click="updateToError(user)">계정 정지 </v-btn>
            <v-btn color="success" @click="updateToAble(user)">계정 해제 </v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>

</template>


<script>

export default {
  name: "reportUser",
  components: {
    // HomeBoardView
  },
  data () {
      return {
        guestBoardList: [],
        hostBoardList: [],
        reportId : "",
        guestShow : true
      }
    },
  created(){
    console.log("userList is created!");
    this.getGuestList();
    this.getHostList();
  },
  mounted(){
    console.log("userList is mounted!");
    this.getGuestList();
    this.getHostList();
  },
  methods:{
    clickTrue(){
      if(this.guestShow === false){
        this.guestShow = true;
      }
    },
    clickFalse(){
      if(this.guestShow === true){
        this.guestShow = false;
      }
    },
    getGuestList(){
      this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/guestBoard/getList`)
        .then(response => {
          this.guestBoardList = response.data;
          console.log(this.guestBoardList);
        });
    },
    getHostList(){
      this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/hostBoard/getList`)
        .then(response => {
          this.hostBoardList = response.data;
          console.log(this.hostBoardList);
        });
    },
    updateToError(t){
      let update = t.userName;
      let role = t.role;
      if(role === 'guest'){
        console.log("role is guest");
        this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/updateGuest/ban/${update}`)
        .then(response =>{
          console.log(response);
        })
      }else{
        console.log("role is host");
      this.axios
      .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/updateHost/ban/${update}`)
      .then(response =>{
        console.log(response);
      })
      }
    },
    updateToAble(t){
      let update = t.userName;
      let role = t.role;
      if(role === 'guest'){
        console.log("role is guest");
        this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/updateGuest/able/${update}`)
        .then(response =>{
          console.log(response);
        })
      }else{
        console.log("role is host");
      this.axios
      .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/updateHost/able/${update}`)
      .then(response =>{
        console.log(response);
      })
      }
    }
  },

};
</script>
