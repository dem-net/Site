<template>
  <section v-if="availableProviders">
    <div class="field has-text-left">
      <div class="block is-size-6">
        <b-field label="Imagery Provider">
            <b-select placeholder="Select a provider" v-model="selectedProvider"
            @input="$emit('providerSelected',selectedProvider)">
                <option
                    v-for="(p, index) in availableProviders"
                    :value="p.name"
                    :key="index">
                    {{ p.name }}
                </option>
            </b-select>
        </b-field>
         <span class="is-size-7">
           {{ providerDesc }}
         </span>
      </div>
      <div class="field has-text-left">
        <span class="is-size-7">
         </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    provider: {type: String, default: null}
  },
  computed: {
      availableProviders() {
          return this.$store.state.imagery.providers;
      },
      providerDesc() {
        return this.$store.state.imagery.providers.find(d => d.name == this.selectedProvider).attribution.text;
      },
      curProvider() {
        return this.provider;
      }
  },
  data() {
    return {
      selectedProvider: this.provider
    }
  },
  methods: {
      loadProviders() {
          this.$store.dispatch("imagery/getProviders");
      }
  }
};
</script>