<template>
    <h2>Orders From {{date.month}} {{date.year}}</h2>
    <div class="month-center">
      <month-picker-input
        @change="showDate"
        :default-month="1"
        :default-year="2019"
        >
      </month-picker-input>
    </div>
    <orders-list
      :month="date.monthIndex"
      :year="date.year"></orders-list>
  </template>

<script>
import { MonthPickerInput } from 'vue-month-picker';
import OrdersList from './ordersList.vue';

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
  </style>
