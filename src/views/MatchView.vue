<template>
  <game-component
    v-if="board.length"
    :board="board"
    :solution="solution"
    @puzzleCompleted="saveResult"
  />
  <div class="loading" v-else>loading...</div>
</template>
<script>
import { ref, computed } from 'vue';
import { Service } from '@/services';
import { useRouter, useRoute } from 'vue-router';
import GameComponent from '@/components/GameComponent.vue';
import { useStore } from 'vuex';

export default {
  components: {
    GameComponent,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const id = ref(route.params.id);
    const userEmail = computed(() => store.getters.getUserEmail);

    let board = ref([]);
    let solution = [];

    async function load() {
      const response = await Service.get(`/ranked/${id.value}`);
      // console.log(response.data.solution);
      board.value = response.data.puzzle;
      solution = response.data.solution;
    }

    async function saveResult(event) {
      try {
        // patch request to backend
        const userResult = {
          // [id.value]: event,
          id: id.value,
          time: event,
        };
        const response = await Service.patch(
          `/users/results/${userEmail.value}`,
          userResult
        );
        console.log('response.data', response.data);
        console.log('storing user results', event);

        // commit response to vuex
        store.commit('setAuthenticated', response.data);

        router.replace('/ranked-puzzles');
      } catch (err) {
        console.error(err);
      }
    }

    // debugging
    board.value = [1, null, null];
    solution = [1, 2, 3];
    // load();

    return {
      board,
      solution,
      saveResult,
    };
  },
};
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.loading {
  margin: 0 auto;
  padding: 2em;
  color: $color-white;
  font-size: 6rem;
}
</style>
