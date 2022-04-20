<template>
  <router-view />
</template>

<style lang="scss">
@use '@/scss/colors.scss' as *;

* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}

body {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $color-dark;
}
</style>
