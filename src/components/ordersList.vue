<template>
  <div>
    <div>
      <div v-show="active" class="table-wrapper">
        <div class="flex-title">
          Total income:
        </div>
        <div class="flex-content">
          {{numberWithCommas(monthIncome)}}
        </div>
        <div class="flex-title">
          Total orders
        </div>
        <div class="flex-content">
          {{numberWithCommas(monthOrders.length)}}
        </div>
      </div>
    </div>
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
      active: false,
    };
  },
  methods: {
    async updateOrders() {
      this.active = false;
      this.monthOrders = await monthDates(this.month, this.year);
      this.active = true;
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
.table-wrapper{
  flex-direction: row;
  display: flex;
  justify-content: center;
  height: 40px;
}

.flex-title{
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 5px;
  border-radius: 5px 0px 0px 5px;
  background-color: #3E6D9C;
  padding-top: 7px;
  color:aliceblue;
  width: 120px;
  border:2px 2px 0px 2px solid black;
}

.flex-content {
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 0px 5px 5px 0px;
  background-color: #5DA7DB;
  padding-top: 7px;
  color:aliceblue;
  width: 120px;

}
</style>
