<template>
  <div class="timer">{{ formattedTimer }}</div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';

export default {
  props: ['stopTimer'],
  setup(props, { emit }) {
    let timer = ref(undefined);
    let elapsedTime = ref(0);

    let formattedTimer = computed(() => {
      const date = new Date(null);
      date.setSeconds(elapsedTime.value / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(':') - 2, 8);
    });

    function startTimer() {
      timer.value = setInterval(() => {
        elapsedTime.value += 1000;
      }, 1000);
    }
    watchEffect(() => {
      if (!props.stopTimer) {
        startTimer();
      } else {
        stop();
      }
    });

    function stop() {
      emit('time', formattedTimer);
      clearInterval(timer.value);
    }

    return {
      formattedTimer,
      stop,
    };
  },
};
</script>

<style lang="scss">
@use '@/scss/colors.scss' as *;
.timer {
  padding: 10% 0;
  font-size: 1.5rem;
  color: $color-primary;
}
</style>
