<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index" @click="emit(row)">
        <td>{{ index + 1 }}</td>
        <td v-for="column in row" :key="column">{{ column }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  emits: ['clicked'],
  props: ['headers', 'rows'],
  setup(props, ctx) {
    return {
      emit: (payload) => ctx.emit('clicked', payload),
    };
  },
};
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

table {
  border-collapse: collapse;

  margin: 25px 0;
  min-width: 400px;
  text-align: center;
  font-size: 0.9em;

  thead {
    tr {
      font-weight: bold;
      background-color: $color-primary;
      color: $color-dark;
    }
  }
  tbody {
    tr {
      &.active {
        color: $color-complementary;
      }
      &:nth-of-type(even) {
        background-color: #353535;
      }
      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }
      text-align: left;
    }
  }
}

table th,
table td {
  padding: 12px 15px;
}
</style>
