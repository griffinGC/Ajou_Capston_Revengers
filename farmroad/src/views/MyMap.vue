<template>
    <v-card>
  <div class="map">
    <div class="google-map" id="map"></div><br>
  </div>
    <v-layout column wrap>
      <v-flex xs12 sm12 md12>
        asdfasdf
      </v-flex>
    <v-flex xs12 sm12 md12 class="red">
      <v-card height="1000">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="250px"
        >
        </v-img>

        <v-card-title primary-title>
          <v-layout row wrap>
        <v-flex xs5 sm5 offset-xs1 class="grey--text font-weight-bold">유저 아이디</v-flex>
        <!-- <v-flex xs6 sm6>{{candidateData.userName}}</v-flex> -->
        <v-flex xs5 sm5offset-xs1 v-if="role === '1'" class="grey--text font-weight-bold">유저정보</v-flex>
        <!-- <v-flex xs5 sm5 v-if="role === '1'">Host</v-flex> -->
        <v-flex xs5 sm5 offset-xs1 v-if="role === '0'" class="grey--text font-weight-bold">유저정보</v-flex>
        <!-- <v-flex xs6 v-if="role === '0'">Guest</v-flex> -->
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">이름</v-flex>
        <!-- <v-flex xs6>{{candidateData.name}}</v-flex> -->
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">성별</v-flex>
        <!-- <v-flex xs6>{{candidateData.gender}}</v-flex> -->
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">나이</v-flex>
        <!-- <v-flex xs6>{{candidateData.age}}</v-flex> -->
        <v-flex xs5 offset-xs1 v-if="role === '0'" class="grey--text font-weight-bold">능력</v-flex>
        <!-- <v-flex xs6 v-if="role === '0'">{{candidateData.ability}}</v-flex> -->
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">전화번호</v-flex>
        <!-- <v-flex xs6>{{candidateData.phone}}</v-flex> -->
        <v-flex xs5 offset-xs1 v-if="role === '1'" class="grey--text font-weight-bold">직업</v-flex>
        <!-- <v-flex xs6 v-if="role === '1'">{{candidateData.work}}</v-flex> -->
        <v-flex xs5 offset-xs1 v-if="role === '1'" class="grey--text font-weight-bold">지역</v-flex>
        <!-- <v-flex xs6 v-if="role === '1'">{{candidateData.location}}</v-flex> -->
        <v-flex xs5 offset-xs1 class="grey--text font-weight-bold">주소</v-flex>
        <!-- <v-flex xs6>{{candidateData.address}}</v-flex> -->
        <v-flex xs6></v-flex>
        </v-layout>
        
        </v-card-title>

        <!-- <v-card-actions>
          <v-btn flat>Share</v-btn>
          <v-btn flat color="purple">Explore</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions> -->

        <v-slide-y-transition>
          <v-card-text v-show="show">
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
    </v-layout>
    </v-card>
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
  width: 50%;
  height: 70%;
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

