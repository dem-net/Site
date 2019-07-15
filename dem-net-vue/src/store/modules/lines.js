import axios from 'axios';

export default {
  namespaced: true,
  state: {
    lineElevationResult: null,
    line: null,
    lineDataSet: null,
    reduceFactor: 50,
  },
  mutations: {
    setLine(state, payload) {
      state.lineDataSet = payload.dataset;
      state.line = payload.geoJson;
      state.reduceFactor = payload.reduce;
    },
    setLineElevationResult(state, result){
      state.lineElevationResult = result;
      state.clientBusy = false; 
    },
    isBusy(state, value) {
      state.clientBusy = value;
    }
  },
  actions: {
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
  }
}
