<template>
  <div class="home">
    <div
      class="container"
      @click="goToRanked()"
      data-tooltip="play against other players to earn points"
    >
      <img src="../assets/ranked-game.png" alt="ranked game" class="logo" />
      join a ranked game
    </div>
    <div
      class="container"
      @click="goToSolo()"
      data-tooltip="play solo to practice your skills"
    >
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
    let show1 = false,
      show2 = false;
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
  flex-flow: wrap;
  text-align: center;
  align-items: center;
  margin-top: 10%;
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
  position: relative;
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

.container::before,
.container::after {
  --scale: 0;
  --arrow-size: 10px;
  --tooltip-color: #333;
  font-size: 1.5rem;

  position: absolute;
  top: -0.25rem;
  left: 50%;
  transform: translateX(-50%) translateY(var(--translate-y, 0))
    scale(var(--scale));
  transition: 0.2s transform;
  transform-origin: bottom center;
}

.container::before {
  --translate-y: calc(-100% - var(--arrow-size));

  content: attr(data-tooltip);
  color: $color-white;
  padding: 0.5rem;
  border-radius: 0.3rem;
  text-align: center;
  width: max-content;
  max-width: 100%;
  background: var(--tooltip-color);
}

.container:hover::before,
.container:hover::after {
  --scale: 1;
}

.container::after {
  --translate-y: calc(-1 * var(--arrow-size));

  content: '';
  border: var(--arrow-size) solid transparent;
  border-top-color: var(--tooltip-color);
  transform-origin: top center;
}

@media screen and (max-width: 650px) {
  .home {
    width: 50%;
    font-size: 1.5rem;
  }
}
</style>
