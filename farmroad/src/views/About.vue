<template>
  <div class="about">
    <v-btn flat class="success" v-if="role === '1'"   @click="showHostBoards">show host boards</v-btn>
    <v-btn flat class="success" v-if="role === '0'"  @click="showGuestBoards">show guest boards</v-btn>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="board in boards" :key=" board._id">
          <v-card flex class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <img height="300px" :src="board.boardImg">
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{board.title}}</div>
              <div class="grey--rext">{{board.content}}</div>
            </v-card-text>

            <v-card-actions>
              <v-dialog max-width="600px">
                <v-btn flat slot="activator" color="grey">
                  <v-icon small left>streetview</v-icon>
                  <span>view</span>
                </v-btn>
                <v-card>
                  <v-img class="white--text" height="200px" :src="board.boardImg">
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline">{{board.title}}</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                  <v-card-title>
                    <h2 class="center teal-text">{{board.title}}</h2>
                  </v-card-title>
                  <v-card-text>
                    <div>
                      <span class="grey--text">Number 10</span>
                      <br>
                      <span>{{board.content}}</span>
                    </div>
                    <div class="text-xs">
                      <v-rating v-model="rating"></v-rating>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn slot="activator" v-on:click.native="saveNotification(board._id, board.guestInfo)" color="success">
                      <v-icon small left>add</v-icon>
                      <span>register</span>
                    </v-btn>
                    <v-btn flat slot="activator" color="success">
                      <v-icon small left>message</v-icon>
                      <span>message</span>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boards: [],
      rating: 3,
      role : "",
      order : ""
    };
  },

  created: function() {
    this.role = localStorage.role;

    if(this.role === '0'){
      this.$store.dispatch("fetchGuestBoards"); 
      this.boards = this.$store.getters.doneGuestBoards;
    }else{
        this.$store.dispatch("fetchHostBoards");
        this.boards = this.$store.getters.doneHostBoards;
    }


  },
  components: {},
  methods: {
    showHostBoards() {
      this.boards = "";
      this.boards = this.$store.getters.doneHostBoards;
    },
    showGuestBoards() {
      this.boards = "";
      this.boards = this.$store.getters.doneGuestBoards;
    },
    saveNotification(id, writerInfo){
      // console.log("글 작성자 정보 : " + JSON.stringify(this.boards));
      console.log("boardId 출력 : " +id);
      console.log("작성자 정보 : " + JSON.stringify(writerInfo[0]));
      // let userData = JSON.stringify(writerInfo);
      // let boardId = id;
      //guest보드
      this.axios()
      if(this.role === '0'){
        //user의 Id와, boardId 전송함 if(localStorage.role === '0'){
        // this.axios
        // .post("http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyRegister/guest/registerNotification",{
        //   userName : localStorage.username,
        //   boardId : boardId,
        //   state : "ongoing"
        //   })
      // host보드
      }else{
        // this.axios
        // .post("http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyRegister/host/registerNotification",{
        //   userName : localStorage.username,
        //   boardId : boardId,
        //   state : "ongoing"
        // })
        // .then(console.log("notification save is success"));
      };
      this.$router.push('/')
      alert("요청메시지가 전송되었습니다.")
    }
  }
};
</script>