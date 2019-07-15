import Vue from 'vue';
import Vuex from 'vuex';

import datasetsModule from './modules/datasets'
import pointsModule from './modules/points'
import linesModule from './modules/lines'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    datasets: datasetsModule,
    lines: linesModule,
    points: pointsModule
  }
})
