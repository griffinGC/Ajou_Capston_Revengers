<template>
  <div class="about">
    <!--search from-->
    <v-form v-if="role">
        <div class="grey--text text--darken-1"></div>
        <v-layout row wrap>
          <v-item-group>
            <v-checkbox v-model="location" label="경기도" value="경기도"></v-checkbox>
            <v-checkbox v-model="location" label="인천" value="인천"></v-checkbox>
          </v-item-group>
           <v-item-group>
            <v-checkbox v-model="location" label="충청북도" value="충청북도"></v-checkbox>
            <v-checkbox v-model="location" label="충청남도" value="충청남도"></v-checkbox>
          </v-item-group>
            <v-item-group>
            <v-checkbox v-model="location" label="경상북도" value="경상북도"></v-checkbox>
            <v-checkbox v-model="location" label="경상남도" value="경상남도"></v-checkbox>
          </v-item-group>
            <v-item-group>
            <v-checkbox v-model="location" label="전라북도" value="전라북도"></v-checkbox>
            <v-checkbox v-model="location" label="전라남도" value="전라남도"></v-checkbox>
          </v-item-group>
          <v-item-group>
            <v-checkbox v-model="location" label="강원도" value="강원도"></v-checkbox>
            <v-checkbox v-model="location" label="제주도" value="제주도"></v-checkbox>
          </v-item-group>
          {{ this.location}}
          <v-btn flat class="success" @click="sortLocation(boards)">지역 검색</v-btn>
        </v-layout>
    </v-form>
    <v-form v-else>

        <div class="grey--text text--darken-1"></div>
        <v-layout row wrap>
          <v-item-group>
            <v-checkbox v-model="selected" label="요리를 잘해요" value="cook"></v-checkbox>
            <v-checkbox v-model="selected" label="미용 잘해요" value="beauty"></v-checkbox>
          </v-item-group>
           <v-item-group>
            <v-checkbox v-model="selected" label="애를 잘돌봐요" value="baby"></v-checkbox>
            <v-checkbox v-model="selected" label="청소를 잘해요" value="clean"></v-checkbox>
          </v-item-group>
            <v-item-group>
            <v-checkbox v-model="selected" label="운전을 잘해요" value="drive"></v-checkbox>
            <v-checkbox v-model="selected" label="도배를 잘해요" value="paper"></v-checkbox>
          </v-item-group>
            <v-item-group>
            <v-checkbox v-model="selected" label="짐나르는거 잘해요" value="carry"></v-checkbox>
            <v-checkbox v-model="selected" label="노래를 잘해요" value="sing"></v-checkbox>
          </v-item-group>
          <v-item-group>
            <v-checkbox v-model="selected" label="말동부를 잘해요" value="talk"></v-checkbox>
            <v-checkbox v-model="selected" label="컴퓨터를 잘다뤄요" value="comp"></v-checkbox>
          </v-item-group>
          <v-item-group>
            <v-checkbox v-model="selected" label="농기계를 잘다뤄요" value="machine"></v-checkbox>
            <v-checkbox v-model="selected" label="농사경험이 있어요" value="farm"></v-checkbox>
          </v-item-group>
          <!-- {{ this.selected}} -->
          <v-btn flat class="success" @click="sortBoard(boards)">선택사항 검색</v-btn>
        </v-layout>
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
              <div class="grey--text">{{board.content}}</div>
            </v-card-text>

            <v-card-actions>
              <!------------------------------view dialog start--------------------------------->
              <v-dialog max-width="600px">
                <v-btn flat slot="activator" color="grey" @click="viewAction(board.candidate)">
                  <v-icon small left>streetview</v-icon>
                  <span>view</span>
                </v-btn>
                <v-card>
                  <v-img class="black--text" height="200px" :src="board.boardImg">
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline">{{board.title}}</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>

                  <v-card-title>
                    <!-- <h2 class="center teal-text">{{board.boardId + "ddddddd"}}</h2> -->
                    <h2 class="center teal-text">{{board.Info.name}}</h2>
                  </v-card-title>

                  <v-card-text>
                    <!--map-->
                    <v-flex d-flex xs12 sm6 md4>
                      <v-layout row wrap></v-layout>
                    </v-flex>

                    <!--show date-->
                    <div>
                      <v-date-picker
                        width="560px"
                        v-model="showDate"
                        :allowed-dates="allowedDates"
                        class="mt-3"
                        min="2016-06-15"
                        max="2018-03-20"
                      ></v-date-picker>
                    </div>
                    <!---date and content--->
                    <div>
                      <span class="grey--text">{{board.startDate}}</span>
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
                      <span>신청하기</span>
                    </v-btn>

                    <!--messager button-->
                    <v-btn flat slot="activator" color="success" @click="messager(board.Info)">
                      <v-icon small left>message</v-icon>
                      <span>메신저</span>
                    </v-btn>
                    <!-- <router-link to="/MyMap"> -->
                    <!-- <v-btn to="/mymap" flat slot="activator" color="info">
                      <v-icon small left>expand_more</v-icon>
                      <span>상세보기</span>
                    </v-btn> -->
                    <!-- </router-link> -->
                    <v-btn flat slot="activator" color="error">
                      <v-icon small left>report</v-icon>
                      <span>신고하기</span>
                    </v-btn>
                   
                  </v-card-actions>
                </v-card>
                <Chat v-bind:comments="'host'+board.boardId"/>
              </v-dialog>

              <!------------------------------view dialog end--------------------------------->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import ChatRoom from "../components/ChatRoom";
