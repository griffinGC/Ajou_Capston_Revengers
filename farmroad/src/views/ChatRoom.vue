<template>
  <v-flex>
    <v-card>
      <v-card-title>>
        <h2>chat room</h2>
      </v-card-title>
      <v-list class="messages" two-line v-chat-scroll>
        <template v-for="msg in messages">
          <v-list-tile :key="msg.id" avatar>
            <v-list-tile-avatar>
              <img :src="msg.img">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <span class="grey--test">{{msg.name}}:</span>
              <span>{{msg.content}}</span>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-card-actions></v-card-actions>
      <form @submit.prevent="addMessage">
        <v-text-field label="새로운 메시지" v-model="newMessage" :rules="newMessageRules" required></v-text-field>
      </form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat router :to="{name: 'home'}">뒤로가기</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "chatroom",
  components: {},
  props: {
    chatRoomId: String
  },
  data() {
    return {
      messages: [],
      newMessage: "",
      newMessageRules: [v => !!v || "메시지를 작성해야 합니다."]
    };
  },
  mounted() {
    console.log(this.chatRoomId);
    let ref = db.collection(this.chatRoomId).orderBy("timestamp");

    this.$notify({
            group: "foo",
            title: "메세지 도착!",
            text: "새로운 메세지가 도착했습니다!"
          });
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            img: doc.data().img
            //timestamp: moments(doc.data().timestamp).format('lll')
          });
          
        }
      });
    });
  },
  methods: {
    addMessage() {
      console.log(this.newMessage, localStorage.username, Date.now());
      if (this.newMessage) {
        db.collection(this.chatRoomId)
          .add({
            content: this.newMessage,
            name: localStorage.username,
            img: localStorage.img,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
      } else {
      }
    }
  }
};
</script>

<style>
.messages {
  max-height: 500px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  widows: 3px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>


