<template>
    <div class="product-list">
      <h1>Order Details</h1>
      <div class="product-item" v-for="item in orderDetails.items" :key="item.id">
        <!-- Use item properties, make sure these are present in the objects -->
        <span>{{ item.product_detail.name }}</span>
        <span>{{ item.product_detail.price }}</span>
        <span>{{ item.quantity }}</span>
        <span>{{ item.final_price }}</span>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
      return {
        orderDetails: {
          items: [], // Assuming this will be the structure based on your JSON
          // other order related data ...
        },
        // ... other data properties
      };
    },
    created() {
      this.fetchOrderDetails();
    },
    methods: {
      fetchOrderDetails() {
        // Replace with actual API URL
        axios.get('http://35.197.196.50:8000/api/users/10/orders/1')
          .then(response => {
            this.orderDetails = response.data; // make sure that the API returns the expected structure
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
 //   justify-content:1 00px;

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

.product-list {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    margin-top: 30px;
}

.product-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.product-item img {
    width: 50px; /* Adjust as needed */
    height: auto;
}
</style>