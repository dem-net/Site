<template>
  <div class="home">
    <section class="section">
    <div class="container">
       <b-message title="We need funding" type="is-info" aria-close-label="Close message">
            We need your help to get this site running. This is not a business site, this is a site made for anybody, unique, that should exist and remain free. That's why I'm asking for your help. Any donation counts. Only 100$ a month are required to get this site up and running. This is a lot for an individual, but little for a collective. Let's join our forces : if every user had donated last year 0.17 $ the costs would be covered !
            <br/>
            <br/>
            Here are the sponsoring / donation links :
            <br/>
            <br/>
            <div class="columns">
              <div class="column">
                  <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8F428QPSP9W5E&source=url">
                    <img src="https://raw.githubusercontent.com/dem-net/Resources/master/images/ext/paypal-donate.png" alt="Donate with PayPal button" width="150" height="64">
                  </a>
              </div>
              <div class="column">
                              <a href="https://www.patreon.com/bePatron?u=24134737">
                                <img src="https://raw.githubusercontent.com/dem-net/Resources/master/images/ext/become_a_patron_button@2x.png" alt="Become a Patron" width="150" height="64">
                              </a>
              </div>
              <div class="column">
              <a href="https://github.com/sponsors/xfischer">GitHub sponsoring</a>
              </div>
            </div>
            Thank you !  - <i>Xavier Fischer, ElevationAPI</i>
        </b-message>
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
          <div class="column" v-if="$featureSpeleoEnabled">            
            <b-button icon-pack="fas" icon-left="fas fa-vector-square" tag="router-link" :to="{ name: 'PlaygroundSpeleology' }">
                    Speleology
            </b-button>
          </div>
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
