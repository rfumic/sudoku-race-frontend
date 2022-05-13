<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <button @click="emit('close')">close</button>
  </div>
</template>

<script>
export default {
  props: ['message', 'title'],
  setup(props, { emit }) {
    return {
      emit,
    };
  },
};
</script>
