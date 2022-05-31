<template>
  <nav-bar v-if="isLoggedIn" :username="username" />
  <div class="view">
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();
    // VUEX CHECKS JWT FROM LOCALSTORAGE ON PAGE RELOAD
    store.commit('setState');

    return {
      isLoggedIn: computed(() => store.state.authenticated),
      username: computed(() => store.state.username),
    };
  },
};
</script>

<style lang="scss">
@use '@/scss/colors.scss' as *;

* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}

body {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  background-color: $color-dark;
}
.view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
