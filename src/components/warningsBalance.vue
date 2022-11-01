<template>
  <div>
    <div v-if="warningOrders">
      <div class="table-wrapper">
        <div class="table-container" role="table" aria-label="Destinations">
          <div class="flex-table header" role="rowgroup">
            <div class="flex-row-short first" role="columnheader">Order Id</div>
            <div class="flex-row-short" role="columnheader">Price diference</div>
            <div class="flex-row-short" role="columnheader">Products price</div>
            <div class="flex-row-short" role="columnheader">Total</div>
            <div class="flex-row-short" role="columnheader">Cashier</div>
            <div class="flex-row-short" role="columnheader">Waiter</div>
          </div>
          <div class="flex-table row"
            role="rowgroup" v-for='order in warningOrders' :key='order.id'>
            <div class="flex-row-short first" role="cell">
              {{order.id}}
            </div>
            <div class="flex-row-short" role="cell">{{order.prodPrices - order.total }} CLP</div>
            <div class="flex-row-short" role="cell">{{numberWithCommas(order.prodPrices)}} CLP</div>
            <div class="flex-row-short" role="cell">{{numberWithCommas(order.total)}} CLP</div>
            <div class="flex-row-short" role="cell">{{order.cashier}}</div>
            <div class="flex-row-short" role="cell">{{order.waiter}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inconsistentBalance } from '../api/getData';

export default {
  props: {
    month: Number,
    year: Number,
  },
  data() {
    return {
      warningOrders: undefined || [],
      monthIncome: undefined || Number,
    };
  },
  methods: {
    async updateOrders() {
      this.warningOrders = await inconsistentBalance(this.month, this.year);
      this.warningOrders.sort((a, b) => ((a.total - a.prodPrices) - (b.total - b.prodPrices)));
    },
    numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    percentage(num1, num2) {
      return Math.round(100 * ((num1 - num2) / num1));
    },
  },
  watch: {
    month() {
      this.updateOrders();
    },
    year() {
      this.updateOrders();
    },
  },
};

</script>

<style lang="scss">
@import "./scss/table.scss";
</style>
