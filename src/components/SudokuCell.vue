<template>
  <div
    class="cell"
    :class="{
      selected: isSelected,
      default: hasDefaultValue,
      highlighted: highLight,
    }"
  >
    <div class="notes" v-show="value.cellNotes">
      <div v-for="note in value.cellNotes" :key="note">{{ note }}</div>
    </div>
    {{ hasDefaultValue ? defaultValue : value.digit }}
  </div>
</template>

<script>
import { ref, computed, watch, reactive, onMounted } from 'vue';
export default {
  props: ['value', 'index', 'currentIndex', 'currentValue'],
  setup(props) {
    let hasDefaultValue = props.value.default;

    let defaultValue = ref(props.value.digit);

    const isSelected = computed(() => {
      return props.index == props.currentIndex;
    });
    const highLight = computed(() => {
      // used for highlighting all cells that contain the same value
      return props.currentValue == ''
        ? false
        : props.currentValue == props.value.digit;
    });

    return {
      isSelected,
      defaultValue,
      hasDefaultValue,
      highLight,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.cell {
  margin: 0;
  padding: 0;
  text-align: center;
  border: 1px solid $color-dark;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e6e6e6;

  color: $color-blue;

  &:hover {
    background: lightslategray;
    cursor: pointer;
  }
}
.highlighted {
  background-color: $color-primary-light;
}
.selected {
  background: $color-primary;
}
.notes {
  min-width: 0;
  width: 100%;
  font-size: 1.2vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  color: $color-complementary;
}
.default {
  color: $color-dark;
}
</style>
