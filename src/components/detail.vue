<template>
  <div class="order-details-container">
  <header class="title">
      <h1>Order Details</h1>
      <span>{{ orderDate }} - {{ productCount }} Products</span>
      <a href="order.html" class="back-to-list">Back to List</a>
  </header>

  <div class="billing-and-summary">
      <div class="billing-address">
          <h2>Billing Address</h2>
          <p>{{ username}}</p>
          <p>{{houseNumberAndStreet}}</p>
          <p>{{ email }}</p>
      </div>

      <div class="order-summary">
        <p>Order ID: {{ orderId }}</p>
        <p>Order State: {{ orderState }}</p>
        <h2>Total</h2>
        <p>${{ totalAmount }}</p>
      </div>
  </div>
     </div>
    </template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      orderId: '',
      orderState: '',
      totalAmount: "",
      orderDate: '',
      productCount: "",
      orderDetails: {},

      houseNumberAndStreet: ''
    };
  },

  created() {
    this.fetchOrderDetail();
    this.fetchOrderDetails();
    this.fetchAddress();
  },
  props: ['orderId', 'orderState', 'totalAmount', 'orderDate', 'productCount'],

  methods: {
    fetchOrderDetail() {
      axios.get('http://35.197.196.50:8000//api/users/{user_id}/orders/{id}')
      .then(response => {
        this.orderId = response.data.id;
        this.orderState = response.data.state;
        this.totalAmount = response.data.total;

    })
    },

 fetchOrderDetails() {
      // 替换为实际的 API URL
      axios.get('http://35.197.196.50:8000/api/users/10/orders/1')
        .then(response => {
          this.orderDetails = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the order details:", error);
        });
    },
    fetchAddress() {
      // Make the API call to fetch the house number and street
      axios.get('http://35.197.196.50:8000/api/users/10/addresses/')
        .then(response => {
          // Assuming the response data has the address in the expected format
          this.houseNumberAndStreet = response.data.house_number_and_street;
        })
        .catch(error => {
          console.error("There was an error fetching the address details:", error);
        });
    }
  }
};
</script>

    <style scoped lang="scss">

  .order-details-container {
    width: 90%;
    max-width: 900px;

    float:left;
    background-color: #ffffff;
    border: 1px solid rgb(230, 230, 230);
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgb(230, 230, 230);
    padding-left: 30px;
    padding-right: 50px;
}

h1 {
    color: #333;
    font-size: 1.5em;
    margin-bottom: 10px;
}
h2 {
  color: #333;
  font-size: 1.5em;
}
span{
  font-size: 12px;
}

.back-to-list {
    background: none;
    border: none;
    color: #2a9d52;
    cursor: pointer;
    text-decoration: none;
}

.billing-and-summary {
    display: flex;
  //  justify-content: 100px;

}

.billing-address{
  margin: 20px 0px 0px 20px;
  border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
}

 .order-summary {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    margin: 20px 0px 0px 20px;
    text-align: left;
}
    </style>