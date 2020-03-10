<template>
  <section v-show="this.attributions.length>0" href="#attributions">
      <label class="label">Attributions</label>
      <span class="is-size-7">
        Attribution is NOT optional: please append the following information alongside with the model to credit the contributors.
      </span>
     <b-field>
            <b-radio v-model="shortText"
                size="is-small"
                :native-value=true>
                Short attribution text
            </b-radio>
            <b-radio v-model="shortText"
                size="is-small"
                :native-value=false>
                Full attribution text
            </b-radio>
     </b-field>
     <b-field>
      <b-button @click.stop.prevent="copyTestingCode">
        Copy
      </b-button>
       
     </b-field>
         <b-field>
            <b-input size="is-small" type="textarea" readonly id="attributions-text" :value="this.attributionsText"></b-input>
        </b-field>
  </section>
</template>

<script>
export default {
  props: {
    attributions: {type: Array, default: null},
  },
  computed: {
      shortAttributionsText() {
          return this.attributions.map(function(attr){
              return attr.subject + ": " + attr.text + " - " + attr.url; // + "\n" + attr.acknowledgement;
            }).join("\n");
      }, 
      fullAttributionsText() {
          return this.attributions.map(function(attr){
              return attr.subject + ": " + attr.text + " - " + attr.url + "\n" + attr.acknowledgement;
            }).join("\n --------------- \n");
      },
      attributionsText() {
        return this.shortText ? this.shortAttributionsText : this.fullAttributionsText;
      }
  },
  data() {
    return {
     shortText: true,
    }
  },
   methods: {
        copyTestingCode () {
          let textArea = document.getElementById('attributions-text')
          textArea.select();

          try {
            document.execCommand("copy");
            this.$buefy.toast.open({
                    message: 'Attributions copied in clipboard!',
                    type: 'is-success'
                });
          } catch (err) {
            this.$buefy.toast.open({
                    message: 'Cannot copy attributions !',
                    type: 'is-warning'
                });
          }

          /* unselect the range */
          window.getSelection().removeAllRanges()
        },
    },
};
</script>