<template>
    <div>
    <div id="map" ref="map"></div>
      <div id="elevation-div" class="leaflet-control elevation"></div>

      <div id="gpx-summary" class="gpx-summary">
        <span class="totlen">
          <span class="summarylabel">Total Length: </span>
          <span class="summaryvalue">0</span>
        </span>
        &mdash;
        <span class="maxele"
          ><span class="summarylabel">Max Elevation: </span
          ><span class="summaryvalue">0</span></span
        >
        &mdash;
        <span class="minele"
          ><span class="summarylabel">Min Elevation: </span
          ><span class="summaryvalue">0</span></span
        >
      </div>
    </div>
</template>

<script>
    export default {
        name: 'mapd3Elevation',
        components: { 
        },
        props: {
            geoJson: {type: Object, default: null}
        },
        watch: {
            // à chaque fois que la question change, cette fonction s'exécutera
            geoJson: function (newData) {
                var controlElevation = window.L.control.elevation(this.elevationControlOptions);
                
            controlElevation.loadData(newData);
            }
        },
        methods: {
          
        },
        mounted() {
          this.$nextTick(() => {
                //const map = this.$refs.map.mapObject;
                //var map1 = new window.L.Map("map", opts.map);

                var map = new window.L.Map("map", opts.map);

      var baseLayers = {};
      baseLayers.OTM = new window.L.TileLayer(
        opts.otmLayer.url,
        opts.otmLayer.options
      );

      var controlZoom = new window.L.Control.Zoom(opts.zoomControl);
      var controlElevation = window.L.control.elevation(opts.elevationControl.options);
      var controlLayer = window.L.control.layers(
        baseLayers,
        null,
        opts.layersControl.options
      );

      controlZoom.addTo(map);
      controlLayer.addTo(map);

      controlElevation.loadChart(map);
      controlElevation.loadData(opts.elevationControl.url);

      map.addLayer(baseLayers.OTM);

    //   map.on("eledata_loaded", function(e) {
    //     var q = document.querySelector.bind(document);
    //     var track = e.track_info;

    //     controlLayer.addOverlay(e.layer, e.name);

    //     q(".totlen .summaryvalue").innerHTML =
    //       track.distance.toFixed(2) + " km";
    //     q(".maxele .summaryvalue").innerHTML =
    //       track.elevation_max.toFixed(2) + " m";
    //     q(".minele .summaryvalue").innerHTML =
    //       track.elevation_min.toFixed(2) + " m";
    //   });
          })
        }
    }

    var opts = {
        map: {
          center: [41.4583, 12.7059],
          zoom: 5,
          markerZoomAnimation: false,
          zoomControl: false
        },
        zoomControl: {
          position: "topleft"
        },
        otmLayer: {
          url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
          options: {
            attribution:
              'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            /*subdomains:"1234"*/
          }
        },
        elevationControl: {
          url: "",
          options: {
            theme: "lime-theme", //default: lime-theme
            useHeightIndicator: true, //if false a marker is drawn at map position
            interpolation: d3.curveLinear, //see https://github.com/d3/d3/wiki/
            collapsed: false, //collapsed mode, show chart on click or mouseover
            elevationDiv: "#elevation-div",
            detachedView: true
          }
        },
        layersControl: {
          options: {
            collapsed: false
          }
        }
      };

      
</script>

<style scoped>
   
    #map {
      height: 75%;
    } 

    #elevation-div {
      height: 100px;
      width: 300px;
      font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
    }

    .height-focus.line,
    .height-focus-label {
      display: none;
    }

    .height-focus.circle-lower {
      stroke: white;
      fill: black;
      /*background: url(https://maps.google.com/mapfiles/kml/pal4/icon25.png);*/
      stroke-width: 3px;
      -webkit-filter: drop-shadow(0 0 5px #000);
      filter: drop-shadow(0 0 5px #000);
    }
    .gpx-summary {
      font-family: "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif;
      font-size: 12px;
      position: absolute;
      bottom: 0;
      left: 45px;
    }

    .gpx-summary .summaryvalue {
      font-weight: bold;
    }
</style>