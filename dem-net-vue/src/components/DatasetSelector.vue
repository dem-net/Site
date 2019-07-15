<template>
  <section v-if="availableDatasets">
    <div class="field has-text-left">
      <label class="label">Digital Elevation Model</label>
      <div class="block is-size-6">
        <b-field>
        <b-radio-button v-for="(dst, index) in availableDatasets" :key="index" v-model="selectedDataset" :native-value="dst.name" @input="$emit('datasetSelected',selectedDataset)">{{ dst.name }}</b-radio-button>
        </b-field>
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