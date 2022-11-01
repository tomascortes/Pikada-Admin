<template>
  <div>
    <h1>Information</h1>
    <div>
      <div class="table-wrapper">
        Total income2: {{numberWithCommas(monthIncome)}}
      </div>
      <div>
        Total orders: {{numberWithCommas(monthOrders.length)}}
      </div>
    </div>
    <h1>Month Orders</h1>
      <div v-if="monthOrders">
        <div class="table-wrapper">
          <div class="table-container" role="table" aria-label="Destinations">
            <div class="flex-table header" role="rowgroup">
              <div class="flex-row first" role="columnheader">Order Id</div>
              <div class="flex-row" role="columnheader">Opened order</div>
              <div class="flex-row" role="columnheader">Closed order</div>
              <div class="flex-row" role="columnheader">Total of order</div>
            </div>
            <div class="flex-table row"
              role="rowgroup" v-for='order in monthOrders' :key='order.id'>
              <div class="flex-row first" role="cell">
                {{order.id}}
              </div>
              <div class="flex-row" role="cell">{{order.date_opened}} </div>
              <div class="flex-row" role="cell">{{order.date_closed}}</div>
              <div class="flex-row" role="cell">{{numberWithCommas(order.total)}} CLP</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { monthDates, totalIncome } from '../api/getData';

export default {
  props: {
    month: Number,
    year: Number,
  },
  data() {
    return {
      monthOrders: undefined || [],
      monthIncome: undefined || Number,
    };
  },
  methods: {
    async updateOrders() {
      this.monthOrders = await monthDates(this.month, this.year);
      this.monthOrders.sort((a, b) => {
        if (a.date_closed < b.date_closed) {
          return -1;
        }
        if (a.date_closed > b.date_closed) {
          return 1;
        }
        return 0;
      });
    },
    async updateIncome() {
      this.monthIncome = await totalIncome(this.month, this.year);
    },
    numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  watch: {
    month() {
      this.updateOrders();
      this.updateIncome();
    },
    year() {
      this.updateIncome();
      this.updateOrders();
    },
  },
};

</script>

<style lang="scss">
@import "./scss/table.scss";
</style>
