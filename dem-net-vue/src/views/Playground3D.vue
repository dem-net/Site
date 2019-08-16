<template>
  <div class="playground">
    
    <div class="container is-fluild">
    <h1 class="title">3D terrain generation</h1>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Upload a GPX file and vizualise the 3D model.</p>
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
            <b-field class="file">
                <b-upload v-model="gpxFile">
                    <a class="button is-primary">
                        <b-icon icon="upload"></b-icon>
                        <span>Choose your GPX...</span>
                    </a>
                </b-upload>
                <span class="file-name" v-if="gpxFile">
                    {{ gpxFile.name }}
                </span>
            </b-field>
            <div class="columns">
              <div class="column">
                <DatasetSelector :dataSet="this.dataSet" @datasetSelected="onDatasetSelected"/>
              </div>
              <div class="column">
                  <ImagerySelector :provider="this.imageryProvider" @providerSelected="onProviderSelected"/>
              </div>
              <div class="column">
                <b-field label="Rotate model">
                    <b-switch v-model="enableRotation">
                        {{ enableRotation }}
                    </b-switch>
                </b-field>
              </div>
            </div>
            <b-button @click="upload" :disabled="!gpxFile">Generate 3D model</b-button>
            <div class="glbcontent">
              <!-- <model-gltf :content="glbFile"></model-gltf> -->
              <model-gltf
            background-color="#f0f0ff" :src="glbFile" v-if="glbFile" :rotation="rotation" @on-load="onLoad"></model-gltf>
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
import { ModelGltf } from 'vue-3d-model'
import DatasetSelector from '../components/DatasetSelector'
import ImagerySelector from '../components/ImagerySelector'

export default {
  name: 'Playground3D',
  components: { ModelGltf,DatasetSelector,ImagerySelector },
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
        dataSet: "SRTM_GL3",
        imageryProvider: "Esri.WorldImagery",
        enableRotation: true,
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
      this.dataSet = dstName;
    },
    onProviderSelected(providerName) {
      this.imageryProvider = providerName;
    },
    upload(){
      let formData = new FormData();
      formData.append('file', this.gpxFile);
      axios.post("/api/elevation/gpx/glb?dataset=" + this.dataSet + "&generateTIN=false&textured=true&imageryProvider=" + this.imageryProvider + '&minTilesPerImage=4',
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
