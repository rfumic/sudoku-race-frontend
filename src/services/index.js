import store from '@/store';
import axios from 'axios';

const Service = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 1000,
});

const Users = {
  getAll(searchTerm = '') {
    return Service.get('/users' + searchTerm);
  },
};

const Auth = {
  async login(email, password) {
    const response = await Service.post('/auth', {
      email: email,
      password: password,
    });
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    store.commit('setAuthenticated', {
      authenticated: true,
      email: user.email,
    });
    return true;
  },
  logout() {
    localStorage.removeItem('user');
    store.commit('setAuthenticated', {
      authenticated: false,
      email: '',
    });
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  },
};

export { Service, Users, Auth };
