<template>
               
  <div class="docs-main has-text-left	">
      <div class="docs-main-container">
          <header class="docs-header">
            <h1 class="title">Data sources</h1>
            <h2 class="subtitle">DEM-Net Elevation API is built upon free open datasets and imagery servers.</h2>
        </header>


        <hr class="is-medium">

        <!-- Datasets -->
        <h1 class="title">Datasets information</h1>
        <article class="content">
          <b-table
            ref="tableDatasets"
            :data="this.availableDatasets ? this.datasets : []"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :loading="isLoading"
            :focusable="isFocusable"
            :mobile-cards="hasMobileCards"
            detailed
            detail-key="name">
              <template slot-scope="props">
                <b-table-column field="name" label="Name" width="40">
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="description" label="Description">
                    {{ props.row.description }}
                </b-table-column>

                <b-table-column field="resolutionMeters" label="Resolution (m)" numeric>
                    {{ props.row.resolutionMeters }}
                </b-table-column>
                
                <b-table-column field="source" label="Source">
                    <a :href="props.row.attribution.url">{{ props.row.attribution.text }}</a>
                </b-table-column>

                <b-table-column field="attribution.acknowledgement" label="Acknowledgements">
                   <a @click="toggleDatasets(props.row)">
                            Click for details
                        </a>
                </b-table-column>
            </template>

            <template slot="detail" slot-scope="props">
              <div class="media-content">
                  <div class="content">
                      <p>
                          <small>@{{ props.row.attribution.acknowledgement}}</small>
                          </p>
                  </div>
              </div>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
        </b-table>
        </article>

        <hr class="is-medium">

        <!-- Imagery -->
        <h1 class="title">Imagery providers</h1>
        <article class="content">
          <b-table
            ref="tableImagery"
            :data="this.availableImagery ? this.imageryProviders : []"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :loading="isLoading"
            :focusable="isFocusable"
            :mobile-cards="hasMobileCards"
            detailed
            detail-key="name">
              <template slot-scope="props">
                <b-table-column field="name" label="Name">
                    <a :href="props.row.attribution.url" :target="props.row.name">{{ props.row.name }}</a>
                </b-table-column>

                <b-table-column field="maxZoom" label="Zoom max" numeric>
                    {{ props.row.maxZoom }}
                </b-table-column>

                <b-table-column field="maxParallel" label="Simultaneous downloads" numeric>
                    {{ props.row.maxDegreeOfParallelism }}
                </b-table-column>

                <b-table-column field="url" label="URL">
                    {{ props.row.urlModel.urlFormat }}
                </b-table-column>
                
                <b-table-column field="attribution.acknowledgement" label="Acknowledgements">
                   <a @click="toggleImagery(props.row)">
                            Click for details
                        </a>
                </b-table-column>
            </template>

            <template slot="detail" slot-scope="props">
              <div class="media-content">
                  <div class="content">
                      <p>
                          <small>@{{ props.row.attribution.text}}</small>
                          </p>
                  </div>
              </div>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
        </b-table>
        </article>
        
         <hr class="is-medium">

        <!-- models -->
        <h1 class="title">Model formats</h1>
        <div class="content">
          <p>
              Model are available in the following formats:
              <ul>
              <li>Binary packed glTF (GLB files) : 3D open format for model exchange and transfer. Supported by major software and viewers.</li>
              </ul>
              <ul>
              <li>STereo Lithography (STL files) : 3D open format for model printing. Supported by all 3D printers, but does not support colors.</li>
              </ul>
              <ul>
              <li>3D printers with colored models soon...</li>
              </ul>
          </p>
      </div>

      <!-- models -->
        <h1 class="title">A word from the author</h1>
        <div class="content">
          <p>
              Hi! I'm Xavier Fischer a developer from France. DEM-Net was created in 2018. I wanted to get elevation profiles using my stack: Microsoft .Net.
          </p>
          <p>
              It rapidly became a great opportunity to explore Digital Elevation Models. DEM-Net is called Elevation API because if offer elevation request endpoints, but the best part was generating 3D models from real data.
          </p>
          <p>
              Then, with enthusiasm contagion I called for help Frederic Aubin, who helped me with TIN (Triangle Irregular Networks) generation, and he loved the API for geomorphology purposes.
          </p>
          
        <h2 class="subtitle">Contributing</h2>
        <p>All contributions welcome! We're on GitHub. For the moment, only the core library and samples are open source. Server and front end technology are not public yet.</p>
      </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'FAQ',
  components: {
    
  },
  created() {
    if (!this.$store.state.datasets.dataSets)
      this.$store.dispatch('datasets/getDatasets');
    if (!this.$store.state.imagery.providers)
      this.$store.dispatch('imagery/getProviders');
  },
  methods: {
      toggleImagery(row) {
          this.$refs.tableImagery.toggleDetails(row)
      },
      toggleDatasets(row) {
          this.$refs.tableDatasets.toggleDetails(row)
      }
  },
  computed: {
    availableDatasets() {
          return this.$store.state && this.$store.state.datasets && this.$store.state.datasets.dataSets;
      },
    datasets() {
      return this.$store.state.datasets.dataSets;
    },
    availableImagery() {
          return this.$store.state && this.$store.state.imagery && this.$store.state.imagery.providers;
      },
    imageryProviders() {
      return this.$store.state.imagery.providers;
    }
  }, 
  data() {
        return {
          isEmpty: false,
          isBordered: false,
          isStriped: true,
          isNarrowed: true,
          isHoverable: false,
          isFocusable: false,
          isLoading: false,
          hasMobileCards: true,
          isImageModalActive: false
            
      }
    }
}
</script>
