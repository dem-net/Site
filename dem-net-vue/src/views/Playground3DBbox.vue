<template>
  <div class="playground">
    
    <div class="container is-fluild">
    <h1 class="title">3D terrain model from a map</h1>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Draw a rectangle using the tool&nbsp;>&nbsp;Choose your options&nbsp;>&nbsp;Generate and see the 3D model.</p>
      </header>
      <div class="card-content">  
        <div class="content">
          <section>
            <div class="columns">
              <div class="column">
                <MapRectangle @bboxSelected="setBbox"></MapRectangle>
              </div>
              <div class="column">
                <div class="columns">
                  <div class="column">
                    <DatasetSelector :dataSet="this.requestParams.dataSet" @datasetSelected="onDatasetSelected"/>
                  </div>
                  <!-- Export format -->
                  <div class="column">
                    <label class="label">Output format</label>
                    <b-field>
                      <b-radio-button v-model="requestParams.format" native-value="glTF" @input="generateModel(true)">Binary glTF</b-radio-button>
                      <b-radio-button v-model="requestParams.format" native-value="STL" @input="generateModel(true)">STL</b-radio-button>
                      </b-field>
                  </div>
                </div>                
                <div class="columns">
                  <div class="column">
                    <b-field label="Mesh reduction" message="% of triangles to keep (100% = no reduction, 50% = half triangle count)">
                    <b-slider v-model="requestParams.meshReduce" size="is-medium" :min="10" :max="100" :step="1" :custom-formatter="val => val + '%'" @change="generateModel(true)"></b-slider>
                    </b-field>
                  </div>
                  <div class="column">
                    <b-field label="Z multiplier" message="0 (flat), 1 (normal), 10 (elevation * 10)">
                      <b-slider v-model="requestParams.zFactor" size="is-medium" :min="1" :max="10" :step=".5"></b-slider>
                    </b-field>
                  </div>
                </div>
                <div class="columns">
                  <!-- Texture -->
                  <div class="column" v-show="showTextureOptions">
                    <b-field label="Use imagery texture">
                        <b-switch v-model="requestParams.textured" @input="generateModel(true)">
                        </b-switch>
                    </b-field>
                    <ImagerySelector v-show="showTextureOptionsProvider" :provider="requestParams.imageryProvider" 
                      @providerSelected="onProviderSelected"
                      @qualitySelected="onQualitySelected"/>
                  </div>
                  <!-- Z factor -->                  
                  <!-- adornments -->
                  <div class="column">
                    <b-field label="Add Scale/North" v-show="this.requestParams.format == 'glTF'">
                        <b-switch v-model="requestParams.enableAdornments">
                        </b-switch>
                    </b-field>
                  </div>
                </div>
              </div>
            </div>
            <b-notification ref="sizeEstimate" :closable="false" :type="this.estimatedModelSize > this.maxModelSize ? 'is-warning' : ''" >
                    <em><strong>Estimated model size : {{Math.ceil(this.estimatedModelSize  * 10) / 10}} MB (max: {{Math.ceil(this.maxModelSize  * 10) / 10}} MB)</strong></em>
                </b-notification>
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
               <div class="buttons is-centered">
                <!-- Generation -->
                    <b-button @click="generateModel(false)" :disabled="!requestParams.bbox" icon-pack="fas" icon-left="fas fa-globe-americas">
                      Generate 3D model
                    </b-button>
                <!-- Textures -->
                  <b-dropdown hoverable aria-role="list" :disabled="!this.glbFile">
                            <button class="button" slot="trigger">
                                <b-icon pack="fas" icon="images"></b-icon>
                                <span>Download data</span>
                            </button>
                            <b-dropdown-item has-link aria-role="menuitem">
                                <a href="#" @click="downloadGeoRef()" target="_blank" rel="noopener noreferrer">
                                    <b-icon pack="fas" icon="globe"></b-icon>
                                    Geo reference
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link aria-role="menuitem" v-if="this.textureFiles.heightMap">
                                <a :href="this.textureFiles.heightMap" target="_blank" rel="noopener noreferrer">
                                    <b-icon pack="fas" icon="image"></b-icon>
                                    Height map
                                </a>
                            </b-dropdown-item>
                            <b-dropdown-item has-link aria-role="menuitem" v-if="this.textureFiles.normalMap">
                                <a :href="this.textureFiles.normalMap" target="_blank" rel="noopener noreferrer">
                                    <b-icon pack="fas" icon="image"></b-icon>
                                    Normal map
                                </a>
                            </b-dropdown-item>
                             <b-dropdown-item has-link aria-role="menuitem" v-if="this.textureFiles.albedo">
                                <a :href="this.textureFiles.albedo" target="_blank" rel="noopener noreferrer">
                                    <b-icon pack="fas" icon="image"></b-icon>
                                    Albedo (imagery)
                                </a>
                            </b-dropdown-item>
                        </b-dropdown>
                <!-- Download -->
                    <b-button icon-pack="fas" icon-left="fas fa-download" :disabled="!this.glbFile" tag="a" :href="this.glbFile" @click="modelDownload">
                        Download model
                      </b-button>

                <!-- Attributions -->
                    <b-button icon-pack="fas" icon-left="fas fa-copyright" :disabled="!this.glbFile" tag="a" href="#attributions">
                        Attributions
                      </b-button>
                     
                     <!-- SketchFab Export -->
                    <a :disabled="!this.glbFile" :href="this.SketchFabLoginUrl" class="button is-default" target="_blank">
                        <span class="icon is-small"><img src="../assets/sketchfablogo.png" width="22" height="22" style="align: center"/></span>
                        <span>SketchFab export...</span>
                    </a>
              </div>
              <p>
                <b-progress v-show="serverProgress" :value="serverProgressPercent" size="is-large" :type="progressType" show-value>
                    <span style="color: black">{{ serverProgress }}</span>
                </b-progress>
              </p>
              <div class="glbcontent">
                <!-- <model-gltf :content="glbFile"></model-gltf> -->
                <model-gltf
                  background-color="#f0f0ff" :src="glbFile" v-if="glbFile && this.requestParams.format == 'glTF'"></model-gltf>
              <model-stl
                  background-color="#f0f0ff" :src="glbFile" v-if="glbFile && this.requestParams.format == 'STL'"></model-stl>
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
import { ModelGltf,ModelStl } from 'vue-3d-model'
import DatasetSelector from '../components/DatasetSelector'
import ImagerySelector from '../components/ImagerySelector'
import Attributions from '../components/Attributions'
import MapRectangle from '../components/MapRectangle'
var loadingComponent = null

