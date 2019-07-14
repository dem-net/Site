import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singlePointLocation: null,
    singlePointLocationElevationResult: null,

    lineElevationResult: null,
    line: null,

    dataSets: null,
    initErrors: null,
    clientBusy: false,
    lineDataSet: null,
    reduceFactor: 50,
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

    setLine(state, payload) {
      state.lineDataSet = payload.dataset;
      state.line = payload.geoJson;
      state.reduceFactor = payload.reduce;
    },
    setLineElevationResult(state, result){
      state.lineElevationResult = result;
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
      .then(result => commit('setSinglePointLocationElevationResult', result));
    },
    getLineElevation({ commit }, payload){
      const geoJson = payload.geoJson;
      const dataset = payload.dataset;
      const reduceFactor = payload.reduce;
      commit('isBusy', true);
      axios.post("/api/elevation/line/", {
          line: geoJson.geometry,
          dataSetName: dataset,
          reduceResolution: reduceFactor
      })
      .then(result => commit('setLineElevationResult', result, payload));
    },
    getDatasets({commit}) {
      axios.get('/api/dataset')
      .then(result => commit('setDatasets', result.data))
      .catch(err=> commit('setError', err));
    }
  }
})
