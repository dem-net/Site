<template>
  <div class="playground">
    <div class="container is-fluild">
      <h1 class="title">Single point elevation</h1>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Place a marker on the map to get its elevation info.</p>
        </header>
        <div class="card-content">
          <div class="content">
            <MapPoint></MapPoint>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MapPoint from '@/components/MapPoint.vue'

export default {
  name: 'playgroundPoint',
  components: { MapPoint }
}
</script>

<style scoped>
</style>
