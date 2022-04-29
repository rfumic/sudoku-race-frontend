<template>
  <div class="view">
    <header>
      <img
        src="../assets/sudoku-race-logo.png"
        alt="SudokuRace logo"
        class="logo"
      />
    </header>
    <main>
      <form class="form" @submit.prevent="register">
        <input
          class="input"
          type="text"
          placeholder="username"
          v-model="username"
        />
        <input class="input" type="text" placeholder="email" v-model="email" />
        <input
          class="input"
          type="password"
          placeholder="password"
          v-model="password"
        />
        <input
          class="input"
          type="password"
          placeholder="confirm password"
          v-model="confirmPassword"
        />
        <button type="submit" class="register">register</button>
        <transition name="fade">
          <div v-if="error" class="error">
            {{ error }}
          </div>
        </transition>
      </form>
      <div class="login">
        have an account? <router-link to="/login">click here!</router-link>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    let error = ref('');
    let email = ref('');
    let username = ref('');
    let password = ref('');
    let confirmPassword = ref('');

    function register() {
      if (
        email.value === '' ||
        password.value === '' ||
        confirmPassword.value === ''
      ) {
        error.value = 'please fill the registration form';
      } else {
        error.value = '';
        console.log(
          'REGISTERING',
          username.value,
          password.value,
          confirmPassword.value,
          email.value
        );
      }
    }

    return {
      error,
      username,
      password,
      confirmPassword,
      email,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

header {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}
main {
  width: 100%;
}

.logo {
  max-width: 90%;
  image-rendering: -moz-crisp-edges;
}
.error {
  background: $color-warning;
  padding: 0.5rem 1rem;
  color: $color-white;
  margin-bottom: 1rem;
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
}

.input,
.register {
  margin: 1rem 0;
  max-width: 100%;
}

.input {
  font-family: inherit;
  padding-bottom: 1rem;
  background: none;
  border: none;
  color: $color-white;
  border-bottom: 2px solid $color-white;
  text-align: center;
  font-size: 1.25rem;
  transition: border-bottom-color 0.3s ease-in-out;
  caret-color: $color-primary;

  &:focus {
    outline: none;
    border-bottom-color: $color-primary;
  }

  &::placeholder {
    color: $color-white;
    opacity: 0.7;
  }
}

.register {
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

.login {
  color: $color-white;
  font-family: inherit;
  font-size: 1.15rem;
  text-align: center;
  a {
    // for 'click here!' routerlink
    text-decoration: none;
    color: $color-primary;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 0.2s ease;
}
.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 0.2s ease;
}
</style>
