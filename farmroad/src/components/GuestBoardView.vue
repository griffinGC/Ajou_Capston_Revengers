<template>
  <v-dialog v-model="dialog" max-width="650px">
    <v-btn flat slot="activator" color="grey" @click="viewAction(board)">
      <v-icon small left>streetview</v-icon>
      <span>view</span>
    </v-btn>
    <v-card>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex md6>
            <!-- <v-avatar> 
      <img class="black--text" height="275px" :src="board.boardImg">
            </v-avatar>-->
            <v-avatar size="230px">
              <img :src="board.Info.profileImg">
              <!-- <v-icon >person</v-icon> -->
            </v-avatar>
          </v-flex>
          <!-- guest info -->
          <v-flex md6>
            <v-layout row wrap>
              <v-flex md5 ml-3>유저아이디</v-flex>
              <v-flex md6>{{board.Info.userName}}</v-flex>
              <v-flex md5 ml-3>이름</v-flex>
              <v-flex md6>{{board.Info.name}}</v-flex>
              <v-flex md5 ml-3>성별</v-flex>
              <v-flex md6>{{board.Info.gender}}</v-flex>
              <v-flex md5 ml-3>나이</v-flex>
              <v-flex md6>{{board.Info.age}}</v-flex>
              <v-flex md5 ml-3>전화번호</v-flex>
              <v-flex md6>{{board.Info.phone}}</v-flex>
              <v-flex md5 ml-3>이메일</v-flex>
              <v-flex md6>{{board.Info.email}}</v-flex>
              <v-flex md5 ml-3>평점</v-flex>
              <v-flex md6>{{board.Info.reference}}</v-flex>
            </v-layout>
          </v-flex>
          <!-- board title & content -->
          <v-flex md12 mt-3 font-weight-bold subheading>글 제목: {{board.title}}</v-flex>
          <v-flex md5>
            <v-img class="black--text" height="200px" :src="board.boardImg"></v-img>
          </v-flex>
          <v-flex md6 offset-md1>내용 : {{board.content}}</v-flex>
          <!-- <v-card-title>
      </v-card-title>
      <v-card-text>
          </v-card-text>-->
          <v-flex md12 mt-5 subheading font-weight-bold>원하는 지역</v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('경기도')">
            <v-checkbox input-value="true" value disabled hide-details label="경기도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="경기도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('인천')">
            <v-checkbox input-value="true" value disabled hide-details label="인천"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="인천"></v-checkbox>
          </v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('충청북도')">
            <v-checkbox input-value="true" value disabled hide-details label="충청북도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="충청북도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('충청남도')">
            <v-checkbox input-value="true" value disabled hide-details label="충청남도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="충청남도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('경상북도')">
            <v-checkbox input-value="true" value disabled hide-details label="경상북도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="경상북도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('경상남도')">
            <v-checkbox input-value="true" value disabled hide-details label="경상남도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="경상남도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('전라북도')">
            <v-checkbox input-value="true" value disabled hide-details label="전라북도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="전라북도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('전라남도')">
            <v-checkbox input-value="true" value disabled hide-details label="전라남도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="전라남도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('강원도')">
            <v-checkbox input-value="true" value disabled hide-details label="강원도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="강원도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-if="board.preferLocation.includes('제주도')">
            <v-checkbox input-value="true" value disabled hide-details label="제주도"></v-checkbox>
          </v-flex>
          <v-flex md3 v-else>
            <v-checkbox value disabled hide-details label="제주도"></v-checkbox>
          </v-flex>

          <!-- <v-flex md3><v-checkbox v-model="workLocation" hide-details label="인천" value="인천"></v-checkbox></v-flex>
      <v-flex md3><v-checkbox v-model="workLocation" hide-details label="충청북도" value="충청북도"></v-checkbox></v-flex>
      <v-flex md3><v-checkbox v-model="workLocation" hide-details label="충청남도" value="충청남도"></v-checkbox></v-flex>
      <v-flex md3><v-checkbox v-model="workLocation" hide-details label="경상북도" value="경상북도"></v-checkbox></v-flex>
      <v-flex md3><v-checkbox v-model="workLocation" hide-details label="경상남도" value="경상남도"></v-checkbox></v-flex>
      <v-flex md3><v-checkbox v-model="workLocation" hide-details label="전라북도" value="전라북도"></v-checkbox></v-flex>
      <v-flex md3><v-checkbox v-model="workLocation" hide-details label="전라남도" value="전라남도"></v-checkbox></v-flex>
      <v-flex md3><v-checkbox v-model="workLocation" hide-details label="강원도" value="강원도"></v-checkbox></v-flex>
          <v-flex md3><v-checkbox v-model="workLocation" hide-details label="제주도" value="제주도"></v-checkbox></v-flex>-->
          <!-- <v-flex v-if="preferAbility.includes('노래를 잘해요')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="노래를 잘해요"></v-checkbox>
            </v-flex>
          <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="노래를 잘해요" xs6 sm3 md2></v-checkbox></v-flex>-->
        </v-layout>
      </v-container>

      <v-card-actions>
        <!--Notification button-->
        <v-btn :disabled="loading" slot="activator" color="success" @click="saveNotification(board.boardId)">
          <v-icon small left>add</v-icon>
          <span>신청하기</span>
        </v-btn>

        <!--messager button-->
        <v-btn flat slot="activator" color="success" @click="messager(board.Info)">
          <v-icon small left>message</v-icon>
          <span>메신저</span>
        </v-btn>
        <!-- <v-btn to="/mymap" flat slot="activator" color="info">
          <v-icon small left>expand_more</v-icon>
          <span>상세보기</span>
        </v-btn>-->
        <v-btn flat slot="activator" color="error">
          <v-icon small left>report</v-icon>
          <span>신고하기</span>
        </v-btn>
      </v-card-actions>
    </v-card>
    <Chat v-bind:comments="'guest'+board.boardId"/>
  </v-dialog>
