<template>
  <div>
      <h1>Month Orders</h1>
      <div>
        Total income: {{incomeFiltered}}
      </div>
      <div v-if="monthOrders">
        <div  v-for='order in monthFiltered' :key='Date(order.date_closed)'>
          {{ order.date_closed }}: {{order.total}}
        </div>
      </div>
  </div>
</template>

<script>
import { monthDates, getData, totalIncome } from '../api/getData';

export default {
  props: {
    month: Number,
    year: Number,
  },
  data() {
    return {
      monthOrders: undefined || [],
      ordersData: [],
    };
  },
  async mounted() {
    this.ordersData = await getData();
  },
  computed: {
    monthFiltered() {
      const newData = monthDates(this.ordersData, this.month, this.year);
      this.updateMonthsData(newData);
      return newData;
    },
    incomeFiltered(newData) {
      return totalIncome(newData);
    },
  },
  methods: {
    updateMonthsData() {
      this.monthOrders = monthDates(this.ordersData, this.month, this.year);
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