import Chat from "../views/Chat";
import UserInfoVue from "./UserInfo.vue";
export default {
//   const: routes = [
//   { path: '/mymap', component: MyMap }
// ],
  components: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },

    ChatRoom,
    Chat
  },
  data() {
    return {
      boards: [],
      newBoards: [],
      rating: 3,
      items: [1, 2, 3, 4, 5],
      workDays: "",
      chatId: "",
      loading: "",
      showDate: "2018-03-02",


      selected: [],
      location: [],

      menu1: false,

      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      showCard: false,
      diff: "",
      chatRoute: "/chat",
      role: null,
      chatRoomId: ""
    };
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
          //check if the board is baned
          var tmp = new Array();
          this.boards.forEach(item => {
            if (!item.report) {
              tmp.push(item);
            }
          });
          this.newBoards = tmp;
        });
    } else if (localStorage.role == 1) {
      this.axios
        .get(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/guestBoard/getList"
        )
        .then(response => {
          console.log(response.data);
          this.boards = response.data;
          var tmp = new Array();
          this.boards.forEach(item => {
            if (!item.report) {
              tmp.push(item);
            }
          });
          this.newBoards = tmp;
        });
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

    //allowedDate for date
    allowedDates: val => parseInt(val.split("-")[2], 10) % 2 === 0,

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
    sortLocation(boards) {
      var tempBoards = new Array();
      boards.forEach(index => {
         index.count = 0;
         for(let i = 0; i<this.location.length; i++){
              if(index.location === this.location[i])
              {
                ++index.count;
              }
         }
         if(index.count !== 0)
         {
           tempBoards.push(index);
         }
      });
      this.newBoards = tempBoards;
      if(this.selected.length === 0){
           this.newBoards = boards;
      }
    },
    messager(info) {
      this.chatRoomId = localStorage.username + info.id;
      if (localStorage.role == 0) {
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/chatRoom/createChatRoom",
            {
              chatRoomId: this.chatRoomId,
              hostUserName: info.userName,
              guestUserName: localStorage.username
            }
          )
          .then(response => {
            if (response.data.state == -1) {
              alert(response.data.msg);
            } else {
              console.log(response.data.msg);
              this.$router.push({
                name: "chatroom",
                params: { chatRoomId: this.chatRoomId }
              });
            }
          });
      } else {
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/chatRoom/createChatRoom",
            {
              chatRoomId: this.chatRoomId,
              hostUserName: localStorage.username,
              guestUserName: info.id
            }
          )
          .then(response => {
            if (response.data.state == -1) {
              alert(response.data.msg);
            } else {
              console.log(response.data.msg);
              this.$router.push({
                name: "chatroom",
                params: { chatRoomId: this.chatRoomId }
              });
            }
          });
      }
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
  }
};
</script>
