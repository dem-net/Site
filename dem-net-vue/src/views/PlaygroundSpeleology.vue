<template>
  <div class="playground">
    
    <div class="container is-fluild">
    <h1 class="title">Spéléologie</h1>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Sélectionnez un fichier VisualTopo (.TRO) à analyser.</p>
      </header>
      <div class="card-content">  
        <div class="content">
          <section v-show="!modelId">
            <b-field class="file level-item">
              <b-upload v-model="vTopoFile" accept=".tro" >
                    <a class="button is-primary">
                        <b-icon pack="fas" icon="file-upload"></b-icon>
                        <span>Fichier VisualTopo...</span>
                    </a>
                </b-upload>
                <span class="file-name" v-if="vTopoFile">
                    {{ vTopoFile.name }}
                </span>
                <!--<b-upload v-model="vTopoFile" accept=".tro" drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon
                                icon="upload"
                                pack="fas"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Déposez ici un fichier VisualTopo...</p>
                    </div>
                </section>
                   <span class="file-name" v-if="vTopoFile">
                    {{ vTopoFile.name }}
                </span>
                </b-upload>-->
            </b-field>
            <b-field class="file level-item">
                <!-- Generation -->
                    <b-button @click="uploadModelFile" :disabled="!vTopoFile || modelId" icon-pack="fas" icon-left="fas fa-upload">
                      Lancer l'analyse
                    </b-button>  
            </b-field>
          </section>
          <section> <!-- v-show="modelId">-->
            
            <b-field><span v-show="modelId">Le modèle a été téléchargé et analysé. Id : {{modelId}}</span></b-field>
            <b-button @click="exportToExcel" icon-pack="fas" icon-left="fas fa-table">
                      Télécharger au format Excel
                    </b-button> <b-button @click="exportToExcel" icon-pack="fas" icon-left="fas fa-globe-americas">
                      Visualisation 3D
                    </b-button> 
          </section>
          <section>
            <div class="columns">
              <div class="column" v-show="showAdvancedUI">
                <DatasetSelector  :dataSet="this.requestParams.dataSet" @datasetSelected="onDatasetSelected"/>
              </div>
              <!-- Export format -->
              <div class="column" v-show="showAdvancedUI">
                <label class="label">Model output format</label>
                <b-field>
                  
                    <b-radio-button v-model="requestParams.format" native-value="glTF">Binary glTF</b-radio-button>
                    <b-radio-button v-model="requestParams.format" native-value="STL">STL (3D printer)</b-radio-button>
                  </b-field>
              </div>
              <!-- Texture -->
              <div class="column" v-show="showTextureOptions && showAdvancedUI">
                <b-field label="Use imagery texture">
                    <b-switch v-model="requestParams.textured">
                    </b-switch>
                </b-field>
                <ImagerySelector v-show="showTextureOptionsProvider" :provider="requestParams.imageryProvider" 
                  @providerSelected="onProviderSelected"
                  @qualitySelected="onQualitySelected"/>
              </div>
              <!-- Z factor -->
                  <div class="column" v-show="showAdvancedUI">
                    <b-field label="Z multiplier">
                      <b-slider v-model="requestParams.zFactor" size="is-medium" :min="1" :max="10" :step=".5"></b-slider>
                    </b-field>
                  </div>
              <!-- TIN -->
              <div class="column" v-show="false">
                <b-field label="Generate TIN" v-if="this.requestParams.format == 'glTF'">
                  <b-tooltip label="Decimates the mesh (reduces number of triangles). This is a long operation, be patient."
                        position="is-bottom" type="is-light"
                        animated multilined>
                    <b-switch v-model="requestParams.generateTIN">
                    </b-switch>
                  </b-tooltip>
                </b-field>
              </div>
            </div>
            <b-notification v-show="demErrors" :active.sync="demErrorsActive"
                    type="is-warning"
                    has-icon
                    icon-pack="fas"
                    aria-close-label="Close notification"
                    role="alert">
                    An error occured while generating the model :
              {{ demErrors }}
            </b-notification>

            <!-- Buttons -->
   
            <p></p>    
            <p>
                  <b-progress v-show="serverProgress" :value="serverProgressPercent" size="is-large" :type="progressType"  show-value>
                  <span style="color: black">{{ serverProgress }}</span>
              </b-progress>
            </p>
            <div class="glbcontent">
              <!-- <model-gltf :content="glbFile"></model-gltf> -->
              <model-gltf
            background-color="#f0f0ff" :src="glbFile" v-if="glbFile && this.requestParams.format == 'glTF'" @on-load="onLoad"></model-gltf>
            <model-stl
            background-color="#f0f0ff" :src="glbFile" v-if="glbFile && this.requestParams.format == 'STL'" @on-load="onLoad"></model-stl>
            </div>


              <Attributions id="attributions" :attributions="this.attributions"></Attributions>
              
            <b-loading :is-full-page="isLoadingFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
            
          </section>
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
import ModelGltf from 'vue-3d-model'
import DatasetSelector from '../components/DatasetSelector'
import ImagerySelector from '../components/ImagerySelector'
import Attributions from '../components/Attributions'

