<template>
  <div class="view">
    <div>
      <sudoku-board :board="board" @playerSolution="checkSolution" />
    </div>
    <div class="sidebar">
      <timer-component :stopTimer="completed" @time="saveTime" />
      <h1>how to play?</h1>
      <div>
        <p>click or arrow keys to select cell</p>
        <p>1-9 to insert number</p>
        <p>ctrl + 1-9 to insert note</p>
        <p>delete or backspace to clear cell</p>
      </div>
      <teleport to="body">
        <div class="modal" v-if="showModal">
          <notification-modal
            @close="closeModal"
            title="good job!"
            :message="modalMessage"
          />
        </div>
      </teleport>
    </div>
  </div>
</template>
<script>
import SudokuBoard from '@/components/SudokuBoard.vue';
import TimerComponent from '@/components/TimerComponent.vue';
import NotificationModal from '@/components/NotificationModal.vue';
import { ref, computed } from 'vue';

export default {
  props: ['board', 'solution'],
  emit: ['puzzleCompleted'],
  components: {
    SudokuBoard,
    TimerComponent,
    NotificationModal,
  },
  setup(props, ctx) {
    let board = ref(props.board);
    let solution = ref(props.solution);
    let completed = ref(false);
    let showModal = ref(false);
    let time = ref(null);

    const modalMessage = computed(() => `your time was ${time.value}`);

    function saveTime(event) {
      time.value = event.value;
    }

    function checkSolution(event) {
      if (JSON.stringify(solution.value) === JSON.stringify(event)) {
        completed.value = !completed.value;
        showModal.value = !showModal.value;
      }
    }

    function closeModal() {
      ctx.emit('puzzleCompleted', time.value);
      showModal.value = false;
    }

    return {
      board,
      solution,
      completed,
      modalMessage,
      checkSolution,
      showModal,
      time,
      closeModal,
      saveTime,
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
  display: flex;
  align-items: flex-start;
  flex-flow: wrap;
  width: 100%;
  position: relative;
}
.sidebar {
  margin-top: 10%;
  color: $color-white;
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
  }
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
    padding: 5%;
    border-radius: 10px;
    button {
      width: 100%;
      cursor: pointer;
      font-family: inherit;
      font-size: 1.15rem;
      margin-top: 5%;
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
