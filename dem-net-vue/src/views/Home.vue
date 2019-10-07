<template>
  <div class="home">
    <section class="section">
    <div class="container">
      <h1 class="title">Welcome to DEM.Net Elevation API!</h1>
      <div class="columns">
        <div class="column">
          <figure class="image is-6by3">
          <img alt="DEM Net Elevation API" src="../assets/DEMNet-cover.jpg">
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
        </div>
        <b-message title="News" type="is-info" size="is-small" 
            icon-pack="fas" has-icon>
            Oct 6th 2019: FAQ has been updated
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
