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
          <GpxUpload></GpxUpload>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import GpxUpload from '@/components/GpxUpload.vue'

export default {
  name: 'Playground3DGpx',
  components: { GpxUpload }
}
</script>

<style scoped>
</style>
