<template>
  <div id="app">
    <section class="hero is-light is-fullheight">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <header class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <router-link to="/" class="navbar-item">
                <img src="./assets/DEMnet_logo_long.png" alt="Logo" width="64" />
              </router-link>
              <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="navbarMenuHeroC" class="navbar-menu">
              <div class="navbar-end">
                <router-link to="/" class="navbar-item">Home</router-link>
                <router-link :to="{ name: 'playground'}" class="navbar-item">Playground</router-link>
                <router-link to="/about" class="navbar-item">About</router-link>
                <span class="navbar-item">
                  <b-button size="is-medium" icon-left="github">
                    <a href="https://github.com/dem-net/DEM.Net" target="_blank">View on GitHub</a>
                  </b-button>
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        
        <div class="container has-text-centered">
          <b-notification v-if="initErrors"
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

    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('getDatasets');
  },
  computed: {
    initErrors() {
      if (this.$store.state.initErrors)
      return true;
      else
      return false;
    }
  }
}
</script>



<style>
.router-link-active {
  color: red;
}
</style>
