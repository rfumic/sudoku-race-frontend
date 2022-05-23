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
import { ref } from 'vue';
import { Service } from '@/services';
import GameComponent from '@/components/GameComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    GameComponent,
    LoadingComponent,
  },
  setup() {
    const router = useRouter();

    let board = ref([]);
    let solution = [];

    async function load() {
      const response = await Service.get('/random');
      // console.log(response.data.solution);
      board.value = response.data.puzzle;
      solution = response.data.solution;
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
