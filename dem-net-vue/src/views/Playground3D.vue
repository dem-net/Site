<template>
  <div class="playground">
    
    <div class="container is-fluild">
    <h1 class="title">3D Terrain viewer</h1>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Upload a GPX file to get its elevation info.</p>
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
                <b-upload v-model="file">
                    <a class="button is-primary">
                        <b-icon icon="upload"></b-icon>
                        <span>Click to upload</span>
                    </a>
                </b-upload>
                <span class="file-name" v-if="file">
                    {{ file.name }}
                </span>
            </b-field>
            
            <b-button @click="upload" :disabled="!file">Generate report</b-button>
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

import { LMap, LTileLayer } from "vue2-leaflet";

export default {
  name: 'Playground3D',
  data() {
    return {
        file: null,
        demErrors: null
    }
  },
  methods: 
  {
      upload(){
        let formData = new FormData();
        formData.append('file', this.file);
        axios.post("/api/elevation/gpx/geojson?dataset=AW3D30&reduceResolution=0",
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then(result => {
            this.gpxElevation = result.data;
            this.$emit('gpxElevationReceived', result.data);
        })
        .catch(err=> this.demErrors = err)
            }
  }
}
</script>

<style scoped>
</style>
