<template>
<section>          
      <div style="width: 100%;height: 100%; background-color:#eee; position:relative;">
        <l-map ref="map" id="map" :zoom="zoom"
            :center="center"
            :options='{ zoomControl: true }'>
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        </l-map>
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
          polyline: false,
          polygon: false,
          rectangle: true,
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

        this.setBbox(layer._bounds._northEast, layer._bounds._southWest);
        
        this.editableLayers.addLayer(layer);
        this.layers.push(layer);

      });

      map.on(window.L.Draw.Event.EDITED, (e) => {
        var layers = e.layers;
        var bounds = null;
         layers.eachLayer(function (layer) {
            bounds = layer._bounds;
            alert('layer');
         });

        if (bounds != null){
         this.setBbox(bounds._northEast, bounds._southWest);
         }
        
      });

    });
  },

  data(){
    return {
      zoom: 6,
      editableLayers: null,
      drawControl: null,
      layers: [],
      center: [45.75583, 3.61778],
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      // url: 'https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png',
      // attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    };
  },
  methods: {
   setBbox(ne,sw) {
     this.$emit("bboxSelected",sw.lng+','+ne.lng+','+sw.lat+','+ne.lat);
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