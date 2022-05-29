<template>
  <h1>page not found</h1>
  <div>
    <router-link to="/"> back to home page </router-link>
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}
h1 {
  font-size: 5rem;
  color: white;
}
div {
  border: 2px solid $color-white;
  color: $color-white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 50%;
  align-items: center;
  width: 100%;
  margin: 10% auto;
  font-size: 3rem;
  transition-property: border-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
  &:hover {
    cursor: pointer;
    border-color: $color-primary;
    color: $color-primary;
  }
}
</style>