</template>

<script>
import Chat from "../views/Chat";
export default {
  props: ["guestBoard"],
  components: {
    Chat
  },
  data() {
    return {
      board: this.guestBoard,
      rating: 3,
      items: [1, 2, 3, 4, 5],
      workDays: "",
      chatId: "",
      loading: "",
      showDate: "2018-03-02",

      selected: [],
      location: [],

      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      showCard: false,
      diff: "",
      role: null,
      chatRoomId: "",
      dialog: "",
      userName: "test",
      name: "default",
      gender: "man",
      age: "22",
      phone: "01011112222",
      email: "chchch@gggg",
      reference: "",
      address: "dfdf",
      location: "zzzz",
      role: "",
      preferLocation: []
    };
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  created() {
    console.log("on create board message" + this.board.boardId);
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
    allowedDates: val => parseInt(val.split("-")[2], 10) % 2 === 0,
    messager(info) {
      console.log(info);
      this.chatRoomId = localStorage.username + info.userName;
      console.log(this.chatRoomId);
      this.axios
        .post(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/chatRoom/createChatRoom",
          {
            chatRoomId: this.chatRoomId,
            hostUserName: localStorage.username,
            guestUserName: info.userName
          }
        )
        .then(response => {
          if (response.data.state == -1) {
            console.log("create room faild"+response.data);
          }
          console.log("create success"+response.data);
          this.$router.push({
            name: "chatroom",
            params: { chatRoomId: this.chatRoomId }
          });
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
    report(board) {
      console.log(board.boardId);
      if (localStorage.role == 0) {
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/hostBoard/isReportHost/ban",
            {
              boardId: board.boardId,
              userName: localStorage.username
            }
          )
          .then(response => {
            if (response.data.state == -1) {
              alert(response.data.msg);
            } else {
              console.log(response.data.msg);
              location.reload();
            }
          });
      } else {
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/guestBoard/isReportGuest/ban",
            {
              boardId: board.boardId,
              userName: localStorage.username
            }
          )
          .then(response => {
            if (response.data.state == -1) {
              alert(response.data.msg);
            } else {
              console.log(response.data.msg);
              location.reload();
            }
          });
      }
    },
    viewAction(board) {
      var can = board.candidate;
      console.log(can);
      this.loading = false;
      for (let index = 0; index < can.length; index++) {
        console.log(can[index]);
        if (can[index] === localStorage.username) {
          console.log(can[index]);
          this.loading = true;
          break;
        }
      }
    }
  }
};
</script>

<style>
</style>


