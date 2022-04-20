<template>
  <header>
    <img
      src="../assets/sudoku-race-logo.png"
      alt="SudokuRace logo"
      class="logo"
    />
  </header>

  <main>
    <form class="form" @submit.prevent="login">
      <input class="input" type="text" placeholder="email" v-model="email" />
      <input
        class="input"
        type="password"
        placeholder="password"
        v-model="password"
      />
      <button type="submit" class="login">login</button>
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </form>
    <div class="register">
      need an account? <router-link to="/register">click here!</router-link>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    let error = ref('');
    let email = ref('');
    let password = ref('');

    function login() {
      if (email.value === '' || password.value === '') {
        error.value = 'please fill the login form';
      } else {
        error.value = '';
        console.log('LOGGING IN!', email.value, password.value);
      }
    }

    return {
      error,
      email,
      password,
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

header {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
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
.login {
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

.login {
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

.register {
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
</style>
