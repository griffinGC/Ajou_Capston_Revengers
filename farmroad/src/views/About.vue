<template>
  <div class="about">
    <v-btn flat class="success" @click="showHostBoards">show host boards</v-btn>
    <v-btn flat class="success" @click="showGuestBoards">show guest boards</v-btn>
    <v-form>
      <v-flex xs6 sm3>
         <v-select
          :items="items"
          label="difficulty"
        ></v-select>
      </v-flex>
    </v-form>
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
                    <v-btn slot="activator" color="success">
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
      rating: 3,
      items:[1,2,3,4,5]
    };
  },

  created: function() {
    this.$store.dispatch("fetchHostBoards");
    this.boards = this.$store.getters.doneHostBoards;
    this.$store.dispatch("fetchGuestBoards");
  },
  components: {},
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