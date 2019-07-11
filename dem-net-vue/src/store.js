import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singlePointLocation: null,
    singlePointLocationElevationResult: null,
    dataSets: null,
    initErrors: null,
    clientBusy: false
  },
  mutations: {
    setSinglePointLocation(state, location) {
      state.singlePointLocation = location;
    },
    setSinglePointLocationElevationResult(state, result, location){
      state.singlePointLocationElevationResult = result;
      state.singlePointLocation = location;
      state.clientBusy = false;
    },
    setDatasets(state, datasets) {
      state.dataSets = datasets;
    },
    setError(state, error){
      state.initErrors = error;
    },
    isBusy(state, value) {
      state.clientBusy = value;
    }
  },
  actions: {
    getSinglePointElevation({ commit }, payload){
      const location = payload.location;
      const dataset = payload.dataset;
      commit('isBusy', true);
      axios.get("/api/elevation/", {
        params: {
          lat: location.lat,
          lon: location.lng,
          dataSet: dataset,
        }
      })
      .then(result => commit('setSinglePointLocationElevationResult', result, location));
    },
    getLineElevation({ commit }, payload){
      const geoJson = payload.geoJson.geometry;
      const dataset = payload.dataset;
      commit('isBusy', true);
      axios.post("/api/elevation/line/", {
          line: geoJson,
          dataSet: dataset,
          reduction: 50
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
