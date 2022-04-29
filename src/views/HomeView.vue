<template>
  <div class="home">
    <div class="container" @click="goToRanked()">
      <img src="../assets/ranked-game.png" alt="ranked game" class="logo" />
      join a ranked game
    </div>
    <div class="container" @click="goToSolo()">
      <img src="../assets/solo-game.png" alt="solo game" class="logo" />
      join a solo game
    </div>
  </div>
</template>

<script>
// @ is an alias to /srcimport HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {},
  setup() {
    function goToRanked() {
      console.log('GO TO RANKED GAME');
    }
    function goToSolo() {
      console.log('GO TO SOLO GAME');
    }
    return {
      goToRanked,
      goToSolo,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.home {
  color: $color-white;
  font-family: inherit;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  // background: red;
  flex-flow: wrap;
  text-align: center;
  align-items: center;
}

.container {
  border: 2px solid $color-white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  max-width: 100%;
  transition-property: border-color, color, font-size;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;

  & > * {
    padding: 2rem;
  }
  &:hover {
    cursor: pointer;
    border-color: $color-primary;
    color: $color-primary;
    font-size: 2.25rem;
  }
}
</style>
