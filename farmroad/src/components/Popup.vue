<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success">add new project</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a new project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Title" v-model="title" prepend-icon="folder"></v-text-field>
          <v-textarea label="Information" v-model="content" prepend-icon="edit"></v-textarea>
          <v-btn flat class="success mx-0 mt-3">Add project</v-btn>
        </v-form>
      </v-card-text>
    </v-card> 
  </v-dialog>
</template>
<script>
export default {
  data(){
    return{
      title: '',
      content: ''
    }
  }
}
</script>

