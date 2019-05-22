<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn flat slot="activator" class="success">add host Board</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a Host Board</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="title" v-model="title" prepend-icon="folder" required></v-text-field>
          <!--img upload-->
          <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <img :src="imageUrl" height="150" v-if="imageUrl">
            <v-text-field
              label="Select Image"
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
                label="Start Date"
                hint="MM/DD/YYYY format"
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
            label="work day"
            prepend-icon="work"
            return-object
          ></v-select>
          <v-select :items="items1" v-model="diff" label="difficulty" return-object></v-select>
          <v-textarea label="Content" v-model="content" prepend-icon="edit" required></v-textarea>
          <v-alert v-model="alert" dismissible type="success">create Board success</v-alert>

          <v-btn flat class="success mx-0 mt-3" @click="createHostBoard">Add Board</v-btn>
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
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      title: "",
      content: "",
      diff: 3,
      items1: [1, 2, 3, 4, 5],
      alert: false,
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      workDay: 3,
      
    };
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
            this.$router.push({ name: "about" });
            this.alert = true;
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