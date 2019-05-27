<template>
  <div class="map">
    <div class="google-map" id="map"></div>
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
  width: 600px;
  height: 300px;
  position: fixed;
}
.google-map {
  width: 600px;
  height: 300px;
  margin: 0;
  background-attachment: #fff;
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
</style>

