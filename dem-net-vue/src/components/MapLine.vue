<template>
<section>          
    <div class="columns">
      <div class="column">
      <div style="width: 100%;height: 100%; background-color:#eee; position:relative;">
        <l-map ref="map" id="map" :zoom="zoom"
        :center="center"
        :options='{ zoomControl: true }'>
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        </l-map>
      </div>
  </div>
    <!-- Dataset selection and results -->
      <div class="column">
        <section class="is-large">
          test {{ geojson }}
          <!-- <DatasetSelector :dataSet="this.dataSet" @datasetSelected="onDatasetSelected"/>    -->
        </section>
        <div class="box">
        <section class="is-large">
          <!-- <ElevationResult :elevation="this.markerLocationResult"></ElevationResult> -->
        </section>
        </div>
      </div>
  </div>
    </section>
</template>


<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import 'leaflet-draw';

export default {
  name: 'MapLine',
  components: {
    LMap, LTileLayer
  },

  mounted() {
    this.$nextTick(() => {
      const map = this.$refs.map.mapObject;
      this.editableLayers = new window.L.FeatureGroup().addTo(map);

      this.drawControl = new window.L.Control.Draw({
        draw: {
          polyline: true,
          polygon: false,
          rectangle: false,
          circle: false,
          marker: false
        },
        edit: {
             featureGroup: this.editableLayers
         }
      });

      map.addControl(this.drawControl);

      map.on(window.L.Draw.Event.CREATED, (e) => {
        
        // hack from https://github.com/Leaflet/Leaflet.draw/issues/869 to enable editing
        const layer = e.layer;
        layer.options.editing = { };
        layer.editing.enable();

        const coords = layer._latlngs.map(c => [c.lng, c.lat] );
        this.newLine.geometry.coordinates.push(coords);
        this.editableLayers.addLayer(layer);
        this.layers.push(layer);
      });

      map.on(window.L.Draw.Event.EDITED, (e) => {
        var layers = e.layers;
        const nLine = this.newLine;
         layers.eachLayer(function (layer) {
             const coords = layer._latlngs.map(c => [c.lng, c.lat] );
             nLine.geometry.coordinates = coords;
             
         });
        // const coords = layer._latlngs.map(c => [c.lng, c.lat] );
        //this.newLine.geometry.coordinates = coords;
      });

    });
  },

  data(){
    return {
      zoom: 6,
      editableLayers: null,
      drawControl: null,
      layers: [],
      newLine: {
        geometry: {
          type: 'MultiLineString',
          coordinates: []
        }
      },
      center: [45.75583, 3.61778],
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      //url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    };
  },

  computed: {
    geojson(){ return this.newLine; }
  },

  methods: {
   
  },
};

</script>

<style scoped>

#map {
  width: 100%;
  height: 500px;
  margin: 0;
}
</style>