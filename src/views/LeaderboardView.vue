<template>
  <loading-component v-if="loading" />
  <div class="view" v-else>
    <h1>leaderboard</h1>

    <div class="container">
      <div class="sorting">
        <label>sort by: </label>
        <select v-model="selectedSort">
          <option v-for="sorting in sortingOptions" :key="sorting">
            {{ sorting }}
          </option>
        </select>
      </div>
      <ranking-table
        :headers="['username', 'total played', 'total points']"
        :rows="leaderboard"
        @clicked="goToProfile"
      />
    </div>
    <button class="loadMore" @click="loadMore" v-if="showLoadMore">
      load more
    </button>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Service } from '@/services';
import RankingTable from '@/components/RankingTable.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

export default {
  components: {
    RankingTable,
    LoadingComponent,
  },
  setup() {
    const router = useRouter();

    let loading = ref(true);
    let leaderboard = ref([]);
    let showLoadMore = ref(true);

    let skip = 0;
    let hasMoreData = false;
    let query = '';

    const sortingOptions = ref(['most points', 'most played']);
    let selectedSort = ref(sortingOptions.value[0]);

    async function getData() {
      const response = await Service.get(`/users?skip=${skip}&${query}`);
      // leaderboard.value = response.data.users;
      response.data.users.forEach((user) => {
        user.totalPoints = user.totalPoints || 0; // remove from final
        delete user._id;
        leaderboard.value.push(user);
      });
      hasMoreData = response.data.meta.hasMoreData;
      showLoadMore.value = hasMoreData;
    }

    function goToProfile(event) {
      router.push(`/user/${event.username}`);
    }

    function loadMore() {
      if (hasMoreData) {
        skip += 5;
        getData();
      }
    }
    watch(selectedSort, async () => {
      leaderboard.value = [];
      skip = 0;
      query = 'sort=';
      switch (selectedSort.value) {
        case 'most points': {
          query += '-totalPoints';
          break;
        }
        case 'most played': {
          query += '-numberOfCompleted';
          break;
        }
      }
      loading.value = true;
      await getData(query);
      loading.value = false;
    });

    (async () => {
      await getData();
      loading.value = false;
    })();
    return {
      loading,
      leaderboard,
      sortingOptions,
      selectedSort,
      goToProfile,
      loadMore,
      showLoadMore,
    };
  },
};
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.view {
  color: $color-white;
  font-family: inherit;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  h1 {
    font-size: 3rem;
  }
}

.container {
  border: 2px solid $color-white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  max-width: 100%;
  align-items: center;
  width: 100%;
}

.sorting {
  width: 50%;
  padding: 1%;
  font-size: 1.5rem;
  select {
    padding: 2%;
    font-size: 1rem;
    border: none;
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
  transition-property: border-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  &:hover {
    cursor: pointer;
    border-color: $color-primary;
    color: $color-primary;
  }
}
@media (max-width: 770px) {
  .view {
    h1 {
      font-size: 1.5rem;
    }
  }
  .container {
    width: 75%;
  }
}
</style>
