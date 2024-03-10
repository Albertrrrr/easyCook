<template>
    <div class="product-list">
      <h1>Product</h1>
      <div class="order-history">
            <tr class="table">
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>final_price</th>
            </tr>
      </div>
      <div class="product-item" v-for="item in orders" :key="item.id">
        <!-- Use item properties, make sure these are present in the objects -->
        <span>{{ item.name }}</span>
        <span>{{ item.price }}</span>
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
        orders: [], // Assuming this will be the structure based on your JSON
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
            const results = response.data.item;
            this.orders = results.map(order => ({
              name: order.product_detail.name,
              price: order.product_detail.price,
              final_price: order.final_price,
              quantity: order.quantity
            })); // make sure that the API returns the expected structure
          })
          .catch(error => {
            console.error("There was an error fetching the order details:", error);
          });
      }
    }
  }
</script>

<style scoped lang="scss">

.product-list {
    border: 1px solid #ddd;

    border-radius: 8px;
    margin-top: 30px;
    width: 1000px;
    height: 500px
}

.product-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
   border: 1px solid #ddd;
}

.product-item img {
    width: 50px; /* Adjust as needed */
    height: auto;
}

.tr{
      width: 100%;

    padding-top: 20px; /* 添加上空间 */
}

.order-history th,
{
    text-align: left;
    padding:30px 100px 17px 98.5px;
    border-bottom: 1px solid #eaeaea;
    vertical-align: middle; /* 垂直居中 */
}

.order-history th {
    background-color: #f9f9f9;
    color: #666;
    font-weight: normal;
}

.order-history td {
    color: #333;
}
</style>