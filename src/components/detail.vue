<template>
  <div class="order-details-container">
  <header class="title">
      <h1>Order Details</h1>
      <span>{{ orderDetails.createTime }}</span>
      <p class="back-to-list" ><router-link to="/orderpage" tag="a">Back to List</router-link></p>
  </header>

  <div class="billing-and-summary">
      <div class="billing-address">
          <h2>Billing Address</h2>
          <p class="name">{{orderDetails.name}}</p>
          <p class="first">{{orderDetails.house_number_and_street}}</p>
          <p class="first">{{orderDetails.country }}</p>
      </div>

      <div class="order-summary">
        <p class="order">Order ID: </p>
        <p> {{orderDetails.cardID }} </p>
        <p class="order">Order State:</p>
        <p>      {{ orderDetails.status }}      </p>
        <button  v-if="orderDetails.status === 'unpaid'" id="cancelOrder">Cancel Order</button>
        <h2 class="total1">Total</h2>
        <p class="total">${{orderDetails.totalCost}}</p>
      </div>
  </div>
     </div>
    </template>


<script>
import axios from 'axios';
export default {
  props: {
    orderId: String,
  },
  data() {
    return {
    orderDetails: {},
    ID:null
    };
  },
  created() {
   this.ID = this.$route.params.orderId
    this.fetchOrderDetails();
  },
  methods: {
fetchOrderDetails() {
        const userId = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        // Replace with actual API URL
        axios.get(`http://35.197.196.50:8000/api/users/${userId}/orders/${this.ID}`,{
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
      },
      cancelOrder() {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
           axios.put(`http://35.197.196.50:8000/api/users/${userId}/orders/${this.ID}`,{
          headers: {
                Authorization: `Token ${token}`,
              },
        })
        console.log('Order cancelled successfully on the server.');
           alert("successful")
      } catch (error) {
        console.error('Failed to cancel the order on the server.', error);
        alert("fails")
      }
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
    padding: 10px;
}
h2 {
padding: 3px;
  color: #4CAF50;

  font-size: 1.5em;
  border-bottom: 1px solid rgb(230, 230, 230);
   border-top: 1px solid rgb(230, 230, 230);
  color: #666666;
}

span{
  font-size: 12px;
    text-align: left;
  color: #4CAF50;
}

.back-to-list {
    background: none;
    border: none;
   color: #4CAF50;
    cursor: pointer;
    text-decoration: none;
}

.order{
  color: #666666;
}


.billing-and-summary {
    display: flex;
  //  justify-content: 100px;
}

.billing-address{
  margin: 10px 0px 0px 10px;
  border: 1px solid #ddd;
    border-radius: 8px;
      line-height: 40px;
  margin-bottom: 20px;
  margin-right: 30px;
}

 .order-summary {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    margin: 10px 0px 0px 10px;
    text-align: left;
     line-height: 35px;
   margin-bottom: 20px;
   width: 200px;

}

 button{
   margin-left: 80px;
   padding: 5px;
   background-color: darkgrey;
 }

 .name{
     font-size: 20px;
   margin-top: 10px;
   padding-left: 10px;
 }
 .first{
      color:#666666;
     font-size: 13px;
   padding-left: 10px;
 }
 .total{
  text-align: center;
 }
 .total1{
   text-align: center;
   color: #4CAF50;
 }

    </style>