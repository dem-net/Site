import axios from 'axios';

export default {
  namespaced: true,
  state: {
    lineElevationResult: null,
    line: null,
    lineDataSet: null,
    reduceFactor: 50,
    clientBusy: false,
  },
  mutations: {
    setLineElevationResult(state, result){
      state.lineElevationResult = result.result;
      state.clientBusy = false; 
      state.lineDataSet = result.payload.dataset;
      state.line = result.payload.geoJson;
      state.reduceFactor = result.payload.reduce;
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
      .then(result => commit('setLineElevationResult',  { result: result, payload: payload}));
    },
  }
}
