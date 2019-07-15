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
          <DatasetSelector :dataSet="this.dataSet" @datasetSelected="onDatasetSelected"/>
          <b-field>
                <b-numberinput v-model="reduce" min="0" max="1000" step="10" @input="setReduce"></b-numberinput>
            </b-field>
 
        </section>
        <div class="box">
        <section class="is-large">
          <LineElevationResult :elevation="this.elevationResult"></LineElevationResult>
        </section>
        </div>
      </div>
  </div>
    </section>
</template>


<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import 'leaflet-draw';
import DatasetSelector from "@/components/DatasetSelector.vue";
import LineElevationResult from "@/components/LineElevationResult.vue";

export default {
  name: 'MapLine',
  components: {
    LMap, LTileLayer, DatasetSelector, LineElevationResult
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
        this.newLine.geometry.coordinates = coords;
        
        this.editableLayers.addLayer(layer);
        this.layers.push(layer);


        var payload = { geoJson: this.newLine, dataset: this.$data.dataSet, reduce: this.$data.reduce };
        //this.$store.commit('lines/setLine', payload);
        this.$store.dispatch('lines/getLineElevation', payload); 
      });

      map.on(window.L.Draw.Event.EDITED, (e) => {
        var layers = e.layers;
        const nLine = this.newLine;
        const dataSet = this.$data.dataSet;
        var payload = null;
         layers.eachLayer(function (layer) {
             const coords = layer._latlngs.map(c => [c.lng, c.lat] );
             nLine.geometry.coordinates = coords;
             
            payload = { geoJson: nLine, dataset: dataSet };
         });
        
         payload = { geoJson: nLine, dataset: dataSet, reduce: this.$data.reduce };
         //this.$store.commit('lines/setLine', nLine);
         this.$store.dispatch('lines/getLineElevation', payload); 
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
          type: 'LineString',
          coordinates: []
        }
      },
      dataSet: "SRTM_GL3",
      center: [45.75583, 3.61778],
      reduce: 50,
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      // url: 'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png',
      // attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    };
  },

  computed: {
    geojson(){ 
      return this.newLine; 
      },
    hasCoords(){
      return this.newLine.geometry.coordinates.length>0;
    },
    selectedDataSet: function() {
      return this.dataSet;
    },
    elevationResult() {
      return this.$store.state.lines.lineElevationResult;
    },
  },

  methods: {
   onDatasetSelected(dstName) {
      this.dataSet = dstName;
      if (this.hasCoords)
      {
        var payload = { geoJson: this.newLine, dataset: this.dataSet, reduce: this.reduce };
          this.$store.dispatch('lines/getLineElevation', payload); 
      }
    },
   setReduce(value){
     if (this.hasCoords)
     {
       var payload = { geoJson: this.newLine, dataset: this.dataSet, reduce: value };
        this.$store.dispatch('lines/getLineElevation', payload); 
     }
   }
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