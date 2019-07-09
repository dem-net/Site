<template>
<section class="section">
  <h1 class="title">Single point elevation</h1>  
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Point elevation: place a marker on the map to get its elevation info.</p>
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
            <section>
              <b-message title="How to" type="is-info" aria-close-label="Close message">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
              </b-message>
            </section>
              <section>
              <p>{{ this.marker }}</p>
              <ElevationResult :elevation="this.markerLocationResult"></ElevationResult>
              </section>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</section>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import leafletdraw from "leaflet-draw";
import ElevationResult from '@/components/ElevationResult.vue';

export default {
  name: 'MapPoint',
  components: { LMap, LTileLayer, LMarker, ElevationResult },
  
  mounted() {
      this.$nextTick(() => {
          //var localM = this.$refs.map.mapObject;//.L.latLng(47.41322, 1.219482);
      })
    
  },
  methods: {
    mapClick(e) {
        this.$store.commit('setSinglePointLocation', e.latlng);
        this.marker = e.latlng;
        this.$store.dispatch('getSinglePointElevation', e.latlng);
    },
    markerMoved(e) {
      this.marker = e.latlng;
    },    
    markerMovedEnd() {
      this.$store.commit('setSinglePointLocation', this.marker);
      this.$store.dispatch('getSinglePointElevation', this.marker);
    }
  },
  computed: {
    markerLocation() {
      return this.$store.state.singlePointLocation;
    },
    markerLocationResult() {
      return this.$store.state.singlePointLocationElevationResult;
    }
  },
  data() {
    return {
      zoom: 10,
      center: L.latLng(47.41322, 1.219482),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: null,
      isActive: true
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