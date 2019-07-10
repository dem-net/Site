<template>
  <div class="playground">
    <div class="container is-fluild">
    <h1 class="title">Line elevation</h1>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Draw a line on the map to get its elevation info.</p>
      </header>
      <div class="card-content">
        <div class="content">
          <MapLine></MapLine>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import MapLine from '@/components/MapLine.vue'

export default {
  name: 'playgroundLine',
  components: { MapLine }
}
</script>

<style scoped>
</style>
