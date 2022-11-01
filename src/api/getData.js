import axios from 'axios';

export async function getData() {
  console.log('geting data');
  const { data } = await axios({
    method: 'get',
    url: 'https://storage.googleapis.com/backupdatadev/ejercicio/ventas.json',
  })
    .catch((error) => {
      console.log(error);
    });
  console.log('data fetched');
  return data;
}

export function monthDates(orders, month, year) {
  const output = [];
  let auxDate;
  for (let i = 0; i < orders.length; i += 1) {
    auxDate = new Date(orders[i].date_closed);
    if (
      auxDate.getMonth() === month
      && auxDate.getFullYear() === year) {
      output.push(orders[i]);
      console.log('siii');
    }
  }

  return output;
}

export function totalIncome(orders) {
  let total = 0;
  console.log(orders);
  console.log(orders.length);
  for (let i = 0; i < orders.length; i += 1) {
    total += orders.total;
  }
  return total;
}
