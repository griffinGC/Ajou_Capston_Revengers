<template>
  <v-dialog v-model="dialog" max-width="650px">
    <v-btn flat slot="activator" class="info">게시글 정보 </v-btn>
    <v-card>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex md6>
            <v-avatar size="230px">
              <img :src="board.Info.profileImg">
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
        <v-flex><div>원하는 능력</div>
        <v-layout row wrap>
            <v-flex v-if="board.preferAbility.includes('cook')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="요리를 잘해요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="요리를 잘해요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('beauty')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="미용을 잘해요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="미용을 잘해요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('baby')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="애를 잘돌봐요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="애를 잘돌봐요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('clean')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="청소를 잘해요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="청소를 잘해요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('drive')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="운전을 잘해요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="운전을 잘해요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('paper')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="도배를 잘해요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="도배를 잘해요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('carry')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="짐나르는거 잘해요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="짐나르는거 잘해요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('sing')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="노래를 잘해요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="노래를 잘해요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('talk')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="말동무를 잘해요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="말동무를 잘해요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('comp')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="컴퓨터를 잘다뤄요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="컴퓨터를 잘다뤄요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('machine')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="농기계를 잘다뤄요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="농기계를 잘다뤄요" xs6 sm3 md2></v-checkbox></v-flex>
            <v-flex v-if="board.preferAbility.includes('farm')" xs6 sm3 md2>
              <v-checkbox input-value="true" value disabled hide-details label="농사경험이 있어요"></v-checkbox>
            </v-flex>
            <v-flex v-else xs6 sm3 md2><v-checkbox value disabled hide-details label="농사경험이 있어요" xs6 sm3 md2></v-checkbox></v-flex>
        </v-layout>
        </v-flex>
        </v-layout>
      </v-container>

    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: ["hostBoard"],
  components: {

  },
  data() {
    return {
      board: this.hostBoard,
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


