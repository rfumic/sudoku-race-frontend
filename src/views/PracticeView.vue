<template>
  <div class="view">
    <div v-if="board.length">
      <sudoku-board :board="board" @playerSolution="checkSolution" />
    </div>
    <div v-else class="loading">Loading...</div>
    <div class="sidebar">
      <timer-component :stopTimer="completed" @time="modalMessage" />
      <h1>how to play?</h1>
      <div>
        <p>click or arrow keys to select cell</p>
        <p>1-9 to insert number</p>
        <p>ctrl + 1-9 to insert note</p>
        <p>delete or backspace to clear cell</p>
      </div>
      <h1 v-show="completed">good job!</h1>
      <teleport to="body">
        <div class="modal" v-if="showModal">
          <notification-modal
            @close="showModal = false"
            title="good job!"
            :message="time"
          />
        </div>
      </teleport>
    </div>
  </div>
</template>
<script>
import SudokuBoard from '@/components/SudokuBoard.vue';
import TimerComponent from '@/components/TimerComponent.vue';
import { ref, computed } from 'vue';
import { Service } from '@/services';
import NotificationModal from '@/components/NotificationModal.vue';

export default {
  components: {
    SudokuBoard,
    TimerComponent,
    NotificationModal,
  },
  setup() {
    let board = ref([]);
    let solution = [];
    let completed = ref(false);
    let showModal = ref(false);
    let time = ref(null);

    function modalMessage(event) {
      time.value = `your time was ${event.value}`;
    }

    async function load() {
      const response = await Service.get('/random');
      console.log(response.data.solution);
      board.value = response.data.puzzle;
      solution = response.data.solution;
    }

    function checkSolution(event) {
      if (JSON.stringify(solution) !== JSON.stringify(event)) {
        console.log('puzzle is not complete', event);
      } else {
        console.log('finished puzzle');
        completed.value = !completed.value;
        showModal.value = !showModal.value;
      }
    }

    /*  // debugging
    board.value = [1, null, null];
    solution = [1, 2, 3]; */
    load();

    return {
      board,
      solution,
      completed,
      modalMessage,
      checkSolution,
      showModal,
      time,
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
  position: relative;
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
.modal {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  div {
    font-size: 2rem;
    background-color: $color-white;
    padding: 50px;
    border-radius: 10px;
    button {
      width: 100%;
      cursor: pointer;
      font-family: inherit;
      font-size: 1.15rem;
      color: $color-dark;
      border: none;
      background-color: $color-primary;
      padding: 0.75em 1.25rem;
      box-shadow: 3px 3px 0 0 $color-white;
      transition: box-shadow 0.2s ease-in-out;

      &:hover {
        box-shadow: 0 0 0 0 $color-white;
      }
    }
  }
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
