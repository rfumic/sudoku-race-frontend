<template>
  <game-component v-if="board.length" :board="board" :solution="solution" />
  <div class="loading" v-else>loading...</div>
</template>
<script>
import { ref, computed } from 'vue';
import { Service } from '@/services';
import { useRouter, useRoute } from 'vue-router';
import GameComponent from '@/components/GameComponent.vue';

export default {
  props: ['api_route'],
  components: {
    GameComponent,
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const id = ref(route.params.id);

    let board = ref([]);
    let solution = [];

    async function load() {
      const response = await Service.get(props.api_route);
      // console.log(response.data.solution);
      board.value = response.data.puzzle;
      solution = response.data.solution;
    }

    // debugging
    /*   board.value = [1, null, null];
    solution = [1, 2, 3]; */
    load();

    return {
      board,
      solution,
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
