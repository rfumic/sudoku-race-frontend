<template>
  <loading-component v-if="loading" />
  <div class="main" v-else>
    <h1>ranked puzzles</h1>
    <div class="sorting">
      <select v-model="selectedSort">
        <option v-for="sorting in sortingOptions" :key="sorting">
          {{ sorting }}
        </option>
      </select>
    </div>
    <div
      class="puzzle"
      v-for="puzzle in puzzles"
      :key="puzzle._id"
      @click="goTo({ id: puzzle._id, name: puzzle.name })"
    >
      <div class="puzzleInfo">
        <h1>{{ puzzle.name }}</h1>
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
    <button class="loadMore" @click="loadMore" v-if="showLoadMore">
      load more
    </button>
  </div>
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import { Service } from '@/services';

export default {
  name: 'RankedPuzzles',
  components: {
    LoadingComponent,
  },
  setup() {
    const store = useStore();
    let puzzles = ref([]);

    let loading = ref(true);
    let showLoadMore = ref(true);
    let skip = 0;
    let hasMoreData = false;

    const sortingOptions = ref(['newest', 'most completed', 'most liked']);
    let selectedSort = ref(sortingOptions.value[0]);
    const completedPuzzles = ref(store.getters.getCompletedPuzzles);

    async function getData(query = '') {
      try {
        const response = await Service.get(`/ranked?skip=${skip}&${query}`);
        response.data.puzzles.forEach((e) => {
          puzzles.value.push({
            _id: e._id,
            dateCreated: e.dateCreated.substring(0, 10),
            name: e.name,
            playerResults: e.playerResults,
            likes: e.likes,
          });
        });
        hasMoreData = response.data.meta.hasMoreData;
        showLoadMore.value = hasMoreData;
      } catch (err) {
        console.error(err);
      }
    }

    function loadMore() {
      if (hasMoreData) {
        skip += 10;
        getData();
      }
    }

    function goTo(puzzle) {
      router.push(`/ranked-puzzles/${puzzle.id}`);
    }

    watch(selectedSort, async () => {
      puzzles.value = [];
      skip = 0;
      let query = 'sort=';
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
          query += '-numberOfLikes';
          break;
        }
      }
      await getData(query);
    });

    (async () => {
      await getData();
      loading.value = false;
    })();
    return {
      puzzles,
      goTo,
      completedPuzzles,
      sortingOptions,
      selectedSort,
      loading,
      loadMore,
      showLoadMore,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

@mixin hover-effect {
  transition-property: border-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  &:hover {
    cursor: pointer;
    border-color: $color-primary;
    color: $color-primary;
  }
}

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
  justify-content: space-between;
  @include hover-effect;
  h1 {
    font-size: 2.5rem;
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

.loadMore {
  padding: 1%;
  font-size: 1rem;
  border: 1px solid $color-white;
  background-color: $color-dark;
  color: $color-white;
  text-align: center;
  @include hover-effect;
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
