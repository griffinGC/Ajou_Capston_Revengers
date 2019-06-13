<template>
  <v-layout column wrap>
    <v-flex>
      <div class="map">
        <div class="google-map" id="map"></div>
        <br>
      </div>
    </v-flex>
    <v-flex>
      <v-layout column wrap>
        <v-flex xs12 sm12 md12>
          <div height="800" background-color="blue" class="box1"></div>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <v-card>
            <div>Host 정보</div>
            <v-layout row wrap>
              <v-img v-if="profileImg" :src="profileImg" alt="Avatar" height="275"></v-img>
              <v-icon v-else>person</v-icon>
              <v-layout row wrap>
                <v-flex xs5 sm5 offset-xs1 class="grey--text font-weight-bold">유저 아이디</v-flex>
                <v-flex xs6 sm6>{{userName}}</v-flex>
                <v-flex
                  xs5
                  sm5
                  offset-xs1
                  v-if="role === '0'"
                  class="grey--text font-weight-bold"
                >유저정보</v-flex>
                <v-flex xs5 sm5 v-if="role === '0'">Host</v-flex>
                <!-- <v-flex xs5 sm5 offset-xs1 v-if="role === '1'" class="grey--text font-weight-bold">유저정보</v-flex>
                <v-flex xs6 v-if="role === '1'">Guest</v-flex>-->
                <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">이름</v-flex>
                <v-flex xs6>{{name}}</v-flex>
                <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">성별</v-flex>
                <v-flex xs6>{{gender}}</v-flex>
                <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">나이</v-flex>
                <v-flex xs6>{{age}}</v-flex>
                <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">전화번호</v-flex>
                <v-flex xs6>{{phone}}</v-flex>
                <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">이메일</v-flex>
                <v-flex xs6>{{email}}</v-flex>
                <v-flex xs5 offset-xs1 v-if="role === '0'" class="grey--text font-weight-bold">직업</v-flex>
                <v-flex xs6 v-if="role === '0'">{{work}}</v-flex>
                <v-flex xs5 offset-xs1 v-if="role === '0'" class="grey--text font-weight-bold">지역</v-flex>
                <v-flex xs6 v-if="role === '0'">{{location}}</v-flex>
                <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">주소</v-flex>
                <v-flex xs6>{{address}}</v-flex>
                <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">평점</v-flex>
                <v-flex xs6>
                  <v-rating :value="star" readonly size="15"></v-rating>
                </v-flex>
                <v-btn
                  router
                  :to="{ name : 'ReferenceProfile', params:{sendName : this.userName, sendRole : 'guest'}}"
                  flat
                  slot="activator"
                  color="info"
                >
                  <v-icon small left>expand_more</v-icon>
                  <span>글 작성자 정보 상세보기</span>
                </v-btn>
                <v-divider></v-divider>
              </v-layout>
            </v-layout>
            <v-flex>
              <div>원하는 능력</div>
              <v-layout row wrap>
                <v-flex v-if="preferAbility.includes('cook')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="요리를 잘해요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="요리를 잘해요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('beauty')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="미용을 잘해요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="미용을 잘해요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('baby')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="애를 잘돌봐요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="애를 잘돌봐요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('clean')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="청소를 잘해요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="청소를 잘해요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('drive')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="운전을 잘해요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="운전을 잘해요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('paper')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="도배를 잘해요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="도배를 잘해요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('carry')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="짐나르는거 잘해요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="짐나르는거 잘해요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('sing')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="노래를 잘해요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="노래를 잘해요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('talk')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="말동무를 잘해요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="말동무를 잘해요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('comp')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="컴퓨터를 잘다뤄요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="컴퓨터를 잘다뤄요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('machine')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="농기계를 잘다뤄요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="농기계를 잘다뤄요" xs6 sm3 md2></v-checkbox>
                </v-flex>
                <v-flex v-if="preferAbility.includes('farm')" xs6 sm3 md2>
                  <v-checkbox input-value="true" value disabled hide-details label="농사경험이 있어요"></v-checkbox>
                </v-flex>
                <v-flex v-else xs6 sm3 md2>
                  <v-checkbox value disabled hide-details label="농사경험이 있어요" xs6 sm3 md2></v-checkbox>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex></v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import { setTimeout } from "timers";
import { constants } from "crypto";
export default {
  name: "mymap",
  data() {
    return {
      lat: 38.517235,
      lng: 127.047325,
      dialog: true,
      // userName: localStorage.username,
      userName: "test",
      name: "default",
      profileImg: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      password: "",
      gender: "man",
      age: "22",
      ability: "can do anything",
      phone: "01011112222",
      email: "chchch@gggg",
      reference: "",
      work: "dfdf",
      address: "dfdf",
      location: "zzzz",
      role: "",
      // abilities:["요리를 잘해요","미용을 잘해요","애를 잘돌봐요","청소를 잘해요","운전을 잘해요","도배를 잘해요","짐나르는거 잘해요",
      // "노래를 잘해요","말동무를 잘해요","컴퓨터를 잘다뤄요","농기계를 잘다뤄요","농사경험이 있어요"],
      preferAbility: [
        "요리를 잘해요",
        "운전을 잘해요",
        "컴퓨터를 잘다뤄요",
        "농사경험이 있어요"
      ],
      star: 3,
      user: ""
    };
  },
  props: ["boardId"],

  
  mounted() {
    this.role = localStorage.role;
    this.getInfo();
    this.renderMap();
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 8,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });

      var marker = new google.maps.Marker({
        position: { lat: Number(localStorage.lat), lng: Number(localStorage.lng) },
        map: map
      });
    },
    getInfo() {
      // localStorage.role == 0 이면 guest && 1이면 host
      let userId = localStorage.username;
      let getBoardId = this.boardId;
      // console.log("로컬 스토리지 역할 정보 : "+localStorage.role);
      // HostBoard를 가져올 예정
      if (localStorage.role === "0") {
        this.axios
          .get(
            `http://ec2-15-164-103-237.ap-northeast-2.compute.amazonaws.com:3000/hostBoard/getBoard/${getBoardId}`
          )
          .then(response => {
            console.log(response.data[0]);
            let userData = response.data[0];
            this.user = response.data[0];
            this.profileImg = userData.Info.profileImg;
            this.userName = userData.Info.userName;
            this.name = userData.Info.name;
            this.age = userData.Info.age;
            this.work = userData.Info.work;
            this.address = userData.Info.address;
            this.location = userData.location;
            this.phone = userData.phone;
            this.email = userData.Info.email;
            this.reference = userData.reference;
            this.lat = userData.Info.latitude;
            this.lng = userData.Info.longitude;
            // let temp =
            this.preferAbility = userData.preferAbility;
            console.log("user info" + userData.Info.latitude);
            console.log("ability legnth : " + this.preferAbility.length);
          });
      }
    }
  }
};
</script>

<style>
.map {
  width: 96.86%;
  height: 50%;
  position: fixed;
}
.google-map {
  width: 100%;
  height: 100%;
  margin: 0;
  background-attachment: #fff;
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.box1 {
  height: 350px;
}
</style>

