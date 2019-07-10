import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singlePointLocation: null,
    singlePointLocationElevationResult: null,
    dataSets: null,
    initErrors: null
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
    },
    setError(state, error){
      state.initErrors = error;
    }
  },
  actions: {
    getSinglePointElevation({ commit }, payload){
      const location = payload.location;
      const dataset = payload.dataset;
      axios.get("/api/elevation/", {
        params: {
          lat: location.lat,
          lon: location.lng,
          dataSet: dataset,
        }
      })
      .then(result => commit('setSinglePointLocationElevationResult', result, location));
    },
    getDatasets({commit}) {
      axios.get('/api/dataset')
      .then(result => commit('setDatasets', result.data))
      .catch(err=> commit('setError', err));
    }
  }
})
