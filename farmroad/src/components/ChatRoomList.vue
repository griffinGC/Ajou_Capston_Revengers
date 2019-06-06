<template>
  <v-layout>
    <v-flex xs12 sm12 d-flex>
      <v-card width="100%">
        <v-list two-line>
          <template v-for="(chatRoom, index) in chatRooms">
            <v-list-tile :key="chatRoom._id" avatar ripple @click="toggle(chatRoom)">
              <v-list-tile-content>
                <v-list-tile-title>{{ chatRoom.chatRoomId }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ chatRoom.hostUserName }}</v-list-tile-sub-title>
                <v-list-tile-sub-title class="text--primary">{{ chatRoom.guestUserName }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < chatRooms.length" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    
      </v-flex>
  </v-layout>
</template>


<script>
export default {
  name: "chatroomlist",
  data() {
    return {
      chatRooms: []
    };
  },
  mounted() {
    this.getChatRoom();
  },
  methods: {
    toggle(chatRoom) {
      console.log(chatRoom.chatRoomId);
      this.$router.push({
        name: "chatroom",
        params: { chatRoomId: chatRoom.chatRoomId }
      });
    },
    getChatRoom() {
      if ((localStorage.role == 0)) {
        this.axios
          .get(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/chatRoom/guest/" +
              localStorage.username
          )
          .then(response => {
            console.log(response.data);
            this.chatRooms = response.data;
          });
      } else {
        this.axios
          .get(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/chatRoom/host/" +
              localStorage.username
          )
          .then(response => {
            console.log(response.data);
            this.chatRooms = response.data;
          });
      }
    },
  }
};
</script>


