import { createStore } from 'vuex';

export default createStore({
  state: {
    authenticated: false,
    userEmail: '',
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUserEmail: (state) => state.userEmail,
  },
  mutations: {
    /*     setAuthenticated(state, payload){
      state.authenticated = payload;
      state.userEmail = 'tu stavi email'
    }
 */
  },
  actions: {},
  modules: {},
});
