<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Point elevation test</p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column">
            <l-map ref="map" id="map" :zoom="zoom" :center="center" @click="mapClick">
              <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
              <l-marker v-if="marker" :lat-lng="markerLocation" draggable @drag="markerMoved" @dragend="markerMovedEnd"></l-marker>
            </l-map>
          </div>
          <div class="column">
              <h1>Choose a point</h1>
              <p>{{ this.marker }}</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Save</a>
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import leafletdraw from "leaflet-draw";

export default {
  components: { LMap, LTileLayer, LMarker },
  
  mounted() {
      this.$nextTick(() => {
          //var localM = this.$refs.map.mapObject;//.L.latLng(47.41322, 1.219482);
      })
    
  },
  methods: {
    mapClick(e) {
        //alert("click" + e.latlng.toString());
        this.$store.commit('setSinglePointLocation', e.latlng);
        this.marker = e.latlng;
       // marker: this.$refs.map.mapObject
    },
    markerMoved(e) {
      this.marker = e.latlng;
    },    
    markerMovedEnd() {
      this.$store.commit('setSinglePointLocation', this.marker);
      
    }
  },
  computed: {
    markerLocation() {
      return this.$store.state.singlePointLocation;
    }
  },
  data() {
    return {
      zoom: 10,
      center: L.latLng(47.41322, 1.219482),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: null
    };
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
  margin: 0;
}
</style>