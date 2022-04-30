<template>
  <div class="view">
    <sudoku-board />
  </div>
</template>

<script>
import SudokuBoard from '@/components/SudokuBoard.vue';
export default {
  components: {
    SudokuBoard,
  },
  setup() {},
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
/* .view {
  background: red;
  display: flex;
  flex-direction: column;
} */
</style>
