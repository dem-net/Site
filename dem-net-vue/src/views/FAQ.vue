<template>
               
  <div class="docs-main has-text-left	">
      <div class="docs-main-container">
          <header class="docs-header">
            <h1 class="title">FAQ</h1>
            <h2 class="subtitle">You'll find here some answers to common questions. 
              If you need more info, we're on <a href="https://twitter.com/ElevationApi" target="_blank" rel="noopener noreferrer">Twitter</a> and 
              <a target="_blank" rel="noopener noreferrer" href="https://join.slack.com/t/dem-net/shared_invite/enQtNjAxOTE3NTcwMDY1LWJjZDRmMzAxZDI3YzM3MWVjMzAzNjY4NDFkMWM3MmViN2E1YzI5OWM2ZDEyYmZlNWUyYmYzMjJlYThlNTU3ZWI">Slack</a>.</h2>
        </header>


        <hr class="is-medium">

        <div class="content">
          <ul>
            <li>
                <h3>Where the elevation data comes from and what is the coverage area?</h3>
            </li>

            <p>
              DEM Net uses publicly available DEMs from <a href="https://opentopography.org/" target="_blank" rel="noopener noreferrer">OpenTopography</a> 
              and <a href="https://www.ngdc.noaa.gov/mgg/global/" target="_blank" rel="noopener noreferrer">NOOA</a>.
                <ul>
                  <li><strong>ETOPO1</strong> has global coverage, including oceans. Resolution: approx 2km.<br/>
                        This dataset is best for large areas and bathymetry. It offers a great simplification of elevations.
                  </li>
                  <li><strong>ALOS World 3D (AW3D30)</strong> dataset coverage is within approx. 82 deg. of N/S latitudes. Resolution: 30m.
                    <br/>
                        This dataset has the better detail, but contains a lot of void areas with no data.
                        In those cases, use SRTM_GL1 as a backup plan.
                  </li>
                  <li><strong>SRTM</strong> dataset coverage is within approx. 60 deg. of N/S latitudes. Resolution: 30m for SRTM_GL1 and 90m SRTM_GL3.
                    <br/>
                        This dataset has no or very few voids. It appears more smoothed than the ALOS World 3D.
                    
                  </li>
                </ul>
            </p>
            
            <!-- NEXT FAQ ITEM -->
            <li>
                <h3>Can I use another imagery service ?</h3>
            </li>

            <p>
              It is possible if the provider is a tile ZXY provider (no WMS), is public (ie: public facing URL), and if it can be freely usable. Please contact us via contact@elevationapi.com. 
            </p>


            <!-- NEXT FAQ ITEM -->
            <li>
                <h3>How can I see my model once downloaded ?</h3>
            </li>

            <p>
              - Windows 10+ users can natively open GLB and STL files using the 3D viewer app.<br/>
              - Mac and Linux users can visualize their models via a viewer app. I use <a href="https://gltf-viewer.donmccurdy.com/" target="_blank" rel="noopener noreferrer">glTF Viewer</a> from Don McCurdy.
            </p>
          </ul>
      </div>
      
      </div>

      <vue-markdown>{{ compiledMarkdown }}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import axios from 'axios'


export default {
  name: 'FAQ',
  components: { VueMarkdown },
  created(){
    // Fetch Data
    this.fetchData();
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.faqMarkdown, { sanitize: true })
    }
  }, 
  methods: {
  fetchData(){
     axios.get('http://localhost:8080/faq.md').then(response => {
       // eslint-disable-next-line 
        console.log(response);
        this.faqMarkdown = response.data;
     })
  }
  },
  data() {
        return {
          baseUrl: process.env.BASE_URL,
          faqMarkdown: "",
      }
    }
}
</script>
