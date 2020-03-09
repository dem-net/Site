<template>
  <section v-show="this.attributions.length>0" href="#attributions">
      <label class="label">Attributions</label>
      <span class="is-size-7">
        Attribution is NOT optional: please append the following information alongside with the model to credit the contributors.
      </span><b-button @click.stop.prevent="copyTestingCode">
              Copy
            </b-button>
      <div>
         <b-field>
            <b-input size="is-small" type="textarea" id="attributions-text" :value="this.attributionsText"></b-input>
        </b-field>
      </div>
  </section>
</template>

<script>
export default {
  props: {
    attributions: {type: Array, default: null}
  },
  computed: {
      attributionsText() {
          return this.attributions.map(function(attr){
              return attr.subject + ": " + attr.text + " / " + attr.url + "\n" + attr.acknowledgement;
            }).join("\n --------------- \n");
      },
  },
  data() {
    return {
      
    }
  },
   methods: {
        copyTestingCode () {
          let textArea = document.getElementById('attributions-text')
          textArea.select();

          try {
            var successful = document.execCommand("copy");
            var msg = successful ? 'successful' : 'unsuccessful';
            alert('Testing code was copied ' + msg);
          } catch (err) {
            alert('Oops, unable to copy');
          }

          /* unselect the range */
          window.getSelection().removeAllRanges()
        },
    },
};
</script>