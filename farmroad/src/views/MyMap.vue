<template>
  <div class="map">
    <div class="google-map" id="map"></div><br>
      <v-flex xs5 sm4 md4>
        <v-card class="grey--text">
          <v-layout>
           <v-flex xs5>
            <v-img
            v-if="profileImg" :src="profileImg" alt="Avatar"
            height="150px"
            contain
            ></v-img>
            <v-icon v-else >person</v-icon>
          </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                <div class="grey--text font-weight-bold">유저 아이디</div>
                <div  v-if="role === '1'" class="grey--text font-weight-bold">유저정보</div>
                <div  v-if="role === '0'" class="grey--text font-weight-bold">유저정보</div>
                <div class="grey--text font-weight-bold">이름</div>
                <div class="grey--text font-weight-bold">성별</div>
                <div class="grey--text font-weight-bold">나이</div>
                <div  v-if="role === '0'" class="grey--text font-weight-bold">능력</div>
                <div class="grey--text font-weight-bold">전화번호</div>
                <div class="grey--text font-weight-bold">이메일</div>
                <div  v-if="role === '1'" class="grey--text font-weight-bold">직업</div>
                <div  v-if="role === '1'" class="grey--text font-weight-bold">지역</div>
                <div class="grey--text font-weight-bold">주소</div>
                <div class="grey--text font-weight-bold">평점</div>
                </div>
              </v-card-title>
            </v-flex>
            </v-layout>
            <v-flex xs12 sm5 md12 d-flex ml-5>
              <v-checkbox v-model="selected" label="요리를 잘해요" value="cook"></v-checkbox>
              <v-checkbox v-model="selected" label="요리를 잘해요" value="cook"></v-checkbox>
              <v-checkbox v-model="selected" label="요리를 잘해요" value="cook"></v-checkbox>
            </v-flex>
            <v-flex d-flex ml-5>
              <v-checkbox v-model="selected" label="요리를 잘해요" value="cook"></v-checkbox>
              <v-checkbox v-model="selected" label="요리를 잘해요" value="cook"></v-checkbox>
              <v-checkbox v-model="selected" label="요리를 잘해요" value="cook"></v-checkbox>
            </v-flex>
              <!-- <v-card-actions class="pa-3">
                Rate this album
                <v-spacer></v-spacer>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
                <v-icon>star_border</v-icon>
              </v-card-actions> -->
              <v-card>
                asdf
              </v-card>
            </v-card>
          </v-flex>
      <v-layout row wrap>
        <v-flex sm2>
          
        </v-flex>
        <v-flex sm2>
        </v-flex>
      </v-layout>
  </div>
</template>
<script>
import firebase from "firebase";
import { setTimeout } from "timers";
export default {
  name: 'mymap',
  data() {
    return {
      lat: 37.517235,
      lng: 127.047325
    };
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
    }
  },
  mounted() {
    this.renderMap();
  }
};
</script>

<style>
.map {
  width: 100%;
  height: 100%;
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
  position:absolute;
}
</style>

