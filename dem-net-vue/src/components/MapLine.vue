<template>
<section>          
    <div class="columns">
      <div class="column">
      <div style="width: 100%;height: 100%; background-color:#eee; position:relative;">
        <l-map ref="map" id="map" :zoom="zoom"
        :center="center"
        :options='{ zoomControl: false }'
        attribution='© Проект А'>
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
              <l-geo-json v-for="(gj, idx) in geojson" :geojson="gj.geometry" :key="idx" :options="options(gj)">
          </l-geo-json>
        </l-map>
      </div>
  </div>
    <!-- Dataset selection and results -->
      <div class="column">
        <section class="is-large">
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
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
import 'leaflet-draw';

export default {
  name: 'MapLine',
  components: {
    LMap, LTileLayer, LGeoJson
  },

  mounted() {
    this.$nextTick(() => {
      const map = this.$refs.map.mapObject;

      this.drawControl = new window.L.Control.Draw({
        position: 'topright',
        draw: {
          polyline: {
            allowIntersection: false,
            showArea: true
          },
          polygon: false,
          rectangle: false,
          circle: false
        }
      });

      window.L.DrawToolbar.include({
        getModeHandlers(_map) {
          return [
            {
              enabled: true,
              handler: new window.L.Draw.Polyline(_map),
              title: 'Добавить тоннель'
            }
          ];
        }
      });

      this.drawControl.setDrawingOptions({ // new lines will have different color
        polyline: {
          shapeOptions: {
            color: '#ff0a1e'
          }
        }
      });

      map.addControl(this.drawControl);

      this.editableLayers = new window.L.FeatureGroup().addTo(map);
      const control = this.drawControl._container.querySelector('.leaflet-draw-toolbar');

      /* Commit drawn line */
      let link = document.createElement('a');
      link.className = 'leaflet-draw-draw-OK_ICON';
      link.style.display = 'none';
      link.onclick = () => {
        this.$store.dispatch('lineEdit', this.newLine);
        this.$emit('lineAdd');
      };
      this.okBtn = control.appendChild(link);

      /* Remove drawn line */
      link = document.createElement('a');
      link.className = 'leaflet-draw-draw-NOK_ICON';
      link.style.display = 'none';
      link.onclick = () => {
        this.okBtn.style.display = 'none';
        this.nokBtn.style.display = 'none';
        this.layers.forEach(l => this.editableLayers.removeLayer(l));
        this.newLine = {
          geometry: {
            coordinates: []
          }
        };
      };
      this.nokBtn = control.appendChild(link);

      map.on(window.L.Draw.Event.CREATED, (e) => {
        const layer = e.layer;
        const coords = layer._latlngs.map(objCoordinates => [objCoordinates.lng, objCoordinates.lat] );

        this.newLine.geometry.coordinates.push(coords);
        this.newLine.categoryDate = 0;
        this.editableLayers.addLayer(layer);
        this.layers.push(layer);
        this.okBtn.style.display = 'block';
        this.nokBtn.style.display = 'block';
      });
    });
  },

  data(){
    return {
      zoom: 6,
      editableLayers: null,
      drawControl: null,
      layers: [],
      okBtn: null,
      cancelBtn: null,
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
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      marker: window.L.latLng(47.413220, -1.219482),
      popupRoot: null,
      line: null,
      tName: 0
    };
  },

  computed: {
    geojson(){ return null; }
  },

  methods: {
    onEachFeatureFunction(line) {
      alert(line);
      // return (feature, layer) => {
      //   const popup = this.renderPopup(line);
      //   layer.bindTooltip('<div style="font-weight:bold;">'+ line.name + '</div>', { permanent: false, sticky: true });
      //   layer.bindPopup(
      //     popup,
      //   { permanent: false, sticky: true });
      // };
    },

    options(line) {
      return {
        onEachFeature: this.onEachFeatureFunction.call(this, line)
      };
    },
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
<style lang="scss">
  $fontSize: 14px;

  .leaflet-popup-content{
    #leafroot-id{
      position: relative;

      .popup-img{
        height: 150px;
        width: 300px;
      }

      .popup-text{
        font-size: $fontSize;
        &.length{
          margin-bottom: 20px;
        }
      }

      .notice-btn{
        width: 155px;
      }
    }
  }

  .leaflet-draw-draw-OK_ICON{
    background-image: url("../assets/ok-btn.png") !important;
    background-size: 25px auto !important;
  }

  .leaflet-draw-draw-NOK_ICON{
    background-image: url("../assets/nok-btn.png") !important;
    background-size: 25px auto !important;

  }

</style>