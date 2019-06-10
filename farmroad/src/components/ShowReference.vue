<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-btn flat slot="activator" class="success" @click="getMyReference(referenceId)">후기</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap class="cont">
          <v-flex sm11>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{title}}</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <div>{{content}}</div>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      title: "",
      content: "",
    };
  },
  props: ["referenceId"],
 
 
  methods: {
    getMyReference(id) {
    console.log(id)
      if (localStorage.role == 0) {
        console.log(localStorage.role)
        this.axios
          .get(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/getGuestWrited/" +
              id
          )
          .then(response => {
            console.log(response.data);
            (this.title = response.data.title),
              (this.content = response.data.content);
          });
      } else {
        this.axios
          .get(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/getHostWrited/" +
              id
          )
          .then(response => {
            console.log(response.data);
            (this.title = response.data.title),
              (this.content = response.data.content);
          });
      }
    }
  }
};
</script>
<style>
.info1 div {
  margin-left: 12px;
  margin-bottom: 10px;
}

.cont {
  margin-left: 30px;
  margin-top: 30px;
}
</style>
