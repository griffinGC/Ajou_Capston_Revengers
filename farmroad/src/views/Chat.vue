<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title>
          comments
        </v-card-title>
        <v-list two-line class="messages" v-chat-scroll>
          <template v-for="(msg) in messages">
            <v-list-tile :key="msg.id" avatar>
              <v-list-tile-avatar>
                <img :src="msg.img">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <span class="grey--text">{{msg.name}}:</span>
                <span>{{msg.content}}</span>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>

        <!--submit-->
        <form @submit.prevent="addMessage" >
          <v-text-field label="new message" v-model="newMessage" :rules="newMessageRules" required></v-text-field>
        </form>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import db from "@/firebase/init";
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      newMessageRules: [v => !!v || "Message is required"]
    };
  },
  props:{
    comments: String
  },
  created() {
    console.log(this.comments);
    let ref = db.collection(this.comments).orderBy("timestamp");

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
        db.collection(this.comments)
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
    },
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

