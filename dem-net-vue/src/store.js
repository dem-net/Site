import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singlePointLocation: null,
    singlePointLocationElevationResult: null,
    dataSets: null
  },
  mutations: {
    setSinglePointLocation(state, location) {
      state.singlePointLocation = location;
    },
    setSinglePointLocationElevationResult(state, result, location){
      state.singlePointLocationElevationResult = result;
      state.singlePointLocation = location;
    },
    setDatasets(state, datasets) {
      state.dataSets = datasets;
    }
  },
  actions: {
    getSinglePointElevation({ commit }, location){
      axios.get("/api/elevation/", {
        params: {
          lat: location.lat,
          lon: location.lng,
          //dataSet: "AW3D30"
        }
      })
      .then(result => commit('setSinglePointLocationElevationResult', result, location));
    },
    getDatasets({commit}) {
      axios.get('/api/dataset')
      .then(result => commit('setDatasets', result.data));
    }
  }
})
