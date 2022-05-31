import store from '@/store';
import axios from 'axios';
import $router from '@/router';

const Service = axios.create({
  baseURL: 'https://gentle-mountain-95216.herokuapp.com/',
  timeout: 1000,
});

Service.interceptors.request.use((request) => {
  try {
    request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
  } catch (error) {
    console.error(error);
  }
  return request;
});

Service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      Auth.logout();
      $router.go();
    }
  }
);

const Users = {
  getAll(searchTerm = '') {
    return Service.get('/users' + searchTerm);
  },
};

const Auth = {
  async register(email, username, password) {
    try {
      await Service.post('/users', {
        email,
        username,
        password,
      });
      await this.login(email, password);
    } catch (error) {
      throw new Error(error.response.data.error);
    }
    return true;
  },
  async login(email, password) {
    try {
      const response = await Service.post('/auth', {
        email,
        password,
      });
      if (!response) {
        throw new Error();
      } else {
        const user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        store.commit('setAuthenticated', {
          authenticated: true,
          email: user.email,
          username: user.username,
          completedPuzzles: user.completedPuzzles,
        });
      }
    } catch (error) {
      throw new Error('error logging in');
    }
    return true;
  },
  logout() {
    localStorage.removeItem('user');
    store.commit('clearState');
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  },
  getToken() {
    const user = this.getUser();
    if (user && user.token) {
      return user.token;
    } else {
      return false;
    }
  },
};

export { Service, Users, Auth };
