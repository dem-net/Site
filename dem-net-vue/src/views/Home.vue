<template>
  <div class="home">
    <section class="section">
    <div class="container">
      <h1 class="title">Welcome to DEM.Net Elevation API!</h1>
      <div class="columns">
        <div class="column">
          <!--<figure class="image is-6by3">
          <img alt="DEM Net Elevation API" src="../assets/DEMNet-cover.jpg">
          </figure>-->
          <figure class="image is-16by9">
          <iframe class="has-ratio" src="https://player.vimeo.com/video/416024952" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
          </figure>
        </div>
        
        <div class="column">
        <section>

        <h2 class="subtitle">
          <br>A simple open source API providing <strong>global elevation data</strong> and fast content pipeline, enabling <strong>live 3D textured terrain generation</strong> in both STL and glTF.
        </h2>
        </section>
        <section>
        <h2>
          <br>
        <div class="columns">
          <div class="column">
              <b-button icon-pack="fas" icon-left="fas fa-map-marked-alt" tag="router-link" :to="{ name: 'Playground3DGpx' }">
                      GPX to 3D
            </b-button>
          </div>

          <div class="column">
            
            <b-button icon-pack="fas" icon-left="fas fa-vector-square" tag="router-link" :to="{ name: 'Playground3DBbox' }">
                    Map to 3D
            </b-button>
          </div>
          <div class="column">
            
            <b-button icon-pack="fas" icon-left="fas fa-globe" tag="router-link" :to="{ name: 'Playground3DOsm' }">
                    Map + OSM to 3D
            </b-button>
          </div> 
          <!-- <div class="column">
            
            <b-button icon-pack="fas" icon-left="fas fa-vector-square" tag="router-link" :to="{ name: 'PlaygroundSpeleology' }">
                    Speleology
            </b-button>
          </div> -->
        </div>
        <b-message title="News" type="is-info" size="is-small" icon-pack="fas" has-icon>
            Nov 01 2020: - Model adornments (scale and north)
            <br/>
            Apr 19 2020: - SketchFab export
             ! <img src="../assets/sketchfab-logo-color.png"/>
            <br/>
            Mar 10 2020: - Attributions and Thunderforest imagery
            <br/>
            Mar 07 2020: - OSM models / NASADEM dataset / search available in map
            <br/>
            Feb 22 2020: - OSM buildings and ski resorts added (experimental)
            <br/>
            Jan 26 2020: - GEBCO 2019 dataset added (global bathymetry 240 m)
        </b-message>
        </h2>
        </section>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    
  }
}
</script>
