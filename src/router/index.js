import { Auth } from '@/services';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/RegisterView.vue'),
  },
  {
    path: '/match/:id',
    name: 'match',
    component: () =>
      import(/* webpackChunkName: "match" */ '../views/MatchView.vue'),
  },
  {
    path: '/ranked-puzzles',
    name: 'ranked-puzzles',
    component: () =>
      import(
        /* webpackChunkName: "ranked-puzzles" */ '../views/RankedPuzzles.vue'
      ),
  },
  {
    path: '/ranked-puzzles/:id',
    name: 'ranked-puzzle',
    component: () =>
      import(
        /* webpackChunkName: "ranked-puzzles" */ '../views/PuzzlePreview.vue'
      ),
  },
  {
    path: '/practice',
    name: 'practice',
    component: () =>
      import(/* webpackChunkName: "practice" */ '../views/PracticeView.vue'),
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: () =>
      import(
        /* webpackChunkName: "leaderboard" */ '../views/LeaderboardView.vue'
      ),
  },
  {
    path: '/user/:username',
    name: 'profile',
    component: () =>
      import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loginNotNeeded = ['/login', '/register'];
  const needsLogin = !loginNotNeeded.includes(to.path);
  const user = Auth.getUser();

  if (needsLogin && !user) {
    next('/login');
    return;
  } else if (!needsLogin && user) {
    next('/');
    return;
  }
  next();
});

export default router;
