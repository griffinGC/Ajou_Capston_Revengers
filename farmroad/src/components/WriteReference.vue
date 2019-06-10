<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-btn flat slot="activator" class="success">후기 남기기</v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap class="cont">
            <v-flex sm11>
            <v-form class="px-3">
              <v-text-field label="Title" v-model="title" prepend-icon="folder" required></v-text-field>
              <!--img upload-->
              <!--start date select-->
              <v-textarea label="Content" v-model="content" prepend-icon="edit" required></v-textarea>
            </v-form>
              <v-card-text>
                <div class="rating">
                <!-- <v-rating :value="board.difficulty" readonly></v-rating> -->
                <v-rating :value="star" ></v-rating>
                </div>
              </v-card-text>
                <v-card-actions>
                <v-btn flat slot="activator" color="success" @click="saveReference()">
                  <v-icon small left>favorite</v-icon>
                  <span>후기 작성</span>
                  </v-btn>
                  <v-btn flat slot="activator" color="success" @click="cancelReference()">
                  <v-icon small left>clear</v-icon>
                  <span>작성 취소</span>
                  </v-btn>
                  </v-card-actions>
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
      // candidateInfo : ""
      boards: [],
      dialog : false,
      candidateData : {

      },
      star : 3,
      title : "",
      content : "",
    };
  },
  props : ['boardId','boardWriter'],
  created() {
    console.log("props로 받은 값 : " + this.boardId);
    console.log(this.boardId);
    console.log(this.boardWriter)
    console.log("출력완료");
    this.role=localStorage.role;
  },
  mounted(){
    this.role = localStorage.role;
  },

  methods: {
    saveReference(){
      console.log("save reference ");
      //0 은 본인이 guest 
      if(localStorage.role === '0'){
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/createHostReference",
            {
              boardId : this.boardId,
              title : this.title,
              writer : localStorage.username,
              writerImg : localStorage.img,
              userName : this.boardWriter,
              content : this.content,
              star : this.star
            }
          )
          .then(response=>{
            if (response.data.state == -1) {
            console.log("reference save is failed!!");
              alert("후기 작성에 실패햐였습니다.");
              location.reload();
              return;            
            }else if(response.data.state == 0){
              console.log("reference save is success");
              alert("후기 작성이 완료 되었습니다!");
              location.reload();
              return;
            }});
      }else{
        this.axios
          .post(
            "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/reference/createGuestReference",
            {
              boardId : this.boardId,
              title : this.title,
              writer : localStorage.username,
              writerImg : localStorage.img,
              userName : this.boardWriter,
              content : this.content,
              star : this.star
            }
          )
          .then(response=>{
            if (response.data.state == -1) {
            console.log("reference save is failed!!");
              alert("후기 작성에 실패햐였습니다.");
              location.reload();
              return;            
            }else if(response.data.state == 0){
              console.log("reference save is success");
              alert("후기 작성이 완료 되었습니다!");
              location.reload();
              return;
            }});
      }
    },
    cancelReference(){
      location.reload();
    },
  }
};
</script>
<style>
.info1 div{
  margin-left:12px;
  margin-bottom:10px;
}
/* .rating{
  margin-left:5px;
  margin-top:0px;
} */
.cont{
  margin-left:30px;
  margin-top:30px;
}
</style>
