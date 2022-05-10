<template>
  <h1>puzzle preview</h1>
  <h1>{{ id }}</h1>
</template>
<script>
import { ref, computed } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const completedPuzzles = computed(() => store.state.completedPuzzles);

    const router = useRouter();
    const route = useRoute();

    const id = ref(route.params.id);

    return {
      id,
    };
  },
};
</script>
