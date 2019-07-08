import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singlePointLocation: null,
    singlePointLocationElevationResult: null,
  },
  mutations: {
    setSinglePointLocation(state, location) {
      state.singlePointLocation = location;
    },
    setSinglePointLocationElevationResult(state, result, location){
      state.singlePointLocationElevationResult = result;
      state.singlePointLocation = location;
    }
  },
  actions: {
    getSinglePointElevation({ commit, state }, location){
      axios.get("/api/elevation/", {
        params: {
          lat: location.lat,
          lon: location.lng,
          //dataSet: "AW3D30"
        }
      })
      .then(result => commit('setSinglePointLocationElevationResult', result, location));
    }
  }
})
