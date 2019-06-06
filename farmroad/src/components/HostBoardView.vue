<template>
  <v-dialog v-model="dialog" max-width="650px">
    <v-btn flat slot="activator" color="grey" >
      <v-icon small left>streetview</v-icon>
      <span>view</span>
    </v-btn>
    <v-card>
      <v-img class="black--text" height="200px">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline"></span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>

      <v-card-title>
        <h2 class="center teal-text"></h2>
      </v-card-title>

      <v-card-text>
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
          <span class="grey--text"></span>
          <br>
          <span></span>
        </div>
        <div class="text-xs">
          <v-rating :value="3" readonly></v-rating>
        </div>
      </v-card-text>
      <v-card-actions>
        <!--Notification button-->
        <v-btn
          :disabled="loading"
        
          slot="activator"
          color="success"
        >
          <v-icon small left>add</v-icon>
          <span>신청하기</span>
        </v-btn>

        <!--messager button-->
        <v-btn flat slot="activator" color="success" >
          <v-icon small left>message</v-icon>
          <span>메신저</span>
        </v-btn>
        <v-btn to="/mymap" flat slot="activator" color="info">
          <v-icon small left>expand_more</v-icon>
          <span>상세보기</span>
        </v-btn>
        <v-btn flat slot="activator" color="error" >
          <v-icon small left>report</v-icon>
          <span>신고하기</span>
        </v-btn>
      </v-card-actions>
    </v-card>
    <Chat />
  </v-dialog>
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
      showDate: "2018-03-02",

      selected: [],
      location: [],

      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      showCard: false,
      diff: "",
      role: null,
      chatRoomId: "",
      dialog: ''
    };
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods:{
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
  }
};
</script>

<style>
</style>


