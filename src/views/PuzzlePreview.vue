<template>
  <h1>puzzle preview</h1>
  <h1>{{ id }}</h1>
</template>
<script>
import { ref } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const id = ref(route.params.id);

    return {
      id,
    };
  },
};
</script>
