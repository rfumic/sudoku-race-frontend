<template>
  <div class="view">
    <div v-if="board.length">
      <sudoku-board :board="board" />
    </div>
    <div v-else class="loading">Loading...</div>
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
import { ref, computed } from 'vue';
import { Service } from '@/services';
export default {
  components: {
    SudokuBoard,
  },
  setup() {
    let board = ref([]);
    let solution = ref([]);

    async function load() {
      const response = await Service.get('/random');
      console.log(response.data.puzzle);
      board.value = response.data.puzzle;
      solution.value = response.data.solution;
    }

    // MAKE THIS A COMPONENT VVVVV
    let timer = computed(() => {
      const date = new Date(null);
      date.setSeconds(elapsedTime.value / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(':') - 2, 8);
    });

    let otherTimer = ref(undefined);
    let elapsedTime = ref(0);
    function startTimer() {
      otherTimer.value = setInterval(() => {
        elapsedTime.value += 1000;
      }, 1000);
    }

    load();
    startTimer();

    return {
      timer,
      board,
      solution,
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
  font-size: 1.5rem;
  color: $color-primary;
}
.loading {
  margin: 0 auto;
  padding: 2em;
  color: $color-white;
  font-size: 6rem;
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
