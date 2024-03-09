<template>
  <div class="order-details-container">
  <header class="title">
      <h1>Order Details</h1>
      <span>{{ orderDetails.createTime }}</span>
      <p class="back-to-list">Back to List</p>
  </header>

  <div class="billing-and-summary">
      <div class="billing-address">
          <h2>Billing Address</h2>
          <p>{{orderDetails.name}}</p>
          <p>{{orderDetails.house_number_and_street}}</p>
          <p>{{orderDetails.country }}</p>
      </div>

      <div class="order-summary">
        <p>Order ID: {{orderDetails.cardID }}</p>
        <p>Order State: {{ orderDetails.status }}</p>
        <h2>Total</h2>
        <p>${{orderDetails.totalCost}}</p>
      </div>
  </div>
     </div>
    </template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
   orderDetails: {}

    };
  },

  created() {
    this.fetchOrderDetails();
  },
  methods: {
fetchOrderDetails() {
        const userId = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        // Replace with actual API URL
        axios.get(`http://35.197.196.50:8000/api/users/${userId}/orders/26`,{
          headers: {
                Authorization: `Token ${token}`,
              },
        })
          .then(response => {
                 const firstItem = response.data.item[0];
        this.orderDetails = {

           name: firstItem.product_detail.name,
           house_number_and_street: response.data.address.house_number_and_street,
          country: response.data.address.country,
          cardID: firstItem.cartID,
          createTime: response.data.createTime,
          status: response.data.status,
          totalCost: firstItem.final_price,
        };
      })
          .catch(error => {
            console.error("There was an error fetching the order details:", error);
          });
      }
    }
  }
</script>

    <style scoped lang="scss">

  .order-details-container {
    width: 90%;
    max-width: 1000px;

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