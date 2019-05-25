<template>
  <div class="map">
    <h2>Map</h2>
    <div class="google-map" id="map"></div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "GMap",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },
  created() {
    let ckeditor = document.createElement("script");
    ckeditor.setAttribute("src", "");
    document.head.appendChild(ckeditor);
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
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
.google-map {
  width: 100%;
  height: 100%;
  margin: 0;
  background-attachment: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>

