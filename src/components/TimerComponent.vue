<template>
  <div class="timer">{{ formattedTimer }}</div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';

export default {
  props: ['stopTimer'],
  setup(props) {
    let formattedTimer = computed(() => {
      const date = new Date(null);
      date.setSeconds(elapsedTime.value / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(':') - 2, 8);
    });

    let timer = ref(undefined);
    let elapsedTime = ref(0);
    function startTimer() {
      timer.value = setInterval(() => {
        elapsedTime.value += 1000;
      }, 1000);
    }
    watchEffect(() => {
      console.log(props.stopTimer);
      if (!props.stopTimer) {
        startTimer();
      } else {
        stop();
      }
    });

    function stop() {
      console.log('timer stopped');
      clearInterval(timer.value);
    }

    //startTimer();

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
