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
            }
          }],
          xAxes: [ {
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: false
            }
          }]
        },
        tooltips: {
            mode: 'nearest'
        },
        legend: {
          display: true
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