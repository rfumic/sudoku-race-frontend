import store from '@/store';
import axios from 'axios';
// import { useRouter } from 'vue-router';
import $router from '@/router';
// const router = useRouter();

const Service = axios.create({
  baseURL: 'http://localhost:4000/',
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
      const response = await Service.post('/users', {
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
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      store.commit('setAuthenticated', {
        authenticated: true,
        email: user.email,
        username: user.username,
        completedPuzzles: user.completedPuzzles,
      });
    } catch (error) {
      throw new Error(error.response.data.error);
    }
    return true;
  },
  logout() {
    localStorage.removeItem('user');
    store.commit('setAuthenticated', {
      authenticated: false,
      email: '',
      username: '',
      completedPuzzles: [],
    });
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
