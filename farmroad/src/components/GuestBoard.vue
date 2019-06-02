<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-btn flat slot="activator" class="success">add guest Board</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a Guest Board</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          
          <v-text-field label="Title" v-model="title" prepend-icon="folder"></v-text-field>
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
          <!--date select-->
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
                label="start date"
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
          <v-text-field label="Category" v-model="category" prepend-icon="category"></v-text-field>
          <v-icon>location_on</v-icon><span class="grey--text text--darken-1"> 선호 지역</span>
          <v-flex xs12 d-flex>
            <v-flex xs6>
            <v-checkbox v-model="selected" hide-details label="경기도" value="경기도"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="인천" value="인천"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="충청북도" value="충청북도"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="충청남도" value="충청남도"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="경상북도" value="경상북도"></v-checkbox>
            </v-flex>
            <v-flex xs6>
            <v-checkbox v-model="selected" hide-details label="경상남도" value="경상남도"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="전라북도" value="전라북도"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="전라남도" value="전라남도"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="강원도" value="강원도"></v-checkbox>
            <v-checkbox v-model="selected" hide-details label="제주도" value="제주도  "></v-checkbox>
            </v-flex>
          </v-flex>
          <v-textarea label="Content" v-model="content" prepend-icon="edit"></v-textarea>
          <v-alert v-model="alert" dismissible type="success">create Guest success</v-alert>
          <v-btn flat class="success mx-0 mt-3" @click="createGuestBoard">Add project</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      selected:[],
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      title: "",
      content: "",
      alert: false,
      dialog: false,
      category: "",
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      workDay: 3,
      imageName: "",
      imageUrl: "",
      imageFile: ""
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
    createGuestBoard() {
      var formData = new FormData();
      formData.append("img", this.imageFile);
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("guestId", localStorage.username);
      formData.append("category", this.category);
      formData.append("workDay", this.workDay);
      // formData.append("location2", this.selected);
      console.log(this.title);
      this.axios
        .post(
          "http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/guestBoard/createBoard",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(response => {
          console.log(response.data);
          if (response.data.state == 0) {
            this.$router.go(0)
            this.title = "";
            this.content = "";
            this.alert = true;

            setTimeout(() => {
              (this.alert = false), (this.dialog = false);
            }, 800);
          } else {
            alert(response.data.msg);
          }
        });
    }
  }
};
</script>