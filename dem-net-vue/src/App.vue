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
                <router-link to="/playground" class="navbar-item">Playground</router-link>
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
          <router-view />
        </div>
      </div>

    </section>
  </div>
</template>



<style>
</style>
