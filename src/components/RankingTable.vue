<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td>{{ index + 1 }}</td>
        <td v-for="column in row" :key="column">{{ column }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['headers', 'rows'],
};
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

table {
  border-collapse: collapse;

  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  text-align: left;

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
    }
  }
}

table th,
table td {
  padding: 12px 15px;
}
</style>
