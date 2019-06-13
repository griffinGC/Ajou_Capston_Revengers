  <template>
  <v-layout row justify-center>
    <v-btn color="primary" dark @click.stop="dialog = true">위치 선택!</v-btn>
    <v-dialog v-model="dialog" fullscreen>
      <v-card>
        <div class="map">
          <h2>지도</h2>
          <div class="google-map" id="map"></div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white darken-1" class="success" flat="flat" @click="dialog = false">취소</v-btn>
          <v-btn color="white darken-1" class="success" flat="flat" @click="saveLocation">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>Cancel

<script>
import firebase from "firebase";
import { setTimeout } from "timers";
export default {
  name: "GMap",
  data() {
    return {
      lat: 37.517235,
      lng: 127.047325,
      dialog: false
    };
  },
  methods: {
    renderMap() {
      var markersArray = [];
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });

      //add click event to marker
      map.addListener("click", function(e) {
        if (markersArray) {
          for (let i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
          }
          markersArray.length = 0;
        }

        var marker = new google.maps.Marker({
          position: e.latLng,
          map: map
        });
        markersArray.push(marker);
        console.log(e.latLng.lng());
        this.lat = e.latLng.lat();
        this.lng = e.latLng.lng();
        localStorage.lat = e.latLng.lat();
        localStorage.lng = e.latLng.lng();
      });
    },
    saveLocation() {
      console.log(localStorage.lat + "local saved location" + localStorage.lng);
      this.dialog = false;
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          this.renderMap();
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      this.renderMap();
    }
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
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
