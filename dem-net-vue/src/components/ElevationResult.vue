<template>
  <section>
    <div v-if="elevation">
      <p>{{ this.elevation }}</p>
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Elevation</p>
            <p class="title">{{ pointElevation }} m</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Dataset</p>
            <p class="title">SRTM_GL3</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Followers</p>
            <p class="title">456K</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Likes</p>
            <p class="title">789</p>
          </div>
        </div>
      </nav>
    </div>
    <div v-else>
      test
    </div>
  </section>
</template>


<script>
export default {
  name: "ElevationResult",
  props: ["elevation"],
  computed: {
    pointElevation() {
      return this.elevation.data.geoPoints[0].elevation.toFixed(2);
    }
  }
};
</script>
