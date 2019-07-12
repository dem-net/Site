<template>
    <section>
    <div v-if="elevation">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Highest</p>
            <p class="title">{{ elevationData.metrics.maxElevation.toFixed(0) }} m</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Lowest</p>
            <p class="title">{{ elevationData.metrics.minElevation.toFixed(0) }} m</p>
          </div>
        </div
        ><div class="level-item has-text-centered">
          <div>
            <p class="heading">Climb</p>
             <p class="title">{{ elevationData.metrics.climb.toFixed(0) }} m</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Descent</p>
             <p class="title">{{ elevationData.metrics.descent.toFixed(0) }} m</p>
          </div>
        </div>
      </nav>
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Dataset</p>
            <p class="title">{{ dataSet.name }}</p>
          </div>
        </div>
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
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Points before reduction</p>
            <p class="title">{{ elevationData.metrics.numPoints }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Points after reduction</p>
            <p class="title">{{ elevationData.resultCount }}</p>
          </div>
        </div>
      </nav>
      <div>
          Test
          <ElevationChart 
            v-if="loaded"
            :chartdata="chartdata"
            :options="options" />
      </div>
    </div>
    <div v-else>
      No results. First, click on the map to add a marker on the desired location to get its elevation.
    </div>
  </section>
</template>

<script>
import ElevationChart from './ElevationChart.vue'

    export default {
        name: "LineElevationResult",
        components: { ElevationChart },
        props: ["elevation"],
        computed: {
            elevationData() {
                return this.elevation.data;
            },
            dataSet() {
                return this.elevation.data.dataSet;
            }
        },
        data() {
            return {
                loaded: false,
                chartdata: null
            }
        },
        async mounted () {
            this.loaded = false;
            this.chartdata = this.elevation.data.geoPoints.map(
                pt => [ pt.distanceFromOriginMeters, pt.elevation ] );
            this.loaded = true;
        }
    }
</script>
