<template>
  <div>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="board in boards" :key="board._id">
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
                      <v-rating :value="board.difficulty" readonly></v-rating>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn flat slot="activator" color="success" @click="messager(board.boardId)">
                      <v-icon small left>message</v-icon>
                      <span>Comment</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat slot="activator" color="red" @click="delBoard(board.boardId)">
                      <v-icon small left>delete</v-icon>
                      <span>Delete</span>
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
      boards: []
    };
  },
  mounted: function() {
    if (localStorage.role == 1) {
      this.axios
        .get(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/searchBoard/getUhostBoard/" +
            localStorage.username
        )
        .then(response => {
          console.log(response.data);
          this.boards = response.data;
        });
    } else if (localStorage.role == 0) {
      this.axios
        .get(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/searchBoard/getUguestBoard/" +
            localStorage.username
        )
        .then(response => {
          console.log(response.data);
          this.boards = response.data;
        });
    }
  },
  methods: {
    messager(id) {
      if(localStorage.role ==1){
        this.chatId = id + "guestboardsmessager";
      }else{
        this.chatId = id+ "hostboardsmessager"
      }
      
      this.axios
        .post(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/chat",
          {
            userName: localStorage.username,
            boardId: id,
            chatId: this.chatId
          }
        )
        .then(response => {
          console.log(response.data);

          console.log(this.chatId);
          this.$router.push({ name: "chat", params: { name: this.chatId } });
        });
    },
    delBoard(id) {
      console.log(id);
      if (localStorage.role == 1) {
        this.axios
          .get(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/deletePost/deleteHostList/" +
              localStorage.username +
              "/" +
              id
          )
          .then(response => {
            console.log(response.data);
            if (response.data.state == 0) {
              alert(response.data.msg);
              this.$router.go(0);
            } else {
              alert(response.data.msg);
            }
          });
      } else if (localStorage.role == 0) {
        this.axios
          .get(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/deletePost/deleteGuestList/" +
              localStorage.username +
              "/" +
              id
          )
          .then(response => {
            console.log(response.data);
            if (response.data.state == 0) {
              alert(response.data.msg);
              this.$router.go(0);
            } else {
              alert(response.data.msg);
            }
          });
      }
    }
  }
};
</script>

