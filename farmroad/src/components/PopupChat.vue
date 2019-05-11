<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" color="grey">
      <v-icon small left>message</v-icon>
      <span>message</span>
    </v-btn>
    <v-card>
      <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">Top 10 Australian beaches</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-title>
        <h2 class="center teal-text">Board Chat</h2>
      </v-card-title>
      <v-card-text>
        <div>
          <span class="grey--text">Number 10</span>
          <br>
          <span>Whitehaven Beach</span>
          <br>
          <span>Whitsunday Island, Whitsunday Islands</span>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      messages: []
    };
  },
  components: {}
};
</script>

