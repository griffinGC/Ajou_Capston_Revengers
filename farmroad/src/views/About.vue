<template>
  <div class="about">
    <!--条件选择表格-->
    <v-form>
      <v-flex xs6 sm3>
        <!--难度选择-->
        <v-select :items="items" v-model="diff" label="difficulty" return-object></v-select>
        diff : {{ diff }}
        <!--时间选择-->
        <!--start Date-->
        <v-menu
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
              prepend-icon="event"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
        <!--end Date-->
        <v-menu
          ref="menu2"
          v-model="menu2"
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
              label="End Date"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="event"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
        </v-menu>
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
      newBoards: [],
      rating: 3,
      items: [1, 2, 3, 4, 5],
      menu1: false,
      menu2: false,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      showCard: false,
      diff: ""
    };
  },

  mounted: function() {
    if (localStorage.role == 0) {
      this.axios
        .get(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/board/getHostList"
        )
        .then(response => {
          console.log(response.data);
          this.boards = response.data;
          this.newBoards = response.data
        });
    } else {
      this.axios
        .get(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/board/getGuestList"
        )
        .then(response => {
          console.log(response.data);
          this.boards = response.data;
           this.newBoards = response.data
          
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
      var temBoards = new Array()
      boards.forEach(item => {
        if (item.difficulty == this.diff) {
          temBoards.push(item);
        }
      });
      this.newBoards = temBoards
      console.log(this.newBoards);
    }
  }
};
</script>