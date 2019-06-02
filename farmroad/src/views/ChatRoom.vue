<template>
  <v-flex>
    <v-card>
      <v-card-title>
        <h2>chat room</h2>
      </v-card-title>
      <v-list class="messages" two-line v-chat-scroll>
        <template v-for="msg in messages" >
          <v-list-tile :key="msg.id">
            <v-list-tile-content>
              <span class="grey--test">{{msg.name}}:</span>
              <span>{{msg.content}}</span>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-card-actions></v-card-actions>
      <form @submit.prevent='addMessage'>
        <v-text-field label="new message" v-model="newMessage" :rules="newMessageRules" required></v-text-field>
      </form>
    </v-card>
  </v-flex>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "chatroom",
  components: {},
  props: {
    ChatRoomId: String
  },
  data() {
    return {
      messages: [],
       newMessage: "",
       newMessageRules: [v => !!v || "Message is required"]
    };
  },
  created() {
    console.log("chatroom");
    let ref = db.collection("chatroom").orderBy("timestamp");

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content
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
        db.collection('chatroom')
          .add({
            content: this.newMessage,
            name: localStorage.username,
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


