<script>
import { Scatter, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Scatter,
  mixins: [reactiveProp],
  data () {
    return {
      options: { //Chart.js options
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: true
            },
            scaleLabel: {
							display: true,
							labelString: 'Elevation (m)'
						}
          }],
          xAxes: [ {
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            },
            scaleLabel: {
							display: true,
							labelString: 'Distance (km)'
						}
          }]
        },
        tooltips: {
            mode: 'nearest'
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        showLines: true
      }
    }
  },
  mounted () {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options)
  }
}
</script>