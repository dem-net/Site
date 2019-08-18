<template>
  <div class="playground">
    
    <div class="container is-fluild">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Draw a rectangle and visualize the terrain in 3D.</p>
      </header>
      <div class="card-content">  
        <div class="content">
          <section>
            <b-notification v-show="demErrors"
                    type="is-warning"
                    has-icon
                    icon-pack="fas"
                    aria-close-label="Close notification"
                    role="alert">
                    An error occured while generating the model :
              {{ demErrors }}
                </b-notification>
            <div class="columns">
              <div class="column">
                <MapRectangle @bboxSelected="generateModel"></MapRectangle>
              </div>
              <div class="column">
                <div class="columns">
                  <div class="column">
                    <DatasetSelector :dataSet="this.requestParams.dataSet" @datasetSelected="onDatasetSelected"/>
                  </div>
                  <!-- Export format -->
                  <div class="column">
                    <label class="label">Model output format</label>
                    <b-field>
                      <b-radio-button v-model="requestParams.format" native-value="glTF">glTF</b-radio-button>
                      <b-radio-button v-model="requestParams.format" native-value="STL">STL</b-radio-button>
                      </b-field>
                  </div>
                  <!-- Texture -->
                  <div class="column" v-show="showTextureOptions">
                    <b-field label="Use imagery texture">
                        <b-switch v-model="requestParams.textured">
                            {{ requestParams.textured }}
                        </b-switch>
                    </b-field>
                    <ImagerySelector v-show="showTextureOptionsProvider" :provider="requestParams.imageryProvider" @providerSelected="onProviderSelected"/>
                  </div>
                  <!-- rotate -->
                  <div class="column">
                    <b-field label="Rotate model">
                        <b-switch v-model="enableRotation">
                            {{ enableRotation }}
                        </b-switch>
                    </b-field>
                  </div>
                </div>
              </div>
            </div>
              <b-button @click="upload" :disabled="!gpxFile">Generate 3D model</b-button>
              <div class="glbcontent">
                <!-- <model-gltf :content="glbFile"></model-gltf> -->
                <model-gltf
              background-color="#f0f0ff" :src="glbFile" v-if="glbFile && this.requestParams.format == 'glTF'" :rotation="rotation" @on-load="onLoad"></model-gltf>
              <model-stl
              background-color="#f0f0ff" :src="glbFile" v-if="glbFile && this.requestParams.format == 'STL'" :rotation="rotation" @on-load="onLoad"></model-stl>
              </div>
            
          </section>
        </div>
      </div>
    </div>
    <section>
      
    </section>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ModelGltf,ModelStl } from 'vue-3d-model'
import DatasetSelector from '../components/DatasetSelector'
import ImagerySelector from '../components/ImagerySelector'
import MapRectangle from '../components/MapRectangle'

export default {
  name: 'Playground3DBbox',
  components: { ModelGltf,ModelStl,MapRectangle,DatasetSelector,ImagerySelector },
  data() {
    return {
        gpxFile: null,
        glbFile: null,
        demErrors: null,
        rotation: {
                x: 0,
                y: 0,
                z: 0,
            },
        enableRotation: true,
        requestParams: {
          dataSet: "SRTM_GL3",
          textured: true,
          imageryProvider: "Esri.WorldImagery",
          minTilesPerImage: 4,
          format: "glTF"
        }
    }
  },
  computed: {
    showTextureOptions() {
      return (this.requestParams.format == "glTF");
    },
    showTextureOptionsProvider() {
      return (this.requestParams.format == "glTF" && this.requestParams.textured);
    }
  },
  methods: 
  {
    onLoad () {
        this.rotate();
    },
    rotate () {
      if (this.enableRotation) {
        this.rotation.y += 0.002;
        }
        requestAnimationFrame( this.rotate );
    },
    onDatasetSelected(dstName) {
      this.requestParams.dataSet = dstName;
    },
    onProviderSelected(providerName) {
      this.requestParams.imageryProvider = providerName;
    },
    generateModel(bbox) {
      alert('generateModel '+bbox);
    },
    upload(){
      let formData = new FormData();
      formData.append('file', this.gpxFile);
      axios.post("/api/elevation/gpx/3d?dataset=" + this.requestParams.dataSet 
                                    + "&generateTIN=false"
                                    + "&textured=" + this.requestParams.textured
                                    + "&imageryProvider=" + this.requestParams.imageryProvider 
                                    + "&minTilesPerImage=" + this.requestParams.minTilesPerImage
                                    + "&format=" + this.requestParams.format,
      //axios.post("/api/elevation/gpx/glb?dataset=AW3D30&generateTIN=false&textured=true",
      formData,
      {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      ).then(result => {
          this.glbFile = 'https://localhost:5001' + result.data;
          //this.glbFile = 'https://elevation.azurewebsites.net' + result.data;
          
      })
      .catch(err=> this.demErrors = err.response.data)
          }
  }
} 
</script>

<style scoped>
.glbcontent {
    height: 100%;
    width: 100%;
}
</style>