export default {
  name: 'PlaygroundSpeleology',
  components: { ModelGltf,DatasetSelector,ImagerySelector,Attributions },
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
        showAdvancedUI: false,
        isLoadingFullPage: false,
        vTopoFile: null,
        demErrors: null,   demErrorsActive: false,
        serverProgress: null, serverProgressPercent: 0,
        requestParams: {
          dataSet: "AW3D30",
          textured: true,
          generateTIN: false,
          imageryProvider: "MapBox-SatelliteStreet",
          textureQuality: 2,
          format: "glTF",
          zFactor: 1
        },
        attributions: [],
        modelId: null,
    }
  },
  computed: {
    showTextureOptions() {
      return (this.requestParams.format == "glTF");
    },
    showTextureOptionsProvider() {
      return (this.requestParams.format == "glTF" && this.requestParams.textured);
    },
    progressType() {
        return (this.demErrors == null) ? "is-warning" : "is-danger";
    },
    track3Ddescription() {
      return "If activated, GPX will we translated to a plane mesh, otherwise GPX track will be drawn on texture.";
    },
    SketchFabLoginUrl() {
      return this.modelId ? "https://sketchfab.com/oauth2/authorize/?state=" + this.modelId + "&response_type=token&client_id=SKa6zTHsHdgbs7RE7oug69QQq9TMDPv8gtqAZUuj&approval_prompt=auto" : null;
    }
  },
  methods: 
  {
    onLoad () {
        this.isLoading = false;
    },
    onDatasetSelected(dstName) {
      this.requestParams.dataSet = dstName;
    },
    onProviderSelected(providerName) {
      this.requestParams.imageryProvider = providerName;
    },
    onQualitySelected(quality) {
      this.requestParams.textureQuality = quality;
    },
    uploadModelFile(){
      this.isLoading = true;
      this.$ga.event({
        eventCategory: 'speleo',
        eventAction: 'upload',
        eventLabel: 'speleo-upload'
      })
      this.demErrors = null;
      this.serverProgress = "Patientez...";
      let formData = new FormData();
      formData.append('visualTopoFile', this.vTopoFile);
      axios.post("/api/speleo/visualtopo?dataset=" + this.requestParams.dataSet 
                                    + "&clientConnectionId=" + this.$connectionId,
      formData,
      {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Content-Encoding': 'gzip'
          },
          //responseType: 'blob',
      }
      ).then(result => {
          
          this.modelId = result.data;
          this.isLoading = false;
     })
      .catch(err=> {
          this.isLoading = false;
          this.serverProgress = "Request aborted"; 
          this.demErrors = err.response ? err.response.data : err.message;
          this.demErrorsActive = true;
          this.attributions = [];
          this.modelId = null;
      })
    },    
    exportToExcel(){
      this.isLoading = true;
      this.$ga.event({
        eventCategory: 'speleo',
        eventAction: 'analyse',
        eventLabel: 'speleo-analyse'
      })
      this.demErrors = null;
      this.serverProgress = "Patientez...";
      axios.get("/api/speleo/visualtopo/"+ this.modelId + "/excel/"
                                    + "?clientConnectionId=" + this.$connectionId,
      {
          responseType: 'blob',
      }
      ).then(result => {
          
          // Download file
          var fileURL = window.URL.createObjectURL(new Blob([result.data]));
          var fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', this.vTopoFile.name + '.xlsx');
          document.body.appendChild(fileLink);
          fileLink.click();

          this.isLoading = false;
          /*
          var assetInfo = result.data.assetInfo;
          this.glbFile = baseUrl + assetInfo.modelFile; this.demErrors = null; this.demErrorsActive = false;
          this.attributions = assetInfo.attributions; 
          this.modelId = assetInfo.requestId;
          */
     })
      .catch(err=> {
          this.isLoading = false;
          this.serverProgress = "Request aborted"; 
          this.demErrors = err.response ? err.response.data : err.message;
          this.demErrorsActive = true;
          this.attributions = [];
          this.modelId = null;
      })
    },
    modelDownload(){
      this.$ga.event({
            eventCategory: 'speleo',
            eventAction: 'view',
            eventLabel: 'speleo-view'
          })
    },
    onServerProgress({message, percent}) {
      this.serverProgress = message;
      this.serverProgressPercent = percent;
    }
  }
} 
</script>

<style scoped>
.glbcontent {
    height: 100%;
    width: 100%;
}
</style>