export default {
  name: 'Playground3DBbox',
  components: { ModelGltf,ModelStl,MapRectangle,DatasetSelector,ImagerySelector,Attributions },
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
        glbFile: null,
        demErrors: null, demErrorsActive: true,
        serverProgress: null, serverProgressPercent: 0,
        estimatedModelSize: 0, maxModelSize: 0,
        requestParams: {
          bbox: null,
          dataSet: "SRTM_GL3",
          textured: true,
          imageryProvider: "MapBox-SatelliteStreet",
          textureQuality: 2,
          format: "glTF",
          zFactor: 1,
          enableAdornments: true,
          meshReduce: 50
        },
        textureFiles: {
          heightMap: null,
          normalMap: null,
          albedo: null
        },
        attributions: [],
        assetInfo: null,
        modelId: null,
        timeout: null
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
    SketchFabLoginUrl() {
      return this.modelId ? "https://sketchfab.com/oauth2/authorize/?state=" + this.modelId + "&response_type=token&client_id=SKa6zTHsHdgbs7RE7oug69QQq9TMDPv8gtqAZUuj&approval_prompt=auto" : null;
    }
  },
  methods: 
  {
    loadSizeEstimate() {
      this.sizeEstimateLoaded();
      loadingComponent = this.$buefy.loading.open({
                    container: this.$refs.sizeEstimate.$el
                })
    },
    sizeEstimateLoaded() {
      if (loadingComponent) loadingComponent.close();
    },
    onDatasetSelected(dstName) {
      this.requestParams.dataSet = dstName;
      this.estimateSize();
    },
    onQualitySelected(quality) {
      this.requestParams.textureQuality = quality;
      this.estimateSize();
    },
    onProviderSelected(providerName) {
      this.requestParams.imageryProvider = providerName;
    },
    setBbox(bbox) {
      this.requestParams.bbox = bbox;
      

       if (this.timeout) clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.generateModel(true);
          }, 300)
    },
    estimateSize() {
      if (this.requestParams.bbox)
      {
        this.generateModel(true);
      }
    },
    generateModel(onlyEstimateSize){
      if (onlyEstimateSize) {
        this.loadSizeEstimate();
        this.isLoading = false;
        this.demErrors = null;
      } else {
        this.isLoading = true;
        this.$ga.event({
          eventCategory: 'model',
          eventAction: 'generate',
          eventLabel: 'bbox-' + this.requestParams.format
        })
        this.demErrors = null;
        this.serverProgress = "Sending request...";
      }      
      const baseUrl = process.env.VUE_APP_API_BASEURL
      axios.get("/api/model/3d/bbox/" + this.requestParams.bbox
                                    + "?dataset=" + this.requestParams.dataSet 
                                    + "&textured=" + this.requestParams.textured
                                    + "&imageryProvider=" + this.requestParams.imageryProvider 
                                    + "&textureQuality=" + this.requestParams.textureQuality
                                    + "&format=" + this.requestParams.format
                                    + "&zFactor=" + this.requestParams.zFactor
                                    + "&adornments=" + this.requestParams.enableAdornments
                                    + "&meshReduceFactor=" + this.requestParams.meshReduce / 100.0
                                    + "&clientConnectionId=" + this.$connectionId
                                    + "&onlyEstimateSize=" + onlyEstimateSize
      ).then(result => {
          if (onlyEstimateSize) {            
            this.isLoading = false;
            this.estimatedModelSize = result.data.estimatedModelFileSizeMB;
            this.maxModelSize = result.data.maximumAllowedFileSizeMB;
            this.serverProgress = "";  
            this.demErrorsActive = false;
            this.attributions = [];
            this.modelId = null;    
            this.sizeEstimateLoaded();        
          } else
          {
            var assetInfo = result.data.assetInfo;
            this.glbFile = baseUrl + assetInfo.modelFile;
            this.textureFiles.heightMap = assetInfo.heightMap ? process.env.VUE_APP_API_BASEURL + assetInfo.heightMap.filePath : null;
            this.textureFiles.albedo = assetInfo.albedoTexture ? process.env.VUE_APP_API_BASEURL + assetInfo.albedoTexture.filePath : null;
            this.textureFiles.normalMap = assetInfo.normalMapTexture ? process.env.VUE_APP_API_BASEURL + assetInfo.normalMapTexture.filePath : null;
            this.attributions = assetInfo.attributions; 
            this.demErrors = null; this.demErrorsActive = false;
            this.modelId = assetInfo.requestId;  
            this.assetInfo = assetInfo;
            this.isLoading = false;  
            this.sizeEstimateLoaded();  
          }

      })
      .catch(err=> { 
          this.isLoading = false;
          this.serverProgress = "Request aborted";  
          this.demErrors = err.response.data; 
          this.demErrorsActive = true;
          this.attributions = [];
          this.modelId = null;
          this.sizeEstimateLoaded();
          })
    },
    downloadGeoRef(){
      const blob = new Blob([JSON.stringify(this.assetInfo,null, '\t')], { type: 'application/json' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = this.modelId + ".json"
        link.click()
        URL.revokeObjectURL(link.href)
    },
    modelDownload(){
      this.$ga.event({
            eventCategory: 'model',
            eventAction: 'download',
            eventLabel: 'bbox'
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
