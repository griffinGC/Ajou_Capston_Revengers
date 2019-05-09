<template>
  <div class="about">
    <h1 class="subheading grey--text">This is an about page</h1>
    <v-container class="my-5">
      <!--Tabs-->
      <v-tabs flat fixed-tabs>
        <v-tab>Host Boards</v-tab>
        <v-tab>Guest Boards</v-tab>
      </v-tabs>

      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flex class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <img height="300px" :src="person.avatar">
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{person.name}}</div>
              <div class="grey--rext">{{person.role}}</div>
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
import { constants } from "crypto";
import PopupChat from "@/components/PopupChat.vue";

export default {
  mounted: function() {
    this.axios
      .get(
        "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/board/getGuestList"
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(console.log("error"));
  },
  components: {
    PopupChat
  },
  data: () => ({
    team: [
      {
        name: "the net Ninja",
        role: "web developer",
        avatar: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
      },
      {
        name: "Ryo",
        role: "Graphic designer",
        avatar: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      },
      {
        name: "Chun Li",
        role: "Web developer",
        avatar: "https://cdn.vuetifyjs.com/images/cards/road.jpg"
      },
      {
        name: "gouken",
        role: "sales guru",
        avatar: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      },
      {
        name: "yoshi",
        role: "sales guru",
        avatar: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      }
    ]
  })
};
</script>