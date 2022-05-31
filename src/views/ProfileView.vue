<template>
  <loading-component v-if="!userData" />
  <h1 class="view" v-else-if="error">user doesn't exist</h1>
  <div class="view" v-else>
    <h1>{{ userData.username }}</h1>
    <div class="container">
      <img src="https://i.imgur.com/K6sVdpK.jpeg" alt="user avatar" />
      <div class="info">
        <div>
          date joined:
          <p>{{ userData.dateJoined }}</p>
        </div>
        <div>
          puzzles completed:
          <p>{{ userData.completedPuzzles.length }}</p>
        </div>
        <div>
          total points:
          <p>{{ userData.totalPoints }}</p>
        </div>
        <div>
          average time:
          <p>{{ userData.averageTime }}</p>
        </div>
        <div>
          fastest time:
          <p>{{ userData.fastestTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Service } from '@/services';

export default {
  components: {
    LoadingComponent,
  },
  setup() {
    const route = useRoute();
    const username = ref(route.params.username);
    let userData = ref(false);
    let error = ref(false);

    async function getData() {
      try {
        let response = await Service.get(`/users/${username.value}`);
        userData.value = response.data;
        userData.value.dateJoined = userData.value.dateJoined.substring(0, 10);
        if (userData.value.completedPuzzles.length > 0) {
          userData.value.averageTime = avgTime(userData.value.completedPuzzles);
          userData.value.fastestTime = userData.value.completedPuzzles.sort(
            (a, b) => {
              return isoToSeconds(a.time) - isoToSeconds(b.time);
            }
          )[0].time;
        } else {
          userData.value.averageTime = 'n/a';
          userData.value.fastestTime = 'n/a';
        }
      } catch (err) {
        console.error(err);
        error.value = true;
        userData.value = true;
      }
    }

    function avgTime(puzzles) {
      let seconds = 0;

      for (let i = 0; i < puzzles.length; i++) {
        seconds += isoToSeconds(puzzles[i].time);
      }

      return new Date(1000 * (seconds / puzzles.length))
        .toISOString()
        .substr(11, 8);
    }

    function isoToSeconds(timeString) {
      return timeString.split(':').reduce((acc, time) => 60 * acc + +time);
    }

    watch(
      () => route.params.username,
      async (newUsername) => {
        if (newUsername) {
          username.value = newUsername;
          await getData();
        }
      }
    );

    getData();
    return {
      userData,
      error,
    };
  },
};
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.view {
  color: $color-white;
  font-family: inherit;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  h1 {
    font-size: 3rem;
  }
  img {
    max-width: 25%;
    height: auto;
    border-radius: 50%;
  }
}

.container {
  border: 2px solid $color-white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  max-width: 100%;
  align-items: center;
  width: 100%;
}

.info {
  display: flex;
  flex-direction: column;
  width: 90%;
  div {
    display: flex;
    justify-content: space-between;
  }
  p {
    color: $color-primary;
  }
}

@media (max-width: 770px) {
  .view {
    h1 {
      font-size: 1.5rem;
    }
  }
  .container {
    width: 75%;
  }
}
</style>
