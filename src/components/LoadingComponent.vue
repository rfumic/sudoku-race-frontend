<template>
  <main>
    <section>
      <div></div>
      <div></div>
      <div></div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

main {
  margin: 50vh auto 0;
  transform: translateY(-50%);
}

section {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 150px;
  height: 150px;
  div {
    width: 25%;
    height: 25%;
    background: $color-white;
    border: 1px solid $color-dark;
    animation: bounce 0.5s cubic-bezier(0.19, 0.57, 0.3, 0.98) infinite
      alternate;
    &:nth-child(2) {
      animation-delay: 0.05s;
    }
    &:nth-child(3) {
      animation-delay: 0.1s;
    }
  }
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100px);
  }
}
</style>
