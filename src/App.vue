<template>
  <h2>Orders From {{date.month}} {{date.year}}</h2>
  <month-picker-input
    @change="showDate"
    :default-month="1"
    :default-year="2019"
    >
  </month-picker-input>
  <orders-list
    :month="date.monthIndex"
    :year="date.year"></orders-list>
</template>

<script>
import { MonthPickerInput } from 'vue-month-picker';
import OrdersList from './components/OrdersList.vue';
// import { getData } from './api/getData';

export default {
  name: 'App',
  components: { OrdersList, MonthPickerInput },
  data() {
    return {
      date: {
        month: null,
        monthIndex: null,
        year: null,
        day: null,
      },

    };
  },
  methods: {
    showDate(date) {
      this.date = date;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
