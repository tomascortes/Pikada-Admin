<template>
  <div>
    <h1>General data</h1>
    <div>
      Total income: {{numberWithCommas(monthIncome)}}
    </div>
    <div>
      Total orders: {{numberWithCommas(monthOrders.length)}}
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
            <!-- <div class="table-wrapper" v-for='order in monthOrders' :key='order.id'> -->
            <div class="flex-table row"
              role="rowgroup" v-for='order in monthOrders' :key='order.id'>
              <div class="flex-row first" role="cell">
                {{order.id}}
              </div>
              <div class="flex-row" role="cell">{{order.date_opened}} </div>
              <div class="flex-row" role="cell">{{order.date_closed}}</div>
              <div class="flex-row" role="cell">{{numberWithCommas(order.total)}} CLP</div>
            </div>
            <!-- </div> -->
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
$table-header: #1976D2;
$table-header-border: #1565C0;
$table-border: #d9d9d9;
$row-bg: #f4f2f1;

div {
  box-sizing: border-box;
}

.table-container {
  display: block;
  margin: 2em auto;
  width: 90%;
}

.flag-icon {
  margin-right: 0.1em;
}

.flex-table {
  display: flex;
  flex-flow: row wrap;
  border-left: solid 1px $table-border;
  transition: 0.5s;
  &:first-of-type {
    border-top: solid 1px $table-header-border;
    border-left: solid 1px $table-header-border;
  }
  &:first-of-type .flex-row {
    background: $table-header;
    color: white;
    border-color: $table-header-border;
  }
  &.row:nth-child(odd) .flex-row {
    background: $row-bg;
  }
  &:hover {
    background: #F5F5F5;
    transition: 500ms;
  }
}

.flex-row {
  width: calc(100% / 4);
  text-align: center;
  padding: 0.5em 0.5em;
  border-right: solid 1px $table-border;
  border-bottom: solid 1px $table-border;
}

.rowspan {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
}

.column {
  display: flex;
  flex-flow: column wrap;
  width: 75%;
  padding: 0;
  .flex-row {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 0;
    border: 0;
    border-bottom: solid 1px $table-border;
    &:hover {
      background: #F5F5F5;
      transition: 500ms;
    }
  }
}

.flex-cell {
  width: calc(100% / 3); //1px = border right
  text-align: center;
}
</style>
