<template>
  <div class="view">
    <sudoku-board />
    <div class="sidebar">
      <div class="timer">{{ timer }}</div>
      <h1>how to play?</h1>
      <div>
        <p>click or arrow keys to select cell</p>
        <p>1-9 to insert number</p>
        <p>ctrl + 1-9 to insert note</p>
        <p>delete or backspace to clear cell</p>
      </div>
    </div>
  </div>
</template>

<script>
import SudokuBoard from '@/components/SudokuBoard.vue';
import { ref } from 'vue';
export default {
  components: {
    SudokuBoard,
  },
  setup() {
    let timer = ref('00:00');
    return {
      timer,
    };
  },
};
</script>
<style lang="scss">
@use '@/scss/colors.scss' as *;

* {
  margin: 0;
  padding: 0;
}
.view {
  // background: red;
  display: flex;

  align-items: flex-start;
  flex-flow: wrap;
  width: 100%;
}
.sidebar {
  // background: red;
  margin-top: 10%;
  color: $color-white;
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
  }
}
.timer {
  padding: 10% 0;
  font-size: 4rem;
  color: $color-primary;
}

@media screen and (max-width: 1000px) {
  .view {
    margin: 0 auto;
    width: 50%;
    font-size: 1.5rem;
    align-items: center;
    justify-content: center;
  }
  .sidebar {
    margin-top: 0;
  }
}
</style>
