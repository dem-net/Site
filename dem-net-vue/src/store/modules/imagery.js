
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    providers: null,
    initErrors: null,
  },
  mutations: {
    setProviders(state, providers) {
      state.providers = providers;
    },
    setError(state, error){
      state.initErrors = error;
    }
  },
  actions: {
    getProviders({commit}) {
      axios.get('/api/imagery')
      .then(result => commit('setProviders', result.data))
      .catch(err=> commit('setError', err));
    }
  }
}
