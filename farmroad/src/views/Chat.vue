<template>
  <v-form>
    <v-layout row wrap>
        <v-flex xs12 sm12>
          <h1 class="subheading grey--text">Real Time Chat</h1><br>
          <div class="chat-list">
              <ul>
                  <li v-for="message in messages">{{ message.chat }}</li>
              </ul>  
          </div>
          <v-text-field
            v-model="chat"
            outline
            clearable
            label="Message"  
            type="text" 
            append-icon="send"
            @click:append='newMessage(chat)'
            v-on:keyup.enter="newMessage(chat)"
            v-on:newMessage="newMessage(chat)"
            >
            <template v-slot:append-outer>
              <!-- <v-btn v-on="on">
                <v-icon class="clearMessage" @click="clearMessages"></v-icon>Clear
              </v-btn> -->
                </template>
            </v-text-field>
          </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  name: 'Chat',
	data () {
		return {
			chat:null,
			messages: []
		}
	},
	methods:{
		newMessage(chat){
			if(chat != null){
				this.messages.push({chat:chat});
				this.chat = null
			}
    },
    clearMessage(){

    }
	}
}
</script>

<style>
.chat-list {
  background-color:bisque;
  height: 150%;
  overflow: auto;
  }
ul{
    list-style-type: none;
    padding-left: 5px;
}
li {
    display: flex;
    /* min-height: 50px; */
    /* height: 50px; */
    /* line-height: 50px; */
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    margin-right:5px;
    }
</style>
