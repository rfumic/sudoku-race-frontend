<template>
  <nav-bar></nav-bar>
  <div class="view">
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
  setup() {},
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
