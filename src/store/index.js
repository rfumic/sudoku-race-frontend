import { createStore } from 'vuex';

export default createStore({
  state: {
    authenticated: false,
    userEmail: '',
    username: '',
    currentPuzzle: {},
    // neka id bude key, a vrijeme value
    completedPuzzles: [],
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUserEmail: (state) => state.userEmail,
    getCompletedPuzzles: (state) => state.completedPuzzles,
    getCurrentPuzzle: (state) => state.currentPuzzle,
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
        state.completedPuzzles = user.completedPuzzles;
      } else {
        state.userEmail = user;
        state.authenticated = user;
        state.username = user;
        state.completedPuzzles = user;
      }
    },
    setCurrentPuzzle(state, payload) {
      console.log('setting in vuex', payload.id);
      state.currentPuzzle = { id: payload.id, name: payload.name };
    },
  },
  actions: {},
  modules: {},
});
