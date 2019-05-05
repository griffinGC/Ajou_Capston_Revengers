<template>
  <div class="about">
    <h1 class="subheading grey--text">This is an about page</h1>
    <v-container class="my-5">
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
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span>message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
     team: [
        { name: "the net Ninja", role: "web developer", avatar: "https://cdn.vuetifyjs.com/images/cards/house.jpg" },
        { name: "Ryo", role: "Graphic designer", avatar: "/img/avatar-2.png" },
        { name: "Chun Li", role: "Web developer", avatar: "https://cdn.vuetifyjs.com/images/cards/road.jpg" },
        { name: "gouken", role: "sales guru", avatar: "/img/avatar-4.png" },
        { name: "yoshi", role: "sales guru", avatar: "/img/avatar-5.png" }
      ]
  })
};
</script>
/img