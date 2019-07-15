import axios from 'axios';

export default {
  namespaced: true,
  state: {
    singlePointLocation: null,
    singlePointLocationElevationResult: null,

    clientBusy: false,
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
  }
}
