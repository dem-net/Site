import Vue from 'vue';
import Vuex from 'vuex';

import datasetsModule from './modules/datasets'
import imageryModule from './modules/imagery'
import pointsModule from './modules/points'
import linesModule from './modules/lines'
import terrainModule from './modules/terrain'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    datasets: datasetsModule,
    lines: linesModule,
    points: pointsModule,
    imagery: imageryModule,
    terrain: terrainModule
  }
})
