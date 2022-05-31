<template>
  <game-component
    v-if="board.length"
    :board="board"
    :solution="solution"
    @puzzleCompleted="router.replace('/')"
  />
  <loading-component v-else />
</template>
<script>
import LoadingComponent from '@/components/LoadingComponent.vue';
import GameComponent from '@/components/GameComponent.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Service } from '@/services';

export default {
  components: {
    GameComponent,
    LoadingComponent,
  },
  setup() {
    const router = useRouter();

    let board = ref([]);
    let solution = ref([]);

    async function load() {
      const response = await Service.get('/random');
      board.value = response.data.puzzle;
      solution.value = response.data.solution;
    }

    /*     // debugging
    board.value = [1, null, null];
    solution = [1, 2, 3]; */
    load();

    return {
      board,
      solution,
      router,
    };
  },
};
</script>
<style lang="scss">
@use '@/scss/colors.scss' as *;

.loading {
  margin: 0 auto;
  padding: 2em;
  color: $color-white;
  font-size: 6rem;
}
</style>
