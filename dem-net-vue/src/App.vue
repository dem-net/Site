<template>
  <div id="app">
        <b-navbar>
          <template slot="brand">
              <b-navbar-item href="/">
                  <router-link to="/">
                    <img src="./assets/DEMnet_logo_long.png" alt="Logo" width="64" />
                  </router-link>
              </b-navbar-item>
          </template>
          <template slot="start">
            <b-navbar-item>
                  <router-link :to="{ name: 'home'}" class="dem-nav-inactive" active-class="dem-nav-active">
                      Home
                    </router-link>
              </b-navbar-item>
              <b-navbar-item>
                  <router-link :to="{ name: 'Playground3DGpx'}" class="dem-nav-inactive" active-class="dem-nav-active">
                      GPX to 3D
                    </router-link>
              </b-navbar-item>
              <b-navbar-item>
                  <router-link :to="{ name: 'Playground3DBbox'}" class="dem-nav-inactive" active-class="dem-nav-active">
                    Map to 3D
                   </router-link>
              </b-navbar-item>
          </template>

          <template slot="end">
              <b-navbar-item tag="div">
                  <div class="buttons">
                    <b-button size="is-medium" icon-pack="fab" icon-left="github">
                      <a href="https://github.com/dem-net/DEM.Net" target="_blank">View on GitHub</a>
                    </b-button>
                  </div>
              </b-navbar-item>
          </template>
        </b-navbar>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        
        <div class="container has-text-centered">
          <b-notification v-if="initErrors" :active.sync="initErrors"
            type="is-warning"
            has-icon
            icon-pack="fas"
            aria-close-label="Close notification"
            role="alert">
            Application cannot connect to back-end server. Please try again later.
        </b-notification>
          <router-view />
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('datasets/getDatasets');
    this.$store.dispatch('imagery/getProviders');
  },
  computed: {
    initErrors() {
      if (this.$store.state.datasets.initErrors
        || this.$store.state.imagery.initErrors)
      return true;
      else
      return false;
    }
  }
}
</script>



<style>
.dem-nav-inactive {
  color: #4a4a4a;
}
a.dem-nav-active {
  color: #896bda;
}
</style>
