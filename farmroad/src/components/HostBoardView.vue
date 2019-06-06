<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" color="grey" @click="viewAction(board)">
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
        <v-btn to="/mymap" flat slot="activator" color="info">
          <v-icon small left>expand_more</v-icon>
          <span>상세보기</span>
        </v-btn>
        <v-btn flat slot="activator" color="error" @click="report(board)">
          <v-icon small left>report</v-icon>
          <span>신고하기</span>
        </v-btn>
      </v-card-actions>
    </v-card>
    <Chat v-bind:comments="'host'+board.boardId"/>
  </v-dialog>
</template>
<script>
export default {};
</script>
<style>
</style>


