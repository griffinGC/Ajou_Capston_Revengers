<template>
<v-container fluid grid-list-lg>
  <v-flex xs12>
    <v-flex xl12>
      <div class="grey--text text--darken-1">Notification</div>
        <v-card color="lime lighten-5" height="450" v-chat-scroll>
          <v-card class="pa-1" v-for="notification in notificationList" :key="notification.id">
          <v-layout row wrap :class="`pa-1 project.${notification.boardInfo.title}`">

            <v-flex xs12 md6>
              <div class="caption grey--text">Title</div>
              <!-- <div>{{project.title}}</div> -->
              <div>{{notification.boardInfo.title}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Person</div>
              <!-- <div>{{project.guestInfo}}</div> -->
              <div>{{notification.userName}}</div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">Due</div>
              <!-- <div>{{project.due}}</div> -->
              <div></div>
            </v-flex>

            <v-flex xs6 sm4 md2>
              <div>
                <HomeBoardView 
                :candidateInfo="`${notification.userName}`" 
                :notificationId="`${notification.notificationId}`"
                :state="`${notification.state}`"/>
                <!-- {{notification.boardInfo.boardId}} -->
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-card>
    </v-flex>
  </v-flex>
  <v-flex>
    <v-flex xs12>
      <div class="grey--text text--darken-1">Recommended Boards</div>
        <v-card color="blue lighten-5" height="450" class="scroll">
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 sm6 md4 lg3 v-for="board in newBoards" :key="board._id">
                <v-card flex class="text-xs-center ma-3">
                  <v-responsive class="pt-4">
                    <img height="175px" :src="board.boardImg">
                  </v-responsive>
                  <v-card-text>
                    <div class="subheading">{{board.title}}</div>
                    <div class="grey--text">{{board.content}}</div>
                  </v-card-text>
                  <v-card-actions>
                   <!--Board View-->
                   <HostBoardView v-bind:hostBoard="board"/>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-flex>
  <v-flex>
    <v-flex xs12>
      <div class="grey--text text--darken-1">Message list</div>
        <v-card color="green lighten-5" height="450" class="scroll">
            <v-card>
              <v-flex>
              <ChatRoomList></ChatRoomList>
             </v-flex>
            </v-card>
        </v-card>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
import HomeBoardView from '../components/HomeBoardView'
import firebase from "firebase";
import ChatRoomList from '../components/ChatRoomList'
import HostBoardView from '../components/HostBoardView'
export default {
  name: "home",
  components: {
    HomeBoardView,
    ChatRoomList,
    HostBoardView,
  },
  data() {
    return {
      notificationList : "",
      boards: [],
      newBoards: [],
      rating: 3,
      items: [1, 2, 3, 4, 5],
      workDays: "",
      chatId: "",
      loading: "",
      showDate: "2018-03-02",

      menu1: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      showCard: false,
      diff: "",
      chatRoute: "/chat",
      role: null,

      lat: 53,
      lng: -2
    };
  },
  created(){
    console.log("home is created!");
    this.role = localStorage.role;
    this.getNotification();
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
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
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
            this.notificationList = response.data;
          });
      }else{
        this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/main/host/getNotification/${userId}`)
        .then(response =>{
          console.log(response);
            this.notificationList = response.data;

        });
      };
    },
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

    //可以选用的时间
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
      if (localStorage.role == 1) {
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
  
  computedDateFormatted() {
      return this.formatDate(this.date);
    },
  }
</script>
<style>
.google-map {
  width: 300px;
  height: 300px;
  margin: 0;
  background-attachment: #fff;
  top: 0;
  left: 0;
  z-index: -1;
}
.scroll{
  overflow-y:auto;
}
.notificationlist{
  max-height: 500px;
  overflow: auto; 
}
.notificationlist::-webkit-scrollbar{
  widows:3px;
}
.notificationlist::-webkit-scrollbar-track{
  background: #ddd;
}
.notificationlist::-webkit-scrollbar-thumb{
  background: #aaa;
}
</style>
