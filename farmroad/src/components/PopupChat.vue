<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" color="grey">
      <v-icon small left>message</v-icon>
      <span>message</span>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2 class="center teal-text">Board Chat</h2>
      </v-card-title>
      <v-card-text>
        <ul class="messages">
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">Name:</span>
            <span class="grey-text text-dark-3">Content</span>
            <span class="grey-text time">Timestamp</span>
          </li>
        </ul>
      </v-card-text>
      <card-action></card-action>
    </v-card>
  </v-dialog>
</template>
<script>
import NewMessage from "@/components/NewMessage";
import db from "@/firebase/init";
import moments from "moment";

export default {
  data() {
    $props
    return {
      title: "",
      content: "",
      messages:[]
    };
  },
  components: {
    NewMessage
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
            content: doc.data().content,
            timestamp: moments(doc.data().timestamp).format("lll")
          });
        }
      });
    });
  }
};
</script>

