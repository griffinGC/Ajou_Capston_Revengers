<template>
  <div class="about">
    <!--search from-->
    <v-form v-if="role">
      <v-flex xs6>
        <!--difficulty select-->
        <v-select v-if="role" :items="items" v-model="diff" label="difficulty" return-object></v-select>
        <v-btn flat class="success" @click="findByDifficulty(boards)">Search</v-btn>
      </v-flex>
    </v-form>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="board in newBoards" :key="board._id">
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
                <v-btn flat slot="activator" color="grey" @click="viewAction(board.candidate)">
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
                    <!--Notification button-->
                    <v-btn
                      :disabled="loading"
                      @click="saveNotification(board.boardId)"
                      slot="activator"
                      color="success"
                    >
                      <v-icon small left>add</v-icon>
                      <span>register</span>
                    </v-btn>

                    <!--messager button-->
                    <v-btn flat slot="activator" color="success" @click="messager(board.boardId)">
                      <v-icon small left>message</v-icon>
                      <span>comment</span>
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
      newBoards: [],
      rating: 3,
      items: [1, 2, 3, 4, 5],
      workDays: "",
      chatId: "",
      loading: "",

      menu1: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      showCard: false,
      diff: "",
      chatRoute: "/chat",
      role: null
    };
  },
  mounted: function() {
    if (localStorage.role == 0) {
      this.axios
        .get(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/hostBoard/getList"
        )
        .then(response => {
          console.log(response.data);
          this.boards = response.data;
          this.newBoards = response.data;
        });
    } else if (localStorage.role == 1) {
      this.axios
        .get(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/guestBoard/getList"
        )
        .then(response => {
          console.log(response.data);
          this.boards = response.data;
          this.newBoards = response.data;
        });
    }
  },
  components: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    findByDifficulty(boards) {
      var temBoards = new Array();
      boards.forEach(item => {
        if (item.difficulty == this.diff) {
          temBoards.push(item);
        }
      });
      this.newBoards = temBoards;
      console.log(this.newBoards);
    },
    findBoards(boards) {
      var tempBoards = new Array();
      boards.forEach(item => {
        if (item.workDay == this.workDay && item.difficulty == this.diff) {
          tempBoards.push(item);
        }
      });
      this.newBoards = tempBoards;
      console.log(this.newBoards);
    },
    messager(id) {
      if ((localStorage.role == 1)) {
        this.chatId = id + "hostboardsmessager";
      } else {
        this.chatId = id + "guestboardsmessager";
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
    saveNotification(id) {
      console.log(id);
      if (localStorage.role == 0) {
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyRegister/host/registerNotification",
            {
              userName: localStorage.username,
              boardId: id
            }
          )
          .then(response => {
            console.log(response.data);
            if (response.data.state == 0) {
              alert(response.data.msg);
              this.$router.go();
            } else {
              alert(response.data.msg);
            }
          });
      } else if (localStorage.role == 1) {
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/notifyRegister/guest/registerNotification",
            {
              userName: localStorage.username,
              boardId: id
            }
          )
          .then(response => {
            console.log(response.data);
            if (response.data.state == 0) {
              alert(response.data.msg);
              this.$router.go();
            } else {
              alert(response.data.msg);
            }
          });
      }
    },
    viewAction(candidate) {
      console.log(candidate);
      this.loading = false;
      for (let index = 0; index < candidate.length; index++) {
        console.log(candidate[index]);
        if (candidate[index] === localStorage.username) {
          console.log(candidate[index]);
          this.loading = true;
          break;
        }
      }
    }
  },
  created() {
    if (localStorage.username) {
      this.user = localStorage.username;
      if (localStorage.role == 1) {
        this.role = false;
      } else {
        this.role = true;
      }
    } else {
      this.user = false;
    }
  }
};
</script>