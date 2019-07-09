<template>
  <section v-if="availableDatasets">
    <button @click="loadDatasets">Load</button>
    <div class="field has-text-left">
      <label class="label">Digital Elevation Model</label>
      <div class="block">
        <b-radio v-model="dataSet" native-value="SRTM_GL3">SRTM_GL3</b-radio>
        <b-radio v-model="dataSet" native-value="SRTM_GL1">SRTM_GL1</b-radio>
        <b-radio v-model="dataSet" native-value="AW3D30">AW3D30</b-radio>
      </div>
    </div>
    <p class="content">
        {{ availableDatasets.length }} datasets
      <b>Selection:</b>
      {{ dataSet }}
    </p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dataSet: "SRTM_GL3"
    };
  },
  computed: {
      availableDatasets() {
          return this.$store.state.dataSets;
      }
  },
  methods: {
      loadDatasets() {
          this.$store.dispatch("getDatasets");
      }
  }
};
</script>