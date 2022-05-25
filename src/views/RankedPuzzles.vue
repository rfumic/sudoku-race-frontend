<template>
  <div class="main">
    <h1>ranked puzzles</h1>
    <div class="sorting">
      <select v-model="selectedSort">
        <option v-for="sorting in sortingOptions" :key="sorting">
          {{ sorting }}
        </option>
      </select>
    </div>
    <loading-component v-if="loading" />
    <div
      v-else
      class="puzzle"
      v-for="puzzle in puzzles"
      :key="puzzle._id"
      @click="goTo({ id: puzzle._id, name: puzzle.name })"
    >
      <div class="puzzleInfo">
        <h1>{{ puzzle.name }}</h1>
        <h2>difficulty: {{ puzzle.difficulty }}</h2>
        <h2>times completed: {{ puzzle.playerResults.length }}</h2>
        <h2>likes: {{ puzzle.likes.length }}</h2>
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
import { ref, watch } from 'vue';
import { Service } from '@/services';
import router from '@/router';
import { useStore } from 'vuex';
import LoadingComponent from '@/components/LoadingComponent.vue';

export default {
  name: 'RankedPuzzles',
  components: {
    LoadingComponent,
  },
  setup() {
    const store = useStore();
    let puzzles = ref([]);

    let loading = ref(true);

    const sortingOptions = ref([
      'newest',
      'most completed',
      'most liked',
      'easiest',
      'hardest',
    ]);
    let selectedSort = ref(sortingOptions.value[0]);
    const completedPuzzles = ref(store.getters.getCompletedPuzzles);

    async function getData(query = '?') {
      loading.value = true;
      try {
        const response = await Service.get(`/ranked${query}`);
        puzzles.value = [];
        response.data.forEach((e) => {
          puzzles.value.push({
            _id: e._id,
            dateCreated: e.dateCreated.substring(0, 10),
            difficulty: e.difficulty,
            name: e.name,
            playerResults: e.playerResults,
            likes: e.likes,
          });
        });
        loading.value = false;
      } catch (err) {
        console.error(err);
      }
    }

    function goTo(puzzle) {
      router.push(`/ranked-puzzles/${puzzle.id}`);
    }

    watch(selectedSort, async () => {
      let query = '?sort=';
      switch (selectedSort.value) {
        case 'newest': {
          query += '-dateCreated';
          break;
        }
        case 'most completed': {
          query += 'playerResults';
          break;
        }
        case 'most liked': {
          query += '-likes';
          break;
        }
        case 'easiest': {
          query += 'difficulty';
          break;
        }
        case 'hardest': {
          query += '-difficulty';
          break;
        }
      }

      await getData(query);
    });

    getData();
    return {
      puzzles,
      goTo,
      completedPuzzles,
      sortingOptions,
      selectedSort,
      loading,
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
.sorting {
  width: 50%;
  padding: 1%;
  select {
    padding: 1%;
    font-size: 1rem;
    border: 1px solid $color-white;
    background-color: $color-primary;
    color: $color-dark;
    appearance: none;
    text-align: center;
  }
}

@media (max-width: 770px) {
  .main {
    h1 {
      font-size: 1.5rem;
    }
  }
  .sorting {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.75rem;
  }
}
</style>
