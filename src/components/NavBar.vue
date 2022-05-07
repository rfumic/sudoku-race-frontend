<template>
  <nav class="navbar">
    <div @click="goTo('/')" class="brand"><i> sudoku-race </i></div>
    <a class="hamburger-button" @click="openMenu()">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </a>
    <div class="navbar-links" :class="{ active: hamburger }">
      <ul>
        <li>
          <p>{{ username }}</p>
        </li>
        <li><p>leaderboard</p></li>
        <li><p>settings</p></li>
        <li><p @click="logout">logout</p></li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { ref, computed } from 'vue';
import { Auth } from '@/services';
import { useRouter } from 'vue-router';

export default {
  props: ['username'],
  setup(props) {
    const router = useRouter();
    let hamburger = ref(false);
    const openMenu = () => (hamburger.value = !hamburger.value);

    function logout() {
      Auth.logout();
      router.go();
    }
    function goTo(path) {
      router.push(path);
    }

    return {
      hamburger,
      logout,
      openMenu,
      goTo,
    };
  },
};
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;
* {
  box-sizing: border-box;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $color-white;
  border-bottom: 2px solid $color-white;
}
.brand {
  padding-left: 5rem;
  font-size: 1.5rem;
  margin: 0.5rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: $color-primary;
    cursor: pointer;
  }
}
.navbar-links {
  padding-right: 5rem;
  ul {
    margin: 0;
    padding: 0;
    display: flex;
  }
  li {
    list-style: none;
    p {
      text-decoration: none;
      color: $color-white;
      padding: 1rem;
      display: block;
      cursor: pointer;
    }
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
      box-shadow: 0px 2px 0 0 $color-primary;
    }
  }
}

.hamburger-button {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  .bar {
    height: 3px;
    width: 100%;
    background: $color-white;
    border-radius: 10px;
  }
}
@media (max-width: 720px) {
  .brand {
    text-align: center;
    padding: 0;
  }
  .hamburger-button {
    display: flex;
    &:hover {
      cursor: pointer;
    }
  }
  .navbar-links {
    font-size: 1.5rem;
    padding: 0;

    display: none;
    width: 100%;
    ul {
      width: 100%;
      flex-direction: column;
    }
    li {
      text-align: center;
    }
    p {
      padding: 0.5rem 1rem;
    }
  }
  .active {
    display: flex;
  }
  .navbar {
    flex-direction: column;
    align-items: center;
  }
}
</style>
