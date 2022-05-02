<template>
  <div class="main">
    <h1>ranked puzzles</h1>
    <div class="puzzle" v-for="puzzle in puzzles" :key="puzzle._id">
      <h1>{{ puzzle.title }}</h1>
      <h2>difficulty: {{ puzzle.difficulty }}</h2>
      <h2>times completed: {{ puzzle.timesCompleted }}</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /srcimport HelloWorld from '@/components/HelloWorld.vue';
import { ref } from 'vue';
export default {
  name: 'RankedPuzzles',
  components: {},
  setup() {
    let puzzles = [
      {
        _id: 2672375,
        title: 'Amazing sudoku',
        difficulty: '★★★',
        timesCompleted: 13,
      },
      {
        _id: 2234672375,
        title: 'Amazing puzzle',
        difficulty: '★★★★',
        timesCompleted: 134,
      },
      {
        _id: 2672645375,
        title: 'Amazing puzzle',
        difficulty: '★★★',
        timesCompleted: 13,
      },
      {
        _id: 26765322375,
        title: 'Amazing puzzle',
        difficulty: '★★★',
        timesCompleted: 132,
      },
    ];
    return {
      puzzles,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $color-white;
  h1 {
    font-size: 3rem;
  }
}
.puzzle {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  max-width: 100%;
  margin: 2vh auto;
  border: 2px solid $color-white;
  padding: 2.5rem;
  padding-right: 50%;
  transition-property: border-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  h1 {
    font-size: 2.5rem;
  }
  &:hover {
    cursor: pointer;
    border-color: $color-primary;
    color: $color-primary;
  }
}
</style>
