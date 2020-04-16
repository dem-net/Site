<template>
  <div class="playground">
    <!--
        URL http://localhost:8080/sketchfab_oauth2#state=800026cd-0006-fb00-b63f-84710c7967bb&access_token=BvmUKcvWAepkvS1JaFCE0TeiIXACGU&expires_in=2592000&scope=read+write&token_type=Bearer

        Error: http://localhost:8080/sketchfab_oauth2?error=access_denied&state=80000426-0001-ca00-b63f-84710c7967bb
        -->
    <div class="container is-fluild">
      <img src="../assets/sketchfablogo.png"/>
    <h1 class="title">SketchFab export</h1>
    <!-- <h1 class="subtitle">Model description and export options</h1> -->


    <!-- AUTH OK -->
    <div class="card" v-show="this.authSuccess">
      <header class="card-header">
        <p class="card-header-title">Please fill the required information. Elevation API adds attributions automatically.</p>
      </header>
      <div class="card-content">  
        <div class="content">
          

          <div class="columns">
            <div class="column">
             <b-field label="Model name" label-position="inside">
                  <b-input v-model="requestParams.modelName" maxlength=48 placeholder="My super model" required></b-input>
              </b-field>
              
              <b-field label="Description" label-position="inside">
                <b-input v-model="requestParams.description" maxlength="720" type="textarea" placeholder="Data attributions will be added by the uploader"></b-input>
              </b-field>
            </div>
            <div class="column">
              
              <b-field label="Tags" label-position="inside">
                  <b-taginput
                      v-model="requestParams.tags"
                      ellipsis
                      icon="label"
                      placeholder="Add more tags">
                  </b-taginput>
              </b-field>
              
              <!-- options sliders -->
              <b-field horizontal>
                <div class="field">
                    <b-checkbox v-model="requestParams.isInspectable">
                        Inspectable
                    </b-checkbox>
                </div>
                
                <div class="field">
                    <b-checkbox v-model="requestParams.isPublished">
                        Publish after upload
                    </b-checkbox>
                </div>

                <div class="field">
                    <b-checkbox v-model="requestParams.isPrivate"
                    type="is-info" >
                        Private (PRO feature)
                    </b-checkbox>
                </div>
              </b-field>    

              <b-field label="Password (PRO feature)" v-show="this.showPassword" label-position="inside" type="is-info">
                  <b-input type="password" 
                      placeholder=""
                      :value="this.requestParams.password"
                      password-reveal>
                  </b-input>
              </b-field>
              
            </div>
          </div>

          <b-progress :value="serverProgressPercent" size="is-large" :type="progressType" show-value>
              <span style="color: black">{{ serverProgress }}</span>
          </b-progress>  
          <b-field label="Your token" label-position="inside">
            <b-input :placeholder="this.userToken" disabled></b-input>
          </b-field> 
          <b-loading :is-full-page="isLoadingFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>

        </div>
      </div>
    </div>

    <!-- AUTH ERROR -->
    <div class="card" v-show="!this.authSuccess">
      <div class="card-content">  
        <div class="content">
            <b-message type="is-danger">
                There was a problem with SketchFab authentication or app authorization. Error was: {{ this.$route.query.error }}
                <br/><br/>
                
                You can still download your model and upload it manually to SketchFab.
            </b-message>
        </div>
      </div>
    </div>
    <section>
      
    </section>
  </div>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  name: 'SketchFabAuth',
  components: { },
  mounted() {
    // Listen to server side progress events
    this.$elevationHub.$on('server-progress', this.onServerProgress);
    this.$elevationHub.generatorOpened()
  },
  beforeDestroy() {
    this.$elevationHub.$off('server-progress', this.onServerProgress);
    this.$elevationHub.generatorClosed()
  },
  data() {
    return {
        isLoading: false,
        isLoadingFullPage: false,
        serverProgress: "Not uploaded yet", serverProgressPercent: 0,
        requestParams: {
          modelId: null,
          modelName: "",
          description: "",
          password: "",
          tags: [],
          isPrivate: false,
          isInspectable: true,
          isPublished: false,
        },
    }
  },
  computed: {
    authSuccess() {
      return this.userToken != null;
    },
    successQueryString() {
      return this.$route.hash == "" ? [] : this.$route.hash.split('&');
    },
    userToken() {
      return this.queryParams["access_token"] //this.$route.hash;
    },
    queryParams() {
      const hashes = this.$route.hash.split('&');
      const params = {}
      hashes.map(hash => {
          const [key, val] = hash.split('=')
          params[key] = decodeURIComponent(val)
      })
      return params
    },
    showPassword() {
      return this.requestParams.isPrivate;
    }
  },
  methods: 
  {
    onLoad () {
        this.isLoading = false;
        this.isLoadingFullPage = false;
    },
    onServerProgress({message, percent}) {
      this.serverProgress = message;
      this.serverProgressPercent = percent;
    }
  }
} 
</script>


