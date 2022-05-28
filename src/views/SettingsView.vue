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
            <p>{{ username }}</p>
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
            <p>{{ email }}</p>
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
            :type="formInfo.type2"
            :placeholder="formInfo.placeholder2"
            v-if="formInfo.placeholder2"
            v-model="formInfo.input2"
          />
        </div>
        <label>{{ formInfo.labelText }}</label>
        <input
          :type="formInfo.type1"
          :placeholder="formInfo.placeholder"
          v-model="formInfo.input1"
        />
        <button @click="buttonFunction">update</button>
      </form>
    </div>
    <transition name="fade">
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { Service, Auth } from '@/services';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const username = ref(store.state.username);
    const email = ref(store.state.userEmail);
    let showForm = ref(false);
    let formInfo = ref({});
    let buttonFunction = ref(null);
    let error = ref('');

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
        labelText: username.value,
        labelText2: null,
        placeholder: 'new username',
        placeholder2: null,
        title: 'update username',
        input1: '',
        input2: '',
        type1: 'text',
        type2: 'text',
      };
      buttonFunction.value = async () => {
        try {
          await sendRequest({ new_username: formInfo.value.input1 });
          Auth.logout();
          router.go();
        } catch (err) {
          console.error(err);
          error.value = 'error changing username';
        }
      };
    }
    async function updateEmail() {
      formInfo.value = {
        labelText: email.value,
        labelText2: null,
        placeholder: 'new email',
        placeholder2: null,
        title: 'update email',
        input1: '',
        input2: '',
        type1: 'text',
        type2: 'text',
      };
      buttonFunction.value = async () => {
        try {
          await sendRequest({ new_email: formInfo.value.input1 });
          Auth.logout();
          router.go();
        } catch (err) {
          console.error(err);
          error.value = 'error changing email';
        }
      };
    }
    async function updatePassword() {
      formInfo.value = {
        labelText: 'new password',
        placeholder: 'new password',
        placeholder2: 'current password',
        labelText2: 'current password',
        title: 'update password',
        input1: '',
        input2: '',
        type1: 'password',
        type2: 'password',
      };
      buttonFunction.value = async () => {
        if (formInfo.value.input1 != formInfo.value.input2) {
          try {
            const response = await sendRequest({
              new_password: formInfo.value.input1,
              old_password: formInfo.value.input2,
            });
            console.log(response);
            router.replace('/');
          } catch (err) {
            console.error(err);
            error.value = 'error changing password';
          }
        } else {
          error.value = 'error changing password';
        }
      };
    }

    async function sendRequest(data) {
      const response = await Service.patch(`/users`, data);
      if (!response) {
        throw new Error();
      }
    }

    return {
      showForm,
      update,
      formInfo,
      buttonFunction,
      username,
      email,
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
    font-size: 1rem;
    color: $color-primary;
  }
  svg {
    width: 1.5rem;
    padding-left: 1rem;
    &:hover {
      cursor: pointer;
      color: $color-primary;
    }
  }
  .right {
    align-items: center;
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
    font-size: 1rem;
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

.error {
  background: $color-warning;
  padding: 0.5rem 1rem;
  color: $color-white;
  margin-bottom: 1rem;
  text-align: center;
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
