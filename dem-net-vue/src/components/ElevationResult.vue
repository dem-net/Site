<template>
  <section>
    <div v-if="elevation">
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
            <p class="title">{{ dataSet.name }}</p>
          </div>
        </div>
      </nav>
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Resolution</p>
            <p class="title">{{ dataSet.resolutionMeters }} m</p>
          </div>
        </div><div class="level-item has-text-centered">
          <div>
            <p class="heading">Attribution</p>
            <p class="title"><a :href="dataSet.publicUrl">{{ dataSet.attribution.text }}</a></p>
          </div>
        </div>
      </nav>
    </div>
    <div v-else>
      No results. First, click on the map to add a marker on the desired location to get its elevation.
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
    },
    dataSet() {
      return this.elevation.data.dataSet;
    }
  }
};
</script>
