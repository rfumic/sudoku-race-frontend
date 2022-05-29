import { createStore } from 'vuex';

export default createStore({
  state: {
    authenticated: false,
    userEmail: '',
    username: '',
    currentPuzzle: {},
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
      state.authenticated = payload.authenticated || !!payload.password;
      state.userEmail = payload.email;
      state.username = payload.username;
      state.completedPuzzles = payload.completedPuzzles;
      let storage = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({ ...storage, ...payload }));
    },
    clearState(state) {
      state.authenticated = null;
      state.userEmail = null;
      state.username = null;
      state.completedPuzzles = null;
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
