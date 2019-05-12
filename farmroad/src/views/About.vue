<template>
  <div class="about">
    <h1 class="subheading grey--text">This is an about page</h1>
    <v-btn flat class="success" @click="showHostBoards">show host boards</v-btn>
    <v-btn flat class="success" @click="showGuestBoards">show guest boards</v-btn>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="board in boards" :key="board._id">
          <v-card flex class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <img height="300px" :src="board.boardImg">
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{board.title}}</div>
              <div class="grey--rext">{{board.content}}</div>
            </v-card-text>
            <v-card-actions>
              <PopupChat/>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PopupChat from "@/components/PopupChat.vue";

export default {
  data() {
    return {
      boards: []
    };
  },

  created: function() {
    this.$store.dispatch("fetchHostBoards");
    this.boards = this.$store.getters.doneHostBoards;
    this.$store.dispatch("fetchGuestBoards");
  },
  components: {
    PopupChat
  },
  methods: {
    showHostBoards() {
      this.boards = "";
      this.boards = this.$store.getters.doneHostBoards;
    },
    showGuestBoards() {
      this.boards = "";
      this.boards = this.$store.getters.doneGuestBoards;
    }
  }
};
</script>