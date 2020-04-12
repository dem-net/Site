<template>
    <section> 
      <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">SketchFab model export</p>
                </header>
                <section class="modal-card-body">

                    <span>Model ID: {{ this.modelId }}</span>
                    <b-button icon-pack="fas" icon-left="fas fa-export" tag="a" :href="this.sketchFabUrl">
                        Attributions
                      </b-button>
                    <b-field label="Email">
                        <b-input
                            type="email"
                            placeholder="Your email"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input
                            type="password"
                            password-reveal
                            placeholder="Your password"
                            required>
                        </b-input>
                    </b-field>

                    <b-checkbox>Remember me</b-checkbox>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary">Login</button>
                </footer>
            </div>
    </section>
</template>


<script>

export default {
  name: 'SketchFabExport',
  props: {
    modelId: {type: String, default: null}
  },

  mounted() {
    this.sketchFabUrl = "https://sketchfab.com/oauth2/authorize/?state=" + this.modelId + "&response_type=token&client_id=SKa6zTHsHdgbs7RE7oug69QQq9TMDPv8gtqAZUuj";
  },

  data(){
    return {   
        sketchFabUrl: null
    };
  },
  methods: {
   
  },
};

</script>

<style scoped>

</style>