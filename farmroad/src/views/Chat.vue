<template>
  <v-form>
    <v-layout row wrap>
        <v-flex xs12 sm12>
          <h1 class="subheading grey--text">Real Time Chat</h1><br>
          <v-card height="50%">
          <div class="chat-list"
          v-scroll="onScroll"
          column
          align-center
          justify-center
          style="height: 250px"
          >
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
            v-on:newMessage="newMessage(chat)"
            v-on:keyup.enter="newMessage(chat)"
            >
            <template v-slot:append-outer>
              <!-- <v-btn v-on="on">
                <v-icon class="clearMessage" @click="clearMessages"></v-icon>Clear
              </v-btn> -->
                </template>
            </v-text-field>
          </v-card>
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
      messages: [],
		}
  },
	methods:{
		newMessage(chat){
			if(chat != null){
				this.messages.push({chat:chat});
				this.chat = null
			}
    },
    onScroll() {

    }
	}
}
</script>

<style>
.chat-list {
  background-color:antiquewhite;
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
