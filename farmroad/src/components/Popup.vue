<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn flat slot="activator" class="success">초대 글 작성</v-btn>
    <v-card>
      <v-card-title>
        <h2>초대 글 작성</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="제목" v-model="title" prepend-icon="folder" required></v-text-field>
          <!--img upload-->
          <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <img :src="imageUrl" height="150" v-if="imageUrl">
            <v-text-field
              label="이미지 선택"
              @click="pickFile"
              v-model="imageName"
              prepend-icon="attach_file"
            ></v-text-field>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onFilePicked"
            >
          </v-flex>
          <!--start date select-->
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFormatted"
                label="시작날짜"
                hint="월/일/연도 순으로 입력해주세요!"
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
           <v-select
            :items="items"
            v-model="workDay"
            label="일 하는 기간"
            prepend-icon="work"
            return-object
          ></v-select>

          <v-select :items="items1" v-model="diff" label="일의 종류" return-object></v-select>
          <v-icon>accessibility</v-icon><span class="grey--text text--darken-1"> 선호 능력</span>
          <v-flex xs12 d-flex>
            <v-flex xs6>
            <v-checkbox v-model="selected" hide-details label="요리를 잘해요" value="cook"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="미용을 잘해요" value="beauty"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="육아를 잘해요" value="baby"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="청소를 잘해요" value="clean"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="운전을 잘해요" value="drive"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="도배를 잘해요" value="paper"></v-checkbox>
            </v-flex>
            <v-flex xs6>
            <v-checkbox v-model="selected" hide-details label="짐나르는거 잘해요" value="carry"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="노래를 잘해요" value="sing"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="말동무를 잘해요" value="talk"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="컴퓨터를 잘해요" value="comp"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="농기계를 잘다뤄요" value="machine"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="농사경험이 있어요" value="farm"></v-checkbox>
            </v-flex>
          </v-flex>
          <!-- <v-icon>location_on</v-icon><span class="grey--text text--darken-1"> 일하는 지역</span>
          <v-flex xs12 d-flex>
            <v-flex xs6>
            <v-checkbox v-model="workLocation" hide-details label="경기도" value="경기도"></v-checkbox>
            <v-checkbox v-model="workLocation" hide-details label="인천" value="인천"></v-checkbox>
            <v-checkbox v-model="workLocation" hide-details label="충청북도" value="충청북도"></v-checkbox>
            <v-checkbox v-model="workLocation" hide-details label="충청남도" value="충청남도"></v-checkbox>
            <v-checkbox v-model="workLocation" hide-details label="경상북도" value="경상북도"></v-checkbox>
            </v-flex>
            <v-flex xs6>
            <v-checkbox v-model="workLocation" hide-details label="경상남도" value="경상남도"></v-checkbox>
            <v-checkbox v-model="workLocation" hide-details label="전라북도" value="전라북도"></v-checkbox>
            <v-checkbox v-model="workLocation" hide-details label="전라남도" value="전라남도"></v-checkbox>
            <v-checkbox v-model="workLocation" hide-details label="강원도" value="강원도"></v-checkbox>
            <v-checkbox v-model="workLocation" hide-details label="제주도" value="제주도"></v-checkbox>
            </v-flex>
          </v-flex> -->
          <v-textarea label="내용" v-model="content" prepend-icon="edit" required></v-textarea>
          <v-alert v-model="alert" dismissible type="success">성공적으로 글이 생성되었습니다!</v-alert>

          <v-btn flat class="success mx-0 mt-3" @click="createHostBoard">초대 글 생성</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      selected:[],
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      title: "",
      content: "",
      diff: "농업",
      items1: ["농업", "임업", "수산업", "목축업", "기타"],
      alert: false,
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      workDay: 3,
      workLocation: "",
      
    };
  },
  components:{
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    pickFile() {
      this.$refs.image.click();
    },

    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0]; // this is an image file that can be sent to server...
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    createHostBoard() {
      var formData = new FormData();
      formData.append("img", this.imageFile);
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("hostId", localStorage.username);
      formData.append("difficulty", this.diff);
      formData.append("workDay", this.workDay);
      formData.append("startDate", this.date);
      let temp = JSON.stringify(this.selected);
      // 문자열로 보내서 backend에서 데이터 처리
      formData.append("preferAbility", temp);
      // formData.append("location", this.workLocation);
      console.log(formData)
      this.axios
        .post(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/hostBoard/createBoard",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(resposne => {
          console.log(resposne.data);
          if (resposne.data.state == 0) {
            this.alert = true;
            this.$router.go(0)
            setTimeout(() => {
              (this.alert = false), (this.dialog = false);
            }, 800);
            console.log(this.date);
          } else {
            alert(resposne.data.msg);
          }
        });
    }
  }
};
</script>