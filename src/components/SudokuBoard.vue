<template>
  <div class="main">
    <sudoku-cell
      class="cell"
      v-for="(value, index) in playerBoard"
      :key="index"
      :value="value"
      :index="index"
      :currentIndex="currentIndex"
      :currentValue="currentValue"
      @click="setCurrent(index)"
    />
  </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue';
import SudokuCell from '@/components/SudokuCell.vue';
export default {
  props: ['board'],
  components: {
    SudokuCell,
  },
  setup(props, { emit }) {
    onMounted(() => {
      let digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
      // HANDLING KEYBOARD EVENTS
      window.addEventListener('keyup', (e) => {
        e.preventDefault();
        // ADD NOTES
        if (digits.includes(e.key) && e.ctrlKey) {
          addCellNote(
            playerBoard.value[currentIndex.value].cellNotes,
            parseInt(e.key)
          );
        }
        // ENTERING NUMBERS
        else if (
          digits.includes(e.key) &&
          playerBoard.value[currentIndex.value].default == false
        ) {
          setCellValue(parseInt(e.key));
        } // REMOVING SELECTED NUMBER
        else if (e.key == 'Backspace' || e.key == 'Delete') {
          setCellValue('', []);
        }
        // DESELECT CELL
        else if (e.key == 'Escape') {
          currentIndex.value = 100;
        } // ARROW CONTROLS
        else if (e.key == 'ArrowDown') {
          currentIndex.value > 71
            ? (currentIndex.value -= 72)
            : (currentIndex.value += 9);
        } else if (e.key == 'ArrowUp') {
          currentIndex.value < 9
            ? (currentIndex.value += 72)
            : (currentIndex.value -= 9);
        } else if (e.key == 'ArrowLeft') {
          currentIndex.value > 0
            ? (currentIndex.value -= 1)
            : (currentIndex.value += 80);
        } else if (e.key == 'ArrowRight') {
          currentIndex.value < 80
            ? (currentIndex.value += 1)
            : (currentIndex.value -= 80);
        }
      });
    });
    const board = props.board.map((e) =>
      e == null
        ? { digit: '', default: false, cellNotes: [] }
        : { digit: e, default: true, cellNotes: false }
    );

    let playerBoard = ref(board);
    let currentIndex = ref(0);
    let cellNote = ref('');

    let currentValue = computed(() => {
      // used for highlighting all cells that contain the same value
      return playerBoard.value[currentIndex.value].digit || 0;
    });

    function setCurrent(i) {
      currentIndex.value = i;
    }

    function setCellValue(value, notes = false) {
      // SETS THE VALUE OF THE CURRENTLY SELECTED CELL
      playerBoard.value[currentIndex.value] = {
        digit: value,
        default: false,
        cellNotes: notes,
      };
      const playerBoardArray = playerBoard.value.map((e) => e.digit);
      emit('playerSolution', playerBoardArray);
    }
    function addCellNote(notesArray, note) {
      // first check if cell can have notes
      if (notesArray !== false) {
        const indexOf = notesArray.indexOf(note);
        // if value isn't in array push it; if it is remove it
        if (indexOf === -1) {
          notesArray.push(note);
          notesArray.sort();
        } else {
          notesArray.splice(indexOf, 1);
        }
      }
    }
    return {
      playerBoard,
      setCurrent,
      currentIndex,
      cellNote,
      setCellValue,
      addCellNote,
      currentValue,
    };
  },
};
</script>
<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: repeat(9, 5vw);
  grid-template-rows: repeat(9, 5vw);
  justify-content: center;
  align-content: center;
  grid-gap: 0rem;
  list-style: row;
  margin: 0 0 2vw;
  padding: 0;
  font-size: calc(2vw + 0.25em);

  // resizing vvv
  -webkit-transform: scale(0.75);
  -moz-transform: scale(0.75);
  -ms-transform: scale(0.75);
  transform: scale(0.75);
}
.cell {
  &:nth-child(n):nth-child(-n + 9) {
    border-top-width: 0.15em;
  }
  &:nth-child(n + 73):nth-child(-n + 81) {
    border-bottom-width: 0.15em;
  }
  &:nth-child(3n) {
    border-right-width: 0.15em;
  }
  &:nth-child(9n + 1) {
    border-left-width: 0.15em;
  }
  &:nth-child(n + 19):nth-child(-n + 27) {
    border-bottom-width: 0.15em;
  }
  &:nth-child(n + 46):nth-child(-n + 54) {
    border-bottom-width: 0.15em;
  }
}
</style>
