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
    setAuthenticated(state, payload) {
      state.authenticated = payload.authenticated;
      state.userEmail = payload.email;
    },
    setState(state) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        state.userEmail = user.email;
        state.authenticated = !!user.email;
      } else {
        state.userEmail = user;
        state.authenticated = user;
      }
    },
  },
  actions: {},
  modules: {},
});
