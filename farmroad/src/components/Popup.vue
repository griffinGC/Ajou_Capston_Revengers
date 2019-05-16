<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success">add host Board</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a new Board</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Title" v-model="title" prepend-icon="folder"></v-text-field>
          <!--时间选择栏-->
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
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
          </v-menu>

          <v-text-field label="Location" v-model="title" prepend-icon="map"></v-text-field>
           <v-select :items="items" v-model="diff" label="difficulty" return-object></v-select>
          <v-textarea label="Content" v-model="content" prepend-icon="edit"></v-textarea>

          <v-btn flat class="success mx-0 mt-3" @click="createHostBoard">Add Board</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      title: "",
      content: "",
      diff: '',
      items: [1,2,3,4,5]
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
    createHostBoard() {
      this.axios.post("http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/board/hostCreateBoard", {
        title: this.title,
        content: this.content,
        hostId: localStorage.username,
        difficulty: this.diff,
        workDay: 3,
        startDate: 20190304,
        endDate: 20190309
      }).then(resposne=>{
        console.log(resposne.data)
      })
    }
  }
};
</script>