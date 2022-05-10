<template>
  <div class="main">
    <h1>ranked puzzles</h1>
    <div
      class="puzzle"
      v-for="puzzle in puzzles"
      :key="puzzle._id"
      @click="goTo(`/ranked-puzzles/${puzzle._id}`)"
    >
      <div class="puzzleInfo">
        <h1>{{ puzzle.name }}</h1>
        <h2>difficulty: {{ puzzle.difficulty }}</h2>
        <h2>times completed: {{ puzzle.timesCompleted }}</h2>
        <h3>date added: {{ puzzle.dateCreated }}</h3>
      </div>
      <div class="puzzleDone" v-if="completedPuzzles.includes(puzzle._id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { Service } from '@/services';
import router from '@/router';
import { useStore } from 'vuex';

export default {
  name: 'RankedPuzzles',
  components: {},
  setup() {
    const store = useStore();
    let puzzles = ref([]);
    const completedPuzzles = computed(() => store.state.completedPuzzles);

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
      completedPuzzles,
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
  flex-direction: row;
  cursor: pointer;
  max-width: 100%;
  margin: 2vh auto;
  border: 2px solid $color-white;
  padding: 2.5rem;
  width: 50%;
  // padding-right: 50%;
  transition-property: border-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  justify-content: space-between;

  h1 {
    font-size: 2.5rem;
  }
  &:hover {
    cursor: pointer;
    border-color: $color-primary;
    color: $color-primary;
  }
}

.puzzleDone {
  display: flex;
  align-items: center;
  width: 5%;
  color: $color-primary;
}
</style>
