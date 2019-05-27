<template>
  <v-layout row>
    <div>
      <v-btn color="success">Guest 유저 정보</v-btn>
      <v-btn color="info">Host 유저 정보</v-btn>
    </div>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="indigo" dark>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
          <v-toolbar-title>게스트 유저 정보 </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-tile
            v-for="user in guestUserList"
            :key="user.id"
            avatar  
          >
            <v-list-tile-action>
              <v-icon v-if="user.icon" color="pink">done</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="user.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar v-if="user.profileImg">
              <img  :src="user.profileImg">
            </v-list-tile-avatar>
            <v-icon v-else size="40px">person</v-icon>
          </v-list-tile>
        </v-list>
      </v-card>

      <v-card>
        <v-toolbar color="indigo" dark>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
          <v-toolbar-title>호스트 유저 정보 </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list>
          <v-list-tile
            v-for="user in hostUserList"
            :key="user.userName"
            avatar  
          >
            <v-list-tile-action>
              <v-icon v-if="user.icon" color="pink">done</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="user.userName"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-content>
              <v-list-tile-title v-text="user.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar v-if="user.profileImg">
              <img  :src="user.profileImg">
            </v-list-tile-avatar>
            <v-icon v-else size="40px">person</v-icon>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>

</template>


<script>

export default {
  name: "userList",
  components: {
    // HomeBoardView
  },
  data () {
      return {
        guestUserList: [
          // { icon: true, name: 'Jason Oner', profileImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          // { name: 'Travis Howard', profileImg: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          // { name: 'Ali Connors', profileImg: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          // { name: 'Cindy Baker', profileImg: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
          // { name: 'MinYoung' }
        ],
        hostUserList: [
          // { icon: true, name: ' Oner', profileImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          // { name: 'Travis Howard', profileImg: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          // { name: 'Ali Connors', profileImg: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          // { name: 'Cindy Baker', profileImg: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
          // { name: 'MinYoung' }
        ]
      }
    },
  created(){
    console.log("userList is created!");
    this.getGuestList();
    this.getHostList();
  },
  methods:{
    getGuestList(){
      this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/guest`)
        .then(response => {
          this.guestUserList = response.data;
          console.log(this.guestUserList);
        });
    },
    getHostList(){
      this.axios
        .get(`http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/user/getInfo/host`)
        .then(response => {
          this.hostUserList = response.data;
          console.log(this.hostUserList);
        });
    },
  },

};
</script>
