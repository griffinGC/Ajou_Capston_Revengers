<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-list two-line>
          <template v-for="(user) in users">
            <v-list-tile :key="user.name" avatar>
              <v-list-tile-avatar>
                <img :src="user.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="user.name">:</v-list-tile-title>
                <v-list-tile-sub-title v-html="user.content"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>

        <v-card-actions>
          <v-textarea label="Message:" rows="2"></v-textarea>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  data() {
    return {
      users: [
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "Brunch ",
          content:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          name: "Summer ",
          content:
            "to Alex, Scott, Jennifer &mdash; Wish I could come, but I'm out of town this weekend."
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          name: "Brunch",
          content:
            "Sandra Adams &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ]
    };
  }
};
</script>
