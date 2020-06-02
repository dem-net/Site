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
             <b-field label="Model name (required)" label-position="inside">
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
                      maxtags="42"
                      maxlength="64"
                      placeholder="Add more tags">
                  </b-taginput>
              </b-field>
              <br/>
              <!-- options sliders -->
              <b-field grouped>
                                    
                    <b-checkbox v-model="requestParams.isInspectable">
                      <b-tooltip label="Allows users to view textures" animated multilined>
                        Inspectable
                      </b-tooltip>                    
                    </b-checkbox>

                                
                    <b-checkbox v-model="requestParams.isPublished">
                      <b-tooltip label="Leave unchecked to setup views and 3D settings before publishing" animated multilined>
                        Publish after upload
                      </b-tooltip>                        
                    </b-checkbox>
                    <b-checkbox v-model="requestParams.isPrivate"
                    type="is-info">
                        Private (PRO feature)
                    </b-checkbox>
                
              </b-field>    

              <b-field label="Password (PRO feature)" v-show="this.showPassword" type="is-info" label-position="inside">
                  <template slot="label">
                      <b-tooltip type="is-dark" label="If provided, model will password protected">
                        Password (optional)
                      </b-tooltip>
                  </template>
                  <b-input type="password" 
                      placeholder=""
                      :value="this.requestParams.password"
                      maxlength="64"
                      password-reveal>
                  </b-input>
              </b-field>
              
            </div>
          </div>

          <!-- Send upload request -->
          <div class="content">
            <b-button @click="upload" :disabled="!isFormValid" icon-pack="fas" icon-left="fas fa-file-export" >
                 Export to SketchFab...
            </b-button>
          </div>

          
          <b-notification v-show="uploadErrors" :active.sync="uploadErrorsActive"
                    type="is-warning"
                    has-icon
                    icon-pack="fas"
                    aria-close-label="Close notification"
                    role="alert">
                    An error occured while uploading the model :
              {{ uploadErrors }}
              </b-notification>

          <b-modal :active.sync="this.viewerUrl != null"
              has-modal-card
              trap-focus
              aria-role="dialog"
              aria-modal>
              <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Upload success!</p>
                    </header>
                    <section class="modal-card-body">
                    <section>
                        <b>Click the link below to view your model on SketchFab</b>
                        </section>
                        
                        <br/>
                        <a :href="this.viewerUrl" target="_blank" rel="noreferrer" title="SketchFab">
                          <img src="../assets/sketchfablogo.png"/>
                          <br/>
                          {{this.viewerUrl}}
                        </a>
                    </section>
                    <footer class="modal-card-foot">
                        <router-link to="/">Close</router-link>
                    </footer>
                </div>
        </b-modal>

          <b-field label="SketchFab token" label-position="inside" v-show="!this.$isElevationPROD">
            <b-input :placeholder="this.requestParams.userToken" disabled></b-input>
          </b-field>
          
          <b-progress :value="serverProgressPercent" size="is-large" :type="progressType" show-value>
              <span style="color: black">{{ serverProgress }}</span>
          </b-progress>  
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
import axios from 'axios'

export default {
  name: 'SketchFabAuth',
  components: { },
  mounted() {
    // Listen to server side progress events
    this.$elevationHub.$on('server-export-progress', this.onServerProgress);
    this.$elevationHub.exporterOpened();

    this.requestParams.userToken = this.userTokenFromUrl;
    this.requestParams.modelId = this.modelIdFromUrl;
  },
  beforeDestroy() {
    this.$elevationHub.$off('server-export-progress', this.onServerProgress);
    this.$elevationHub.exporterClosed()
  },
  computed: {
    isFormValid() {
      return this.requestParams.modelName != null && this.requestParams.modelName != "";
    },
    authSuccess() {
      return this.userTokenFromUrl != null;
    },
    progressType() {
        return (this.uploadErrors == null) ? "is-warning" : "is-danger";
    },
    successQueryString() {
      return this.$route.hash == "" ? [] : this.$route.hash.split('&');
    },
    userTokenFromUrl() {
      return this.queryParams["access_token"] //this.$route.hash;
    },
    modelIdFromUrl() {
      return this.queryParams["state"];
    },
    queryParams() {
      const hashes = this.$route.hash.split('&');
      const params = {}
      hashes.map(hash => {
          var [key, val] = hash.split('=');
          if (key.startsWith('#'))
          {
            key = key.substring(1, key.length);
          }
          params[key] = decodeURIComponent(val)
      })
      return params
    },
    showPassword() {
      return this.requestParams.isPrivate;
    }
  },
  data() {
    return {
        isLoading: false,
        isLoadingFullPage: false,
        serverProgress: "Not uploaded yet", serverProgressPercent: 0,
        uploadErrors: null ,uploadErrorsActive: false,
        viewerUrl: null, // Model URL on SkecthFab
        requestParams: {
          modelId: null,
          modelName: "",
          description: "",
          password: "",
          tags: [],
          isPrivate: false,
          isInspectable: true,
          isPublished: false,
          userToken: "",
          clientConnectionId: null
        },
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
    },
    upload(){
      this.isLoading = true;
      this.$ga.event({
        eventCategory: 'model',
        eventAction: 'export',
        eventLabel: 'sketchfab'
      })
      this.uploadErrors = null;
      this.serverProgress = "Sending request...";
      this.requestParams.clientConnectionId = this.$connectionId;
      axios.post("/api/model/export/sketchfab", this.requestParams)
      .then(result => {
        this.isLoading = false;
        this.serverProgress = "Upload finished";
        this.viewerUrl = result.data.viewModelUrl;
        this.uploadErrors = null;
     })
      .catch(err=> {
          this.serverProgress = "Upload error!";
          this.isLoading = false;
          this.viewerUrl = null;
          this.uploadErrors = err.response.data.statusCode + ": " + err.response.data.message;
      })
    },
  }
} 
</script>


