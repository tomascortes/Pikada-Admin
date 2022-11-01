<template>
    <h2>Possible errors in balance</h2>
    <month-picker-input
      @change="showDate"
      :default-month="1"
      :default-year="2019"
      >
    </month-picker-input>
    <balance-inconsistencies
      :month="date.monthIndex"
      :year="date.year"></balance-inconsistencies>
  </template>

<script>
import { MonthPickerInput } from 'vue-month-picker';
import BalanceInconsistencies from './warningsBalance.vue';

export default {
  name: 'App',
  components: { BalanceInconsistencies, MonthPickerInput },
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
  </style>
