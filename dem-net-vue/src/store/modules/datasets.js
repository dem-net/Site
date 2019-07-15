import axios from 'axios';

export default {
  namespaced: true,
  state: {
    dataSets: null,
    initErrors: null,
  },
  mutations: {
    setDatasets(state, datasets) {
      state.dataSets = datasets;
    },
    setError(state, error){
      state.initErrors = error;
    }
  },
  actions: {
    getDatasets({commit}) {
      axios.get('/api/dataset')
      .then(result => commit('setDatasets', result.data))
      .catch(err=> commit('setError', err));
    }
  }
}
