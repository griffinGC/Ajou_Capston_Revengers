<template>
  <div class="about">
    <!--search from-->
    <v-form v-if="role">
      <v-flex xs6>
        <!--difficulty select-->
        <v-select v-if="role" :items="items" v-model="diff" label="difficulty" return-object></v-select>

        <!--start Date select-->
        <!-- <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateFormatted"
              label="Start Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
        
        work days
        <v-slider v-model="WorkDays" color="orange" label="work days" min="1" max="30" thumb-label></v-slider>-->

        <!--search btn-->
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
                    <h2 class="center teal-text">{{board.hostInfo[0].name}}</h2>
                  </v-card-title>
                  <v-card-text>
                    <!--map-->
                    <div class="map">
                      <h2>map</h2>
                      <div class="google-map" id="map"></div>
                    </div>
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
  created: {
    role() {
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
    map() {
      let ckeditor = document.createElement("script");
      ckeditor.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyASyxjxmpwhG4JJI3D516ecwSA7XT5IWYM");
      document.head.appendChild(ckeditor);
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
          this.renderMap();
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
          this.renderMap();
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
    },
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lan: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
    }
  }
};
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0;
  background-attachment: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
