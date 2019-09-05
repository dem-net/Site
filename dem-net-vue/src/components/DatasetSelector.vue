<template>
  <section v-if="availableDatasets">
    <div class="field has-text-left">
      <label class="label">Digital Elevation Model</label>
      <div>
          <section v-for="(dst, index) in availableDatasets" :key="index">
        <div  class="field">
        <b-radio v-model="selectedDataset" :native-value="dst.name" @input="$emit('datasetSelected',selectedDataset)">{{ dst.name }}</b-radio>
        </div>
          </section>
         <span class="is-size-7">
           {{ dataSetDesc }}
         </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    dataSet: {type: String, default: null}
  },
  computed: {
      availableDatasets() {
          return this.$store.state.datasets.dataSets;
      },
      dataSetDesc() {
        return this.$store.state.datasets.dataSets.find(d => d.name == this.selectedDataset).description;
      }
  },
  data() {
    return {
      selectedDataset: this.dataSet
    }
  },
  methods: {
      loadDatasets() {
          this.$store.dispatch("datasets/getDatasets");
      }
  }
};
</script>