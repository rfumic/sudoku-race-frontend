<template>
  <div class="main">
    <h1>ranked puzzles</h1>
    <div
      class="puzzle"
      v-for="puzzle in puzzles"
      :key="puzzle._id"
      @click="goTo(`/ranked-puzzles/${puzzle._id}`)"
    >
      <h1>{{ puzzle.name }}</h1>
      <h2>difficulty: {{ puzzle.difficulty }}</h2>
      <h2>times completed: {{ puzzle.timesCompleted }}</h2>
      <h3>date added: {{ puzzle.dateCreated }}</h3>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Service } from '@/services';
import router from '@/router';

export default {
  name: 'RankedPuzzles',
  components: {},
  setup() {
    let puzzles = ref([]);

    async function loadData() {
      const response = await Service.get('/ranked');
      response.data.forEach((e) => {
        puzzles.value.push({
          _id: e._id,
          dateCreated: e.dateCreated.substring(0, 10),
          difficulty: e.difficulty,
          name: e.name,
          timesCompleted: e.timesCompleted,
        });
      });
    }

    function goTo(path) {
      router.push(path);
    }

    loadData();
    return {
      puzzles,
      goTo,
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
