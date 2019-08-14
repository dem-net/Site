<template>
  <div class="playground">
    
    <div class="container is-fluild">
    <h1 class="title">3D Terrain viewer</h1>
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
                    Application cannot connect to back-end server. Please try again later.
              {{ demErrors }}
                </b-notification>
            <b-field class="file">
                <b-upload v-model="gpxFile">
                    <a class="button is-primary">
                        <b-icon icon="upload"></b-icon>
                        <span>Click to upload</span>
                    </a>
                </b-upload>
                <span class="file-name" v-if="gpxFile">
                    {{ gpxFile.name }}
                </span>
            </b-field>
            
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

export default {
  name: 'Playground3D',
  components: { ModelGltf },
  data() {
    return {
        gpxFile: null,
        glbFile: null,
        demErrors: null,
        rotation: {
                x: 0,
                y: 0,
                z: 0,
            }
    }
  },
  methods: 
  {
    onLoad () {
        this.rotate();
    },
    rotate () {
        this.rotation.y += 0.005;
        requestAnimationFrame( this.rotate );
    },
    upload(){
      let formData = new FormData();
      formData.append('file', this.gpxFile);
      //axios.post("/api/elevation/gpx/glb?dataset=SRTM_GL3&generateTIN=false&textured=false",
      axios.post("/api/elevation/gpx/glb?dataset=AW3D30&generateTIN=false&textured=true",
      formData,
      {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      ).then(result => {
          this.glbFile = 'https://localhost:5001' + result.data;
      })
      .catch(err=> this.demErrors = err)
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
