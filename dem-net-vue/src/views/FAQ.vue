<template>
               
  <div class="docs-main has-text-left	">
      <div class="docs-main-container">
          <header class="docs-header">
            <h1 class="title">FAQ</h1>
            <h2 class="subtitle">You'll find here some answers to common questions. If you need more info, we're on Twitter and Slack.</h2>
        </header>


        <hr class="is-medium">

        <h1>Datasets information</h1>
        <article class="content">
          <b-table
            ref="table"
            :data="this.datasets"
            :bordered="isBordered"
            :striped="isStriped"
            :narrowed="isNarrowed"
            :hoverable="isHoverable"
            :loading="isLoading"
            :focusable="isFocusable"
            :mobile-cards="hasMobileCards">
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

                <b-table-column label="">
                    <span>
                      <b-tooltip :label="props.row.attribution.acknowledgement"
                position="is-bottom" type="is-light"
                animated multilined>
                    <b-icon pack="fas"
                            icon="fas fa-info-circle">
                        </b-icon>
                    </b-tooltip>
                    </span>
                </b-table-column>
            </template>
        </b-table>
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
      </article>
      </div>
  </div>
</template>

<script>
export default {
  name: 'FAQ',
  components: {
    
  },
  computed: {
    datasets() {
      return this.$store.state.datasets.dataSets;
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
