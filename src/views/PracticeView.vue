<template>
  <div class="view">
    <div v-if="board.length">
      <sudoku-board :board="board" @playerSolution="checkSolution" />
    </div>
    <div v-else class="loading">Loading...</div>
    <div class="sidebar">
      <timer-component :stopTimer="completed" />
      <!-- <div class="timer">{{ timer }}</div> -->
      <button class="temporary" @click.prevent="deletme()">stop timer</button>
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
import TimerComponent from '@/components/TimerComponent.vue';
import { ref, computed } from 'vue';
import { Service } from '@/services';

export default {
  components: {
    SudokuBoard,
    TimerComponent,
  },
  setup() {
    let board = ref([]);
    let solution = [];
    let completed = ref(false);

    function deletme() {
      completed.value = !completed.value;
    }

    async function load() {
      const response = await Service.get('/random');
      console.log(response.data.solution);
      board.value = response.data.puzzle;
      solution = response.data.solution;
    }

    function checkSolution(event) {
      console.log('here is the solution', solution);

      if (JSON.stringify(solution) !== JSON.stringify(event)) {
        console.log('puzzle is not complete', event);
      } else {
        console.log('finished puzzle');
        completed.value = !completed.value;
      }
    }

    load();

    return {
      // timer,
      board,
      solution,
      completed,
      deletme,
      checkSolution,
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
