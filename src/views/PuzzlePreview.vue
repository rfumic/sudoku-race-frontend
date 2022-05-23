<template>
  <loading-component v-if="loading" />
  <div class="view" v-else>
    <h1>ranked puzzle</h1>
    <div class="container">
      <h2>{{ puzzleData.name }}</h2>
      <small>date added: {{ puzzleData.dateCreated.substring(0, 10) }}</small>
      <div class="info">
        <div v-if="hasCompletedPuzzle">
          <p>Your time was:</p>
          <p class="time">
            {{ userTime }}
          </p>
        </div>

        <p>difficulty: {{ puzzleData.difficulty }}</p>
        <p @click="likePuzzle" :class="{ like: userLiked }">
          likes: {{ puzzleData.likes.length }}
        </p>
        <p>times completed: {{ puzzleData.playerResults.length }}</p>
      </div>
      <button
        class="play"
        @click="goTo(`/match/${id}`)"
        v-if="!hasCompletedPuzzle"
      >
        play
      </button>
    </div>
    <div class="container" v-if="puzzleData.playerResults.length">
      <h2>ranking</h2>
      <ranking-table
        :headers="['username', 'time', 'points']"
        :rows="puzzleData.playerResults"
      />
    </div>
  </div>
</template>
<script>
import { ref, computed } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
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
    const route = useRoute();
    const store = useStore();

    const id = ref(route.params.id);
    const userEmail = store.getters.getUserEmail;
    let loading = ref(true);
    let puzzleData = ref({});
    let userTime = ref(null);
    let userLiked = ref(false);

    const completedPuzzles = computed(() => store.getters.getCompletedPuzzles);
    const hasCompletedPuzzle = ref(
      completedPuzzles.value.filter((x) => x.id == id.value) != false
    );

    if (hasCompletedPuzzle.value) {
      userTime.value = completedPuzzles.value.filter(
        (x) => x.id == id.value
      )[0].time;
    }

    async function getData() {
      let response;
      response = await Service.get(`/ranked/${id.value}/info`);
      puzzleData.value = response.data;
      console.log(response.data);

      if (puzzleData.value.likes.includes(userEmail)) {
        userLiked.value = true;
      }

      loading.value = false;
    }

    function goTo(path) {
      router.replace(path);
    }

    async function likePuzzle() {
      const response = await Service.post(`/ranked/${id.value}/likes`, {
        userEmail: userEmail,
      });
      userLiked.value = !userLiked.value;

      if (userLiked.value) {
        puzzleData.value.likes.push(userEmail);
      } else {
        puzzleData.value.likes.length -= 1;
      }

      console.log(response.data.message);
    }

    getData();

    return {
      id,
      goTo,
      hasCompletedPuzzle,
      // puzzleName,
      loading,
      puzzleData,
      userTime,
      likePuzzle,
      userLiked,
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
.loading {
  color: $color-white;
  font-family: inherit;
  font-size: 2rem;
}

.play {
  width: 50%;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  color: $color-dark;
  border: none;
  background-color: $color-primary;
  box-shadow: 3px 3px 0 0 $color-white;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 0 0 0 $color-white;
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
  .info {
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
  }
}

.like {
  color: $color-primary;
}
</style>
