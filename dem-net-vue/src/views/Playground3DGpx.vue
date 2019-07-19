<template>
  <div class="playground">
    <div class="container is-fluild">
    <h1 class="title">GPX elevation and 3D viewer</h1>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Upload a GPX file to get its elevation info.</p>
      </header>
      <div class="card-content">
        <div class="content">
          <GpxUpload @gpxElevationReceived="handleElevation"></GpxUpload>
       
          <MapD3Elevation/>
          
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import GpxUpload from '@/components/GpxUpload.vue'
import MapD3Elevation from '@/components/MapD3Elevation.vue'

export default {
  name: 'Playground3DGpx',
  components: { GpxUpload, MapD3Elevation },
  data() {
    return {
      geoJson: null,
    }
  },
  methods: 
  {
    handleElevation(result) {
      this.geoJson = result;
    }
  }
}
</script>

<style scoped>
</style>
