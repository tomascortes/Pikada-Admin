import axios from 'axios';

async function getData() {
  const { data } = await axios({
    method: 'get',
    url: 'https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json',
  });
  return data;
}

export async function monthDates(month, year) {
  const orders = await getData();
  const output = [];
  let auxDate;
  for (let i = 0; i < orders.length; i += 1) {
    auxDate = new Date(orders[i].date_closed);
    if (
      auxDate.getMonth() === month
      && auxDate.getFullYear() === year) {
      output.push(orders[i]);
    }
  }

  return output;
}

export async function totalIncome(month, year) {
  const orders = await monthDates(month, year);
  let total = 0;
  for (let i = 0; i < orders.length; i += 1) {
    total += orders[0].total;
  }
  return total;
}

export async function inconsistentBalance(month, year) {
  const orders = await monthDates(month, year);
  const output = [];
  let prodPrices = 0;
  for (let order = 0; order < orders.length; order += 1) {
    prodPrices = 0;
    for (let prod = 0; prod < orders[order].products.length; prod += 1) {
      if (orders[order].total !== 0) {
        prodPrices += orders[order].products[prod].price + orders[order].products[prod].quantity;
      }
    }
    if (prodPrices !== orders[order].total) {
      orders[order].prodPrices = prodPrices;
      output.push(orders[order]);
    }
  }
  return output;
}
