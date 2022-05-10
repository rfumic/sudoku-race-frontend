import { createStore } from 'vuex';

export default createStore({
  state: {
    authenticated: false,
    userEmail: '',
    username: '',
    completedPuzzles: [],
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUserEmail: (state) => state.userEmail,
  },
  mutations: {
    setAuthenticated(state, payload) {
      state.authenticated = payload.authenticated;
      state.userEmail = payload.email;
      state.username = payload.username;
      state.completedPuzzles = payload.completedPuzzles;
    },
    setState(state) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        state.userEmail = user.email;
        state.authenticated = !!user.email;
        state.username = user.username;
      } else {
        state.userEmail = user;
        state.authenticated = user;
        state.username = user;
      }
    },
  },
  actions: {},
  modules: {},
});
