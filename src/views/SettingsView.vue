<template>
  <div class="view">
    <h1>settings</h1>
    <div class="container">
      <img
        src="https://i.imgur.com/K6sVdpK.jpeg"
        alt="user avatar"
        @click="update('avatar')"
      />
      <div class="info">
        <div>
          username:
          <div class="right">
            <p>userData</p>
            <svg
              @click="update('username')"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              />
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div>
          email:
          <div class="right">
            <p>userData</p>
            <svg
              @click="update('email')"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              />
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div>
          password: ·······
          <div class="right">
            <p><i>update </i></p>
            <svg
              @click="update('password')"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              />
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="showForm">
      {{ formInfo.title }}
      <form @submit.prevent="funk" :class="{ password: formInfo.labelText2 }">
        <div>
          <label v-if="formInfo.labelText2">{{ formInfo.labelText2 }}</label>
          <input
            type="text"
            :placeholder="formInfo.placeholder2"
            v-if="formInfo.placeholder2"
          />
        </div>
        <label>{{ formInfo.labelText }}</label>
        <input
          type="text"
          :placeholder="formInfo.placeholder"
          v-model="formInfo.input1"
        />
        <button @click="buttonFunction">update</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { Service } from '@/services';

export default {
  setup() {
    const store = useStore();

    let showForm = ref(false);
    let formInfo = ref({});
    let buttonFunction = ref(null);

    function update(selected) {
      showForm.value = true;
      switch (selected) {
        case 'avatar': {
          updateAvatar();
          break;
        }
        case 'username': {
          updateUsername();
          break;
        }
        case 'email': {
          updateEmail();
          break;
        }
        case 'password': {
          updatePassword();
          break;
        }
        default:
          break;
      }
    }

    async function updateUsername() {
      formInfo.value = {
        labelText: store.state.username,
        labelText2: null,
        placeholder: 'new username',
        placeholder2: null,
        title: 'update username',
        input1: '',
        input2: '',
      };
      buttonFunction.value = () => {
        console.log('update username', formInfo.value.input1);
      };
    }
    async function updateEmail() {
      formInfo.value = {
        labelText: store.state.userEmail,
        labelText2: null,
        placeholder: 'new email',
        placeholder2: null,
        title: 'update email',
      };
      buttonFunction.value = () => {
        console.log('update email');
      };
    }
    async function updatePassword() {
      formInfo.value = {
        labelText: 'new password',
        placeholder: 'new password',
        placeholder2: 'current password',
        labelText2: 'current password',
        title: 'update password',
      };
      buttonFunction.value = () => {
        console.log('update password');
      };
    }

    return {
      showForm,
      update,
      formInfo,
      buttonFunction,
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
}
img {
  max-width: 25%;
  height: auto;
  border-radius: 50%;
  opacity: 1;
  transition: 0.2s ease;
  backface-visibility: hidden;
  &:hover {
    cursor: pointer;
    transform: scale(0.9);
    opacity: 0.3;
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
  svg {
    width: 1.5rem;
    &:hover {
      cursor: pointer;
      color: $color-primary;
    }
  }
}
.password {
  flex-direction: column;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

input {
  margin: 1rem 0;
  max-width: 50%;
  font-family: inherit;
  padding: 0.5rem;
  background: $color-white;
  border: none;
  color: $color-dark;
  border-bottom: 2px solid $color-dark;
  text-align: center;
  font-size: 1.25rem;
  transition: border-bottom-color 0.3s ease-in-out;
  caret-color: $color-dark;

  &:focus {
    outline: none;
    border-bottom-color: $color-primary;
  }

  &::placeholder {
    color: $color-dark;
    opacity: 0.7;
  }
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  label {
    font-style: italic;
    padding: 5%;
  }
  button {
    margin: 5%;
    font-size: 1.5rem;
    cursor: pointer;
    font-family: inherit;
    color: $color-dark;
    border: none;
    background-color: $color-primary;
    padding: 0.5em 1rem;
    box-shadow: 3px 3px 0 0 $color-white;
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 0 0 0 $color-white;
    }
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
