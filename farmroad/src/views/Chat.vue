<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-list two-line class="messages">
          <template v-for="(msg) in messages">
            <v-list-tile :key="msg.id" avatar>
              <!-- <v-list-tile-avatar>
                <img :src="user.avatar">
              </v-list-tile-avatar>-->
              <v-list-tile-content>
                <span class="grey--text">{{msg.name}}:</span>
                <span>{{msg.content}}</span>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>

        <form @submit.prevent="addMessage">
          <v-text-field label="new message" v-model="newMessage" :rules="newMessageRules" required></v-text-field>
        </form>
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
  created() {
    let ref = db.collection("message").orderBy("timestamp");

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
      console.log(this.newMessage, this.name, Date.now());
      if (this.newMessage) {
        db.collection("message")
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
  max-height: 300px;
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

