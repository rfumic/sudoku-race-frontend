<template>
  <div class="view">
    <h1 class="title">ranked puzzle</h1>
    <div class="container">
      <!-- dateCreated timesCompleted likes name difficulty -->
      <h2>{{ puzzleName }}</h2>
      <small>date added: 12039</small>
      <div class="info">
        <p>difficulty: ***</p>
        <p>likes: 54</p>
        <p>times completed: 89</p>
      </div>
      <button
        class="play"
        @click="goTo(`/match/${id}`)"
        v-if="!hasCompletedPuzzle"
      >
        play
      </button>
    </div>
    <div class="container">
      <h2>ranking</h2>
      <div class="ranking">
        <ol>
          <li>
            <h2>username: time</h2>
          </li>
          <li>
            <h2>username: time</h2>
          </li>
          <li>
            <h2>username: time</h2>
          </li>
          <li>
            <h2>username: time</h2>
          </li>
          <li>
            <h2>username: time</h2>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const id = ref(route.params.id);

    const completedPuzzles = computed(() => store.getters.getCompletedPuzzles);
    const puzzleName = computed(() => store.getters.getCurrentPuzzle.name);
    const hasCompletedPuzzle = computed(() => {
      completedPuzzles.value.some((obj) => Object.keys(obj).includes(id.value));
    });

    function goTo(path) {
      router.push(path);
    }

    return {
      id,
      goTo,
      hasCompletedPuzzle,
      puzzleName,
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

/* .title {
  font-size: 3em;
  color: $color-white;
} */

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
  }
  small {
    padding: 2%;
    font-size: 1rem;
  }
  button {
    padding: 1rem;
  }
}
.ranking {
  font-size: 1rem;
}
</style>
