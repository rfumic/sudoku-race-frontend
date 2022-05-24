<template>
  <loading-component v-if="loading" />
  <div class="view" v-else>
    <h1>leaderboard</h1>

    <div class="container">
      <div class="sorting">
        <label>Sort by: </label>
        <select v-model="selectedSort">
          <option v-for="sorting in sortingOptions" :key="sorting">
            {{ sorting }}
          </option>
        </select>
      </div>
      <ranking-table
        :headers="['username', 'total points', 'completed']"
        :rows="leaderboard"
      />
    </div>
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
    let loading = ref(true);
    let leaderboard = ref([]);

    const sortingOptions = ref(['most points', 'most completed']);
    let selectedSort = ref(sortingOptions.value[0]);

    async function getData(query = '?') {
      loading.value = true;

      const response = await Service.get(`/users${query}`);
      response.data.forEach((user) => {
        user.totalPoints = user.totalPoints || 0; // remove from final
        delete user._id;
      });
      leaderboard.value = response.data;

      loading.value = false;
    }

    watch(selectedSort, async () => {
      let query = '?sort=';
      switch (selectedSort.value) {
        case 'most points': {
          query += '-totalPoints';
          break;
        }
        case 'most completed': {
          query += '-numberOfCompleted';
          break;
        }
      }

      await getData(query);
    });

    getData();
    return {
      loading,
      leaderboard,
      sortingOptions,
      selectedSort,
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
  // flex-flow: wrap;
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
  align-items: center;
  width: 100%;
  /*   .info {
    width: 100%;

    p {
      padding: 2%;
      font-size: 1.5rem;
    }
    .time {
      font-weight: bold;
      font-size: 2.5rem;
    }
  }

  small {
    padding: 2%;
    font-size: 1rem;
  }
  button {
    padding: 1rem;
  } */
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
</style>
