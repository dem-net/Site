<template>
               
  <div class="docs-main has-text-left	">
      <div class="docs-main-container">
          <header class="docs-header">
            <h1 class="title">FAQ</h1>
            <h2 class="subtitle">You'll find here some answers to common questions. 
              If you need more info, we're on <a href="https://twitter.com/ElevationApi" target="_blank">Twitter</a> and 
              <a target="_blank" href="https://join.slack.com/t/dem-net/shared_invite/enQtNjAxOTE3NTcwMDY1LWJjZDRmMzAxZDI3YzM3MWVjMzAzNjY4NDFkMWM3MmViN2E1YzI5OWM2ZDEyYmZlNWUyYmYzMjJlYThlNTU3ZWI">Slack</a>.</h2>
        </header>


        <hr class="is-medium">

        <!-- Datasets -->
        <h1 class="title">Datasets information</h1>
        <article class="content">
          
        </article>

        <hr class="is-medium">

       
        
        <div class="content">
          <p>
              Buefy (pronounced /ˈbyo͞oˌfī/, like <b>beau-fy</b>) is a user interface component library made on top
              of two <em>fresh</em> but very well known frameworks, them being
              <a href="https://vuejs.org" target="_blank">Vue.js</a> and <a href="https://bulma.io/">Bulma</a>.
              Buefy has two core principles: 1. keep stuff simple and 2. be lightweight.
          </p>

          <p>
              We like to think that Buefy is the javascript layer for your Bulma interface, since it doesn't require for it to be
              a sophisticated Single-Page Application.
              You can import it completely or single components on a ordinary webpage and use Vue.js as a replacement for jQuery —
              as you can see in this
              <a href="https://codepen.io/anon/pen/RBWMXE?editors=1010" target="_blank">Codepen</a>
              or any other example over the documentation.
          </p>

          <blockquote>
              This documentation assumes you know the basics of Vue.js, if you're not comfortable with it yet,
              it's probably not the best idea to learn from here as your first step — learn the basics then come back.
              <a href="https://vuejs.org/v2/guide" target="_blank">Vue.js</a> website is the best source for you to start with.
          </blockquote>

          <p>
              Now that you know what Buefy is, get on to the next step and
              <router-link to="/documentation/start">install it</router-link>!
          </p>
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
            
      }
    }
}
</script>
