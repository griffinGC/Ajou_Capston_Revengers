<template>
  <div class="about">
    <!--search from-->
    <v-form v-if="role">
      <div class="grey--text text--darken-1"></div>
      <v-layout row wrap>
        <v-item-group>
          <v-checkbox v-model="workLocation" label="경기도" value="경기도"></v-checkbox>
          <v-checkbox v-model="workLocation" label="인천" value="인천"></v-checkbox>
        </v-item-group>
        <v-item-group>
          <v-checkbox v-model="workLocation" label="충청북도" value="충청북도"></v-checkbox>
          <v-checkbox v-model="workLocation" label="충청남도" value="충청남도"></v-checkbox>
        </v-item-group>
        <v-item-group>
          <v-checkbox v-model="workLocation" label="경상북도" value="경상북도"></v-checkbox>
          <v-checkbox v-model="workLocation" label="경상남도" value="경상남도"></v-checkbox>
        </v-item-group>
        <v-item-group>
          <v-checkbox v-model="workLocation" label="전라북도" value="전라북도"></v-checkbox>
          <v-checkbox v-model="workLocation" label="전라남도" value="전라남도"></v-checkbox>
        </v-item-group>
        <v-item-group>
          <v-checkbox v-model="workLocation" label="강원도" value="강원도"></v-checkbox>
          <v-checkbox v-model="workLocation" label="제주도" value="제주도"></v-checkbox>
        </v-item-group>
        {{ this.workLocation}}
        <v-btn flat class="success" @click="sortLocation(boards)">지역 검색</v-btn>
      </v-layout>
    </v-form>
    <v-form v-else>
      <div class="grey--text text--darken-1"></div>
      <v-layout row wrap>
        <v-item-group>
          <v-checkbox v-model="selected" label="요리를 잘해요" value="요리를 잘해요"></v-checkbox>
          <v-checkbox v-model="selected" label="미용 잘해요" value="미용 잘해요"></v-checkbox>
        </v-item-group>
        <v-item-group>
          <v-checkbox v-model="selected" label="애를 잘돌봐요" value="애를 잘돌봐요"></v-checkbox>
          <v-checkbox v-model="selected" label="청소를 잘해요" value="청소를 잘해요"></v-checkbox>
        </v-item-group>
        <v-item-group>
          <v-checkbox v-model="selected" label="운전을 잘해요" value="운전을 잘해요"></v-checkbox>
          <v-checkbox v-model="selected" label="도배를 잘해요" value="도배를 잘해요"></v-checkbox>
        </v-item-group>
        <v-item-group>
          <v-checkbox v-model="selected" label="짐나르는거 잘해요" value="짐나르는거 잘해요"></v-checkbox>
          <v-checkbox v-model="selected" label="노래를 잘해요" value="노래를 잘해요"></v-checkbox>
        </v-item-group>
        <v-item-group>
          <v-checkbox v-model="selected" label="말동무를 잘해요" value="말동무를 잘해요"></v-checkbox>
          <v-checkbox v-model="selected" label="컴퓨터를 잘다뤄요" value="컴퓨터를 잘다뤄요"></v-checkbox>
        </v-item-group>
        <v-item-group>
          <v-checkbox v-model="selected" label="농기계를 잘다뤄요" value="농기계를 잘다뤄요"></v-checkbox>
          <v-checkbox v-model="selected" label="농사경험이 있어요" value="농사경험이 있어요"></v-checkbox>
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
              <!--Board View-->
              <!-- <GuestBoardView v-if="role===false" v-bind:guestBoad="board"/> -->
              <HostBoardView v-bind:hostBoard="board"/>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import Chat from "../views/Chat";
import UserInfoVue from "./UserInfo.vue";
import Review from "./Review";
import HostBoardView from "../components/HostBoardView";
import GuestBoardView from "../components/GuestBoardView";
export default {
  components: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    HostBoardView,
    GuestBoardView,
    Review,
    Chat,
    HostBoardView
  },
  data() {
    return {
      boards: [],
      newBoards: [],

      selected: [],
      workLocation: [],
      role: null,
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
  methods: {
    sortBoard(boards) {
      let tempBoards = new Array();
      boards.forEach(index => {
        index.count = 0;
        for (let i = 0; i < index.Info.ability.length; i++) {
          for (let j = 0; j < this.selected.length; j++) {
            if (index.Info.ability[i] === this.selected[j]) {
              ++index.count;
              // break;
            }
          }
        }
        console.log("가지고 있는 개수! " + index.count);
        if (index.count !== 0) {
          tempBoards.push(index);
        }
      });
      console.log(tempBoards);
      console.log("데이터 검색");
      this.newBoards = tempBoards;
      if (this.selected.length === 0) {
        this.newBoards = boards;
      }
    },
    sortLocation(boards) {
      let tempBoards = new Array();
      boards.forEach(index => {
        index.count = 0;
        for (let i = 0; i < this.workLocation.length; i++) {
          if (index.location === this.workLocation[i]) {
            console.log("같은 곳의 위치 : " + this.workLocation[i]);
            ++index.count;
          }
        }
        if (index.count !== 0) {
          tempBoards.push(index);
        }
      });
      this.newBoards = tempBoards;

      console.log("새로운보드");
      console.log(this.newBoards);
      console.log("새로운보드");
      if (this.workLocation.length === 0) {
        this.newBoards = boards;
      }
    },
  }
};
</script>
