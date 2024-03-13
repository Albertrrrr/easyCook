<template>
<div class="order-history-container">
    <h2>Order History</h2>
    <table class="order-history">
        <thead>
            <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in orders" :key="order.id" @click="selectOrderId(order.id)">
              <td>{{ order.id }}</td>
              <td>{{ order.createTime }}</td>
              <td>$ {{ order.totalCost }}</td>
              <td>{{ order.status }}</td>
              <td class="view-details" > View Details</td>
            </tr>
          </tbody>
    </table>

</div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      orders: [],
      orderId: null
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    selectOrderId(p){
      this.orderId = p
      console.log(this.orderId)
      this.$router.push({path:`orderDetails/${this.orderId}`})
    },

    fetchOrders() {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      // 发送 POST 请求到 API
        axios.get(`http://34.147.186.30:8000/api/users/${userId}/orders/`,{
          headers: {
                Authorization: `Token ${token}`,
              },
        })
          .then(response => {
            const results = response.data.results;
            this.orders = results.map(order => ({
              id: order.id,
              createTime: order.createTime,
              totalCost: order.totalCost,
              status: order.status
            }));
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
      }
  }
};



</script>

<style scoped lang="scss">
 .main-content {

    width: 600px;
    height: 400px;
    background-color: #ffffff;
    padding: 20px;
    float:left;
  }
 .main-content .customer-welcome{
    width: 895px;
    height: 224px;
    left: 673px;
    top: 268px;
}

.main-content .billing-address{

    width: 895px;
    height: 306px;
    left: 673px;
    top: 529px;
}
  .main-content section {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 8px;
    background: rgb(255, 255, 255);
  }
  p{
    color: rgb(26, 26, 26);
    font-family: Poppins;
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    text-align: left;
  }

  .customer-welcome h3,
  .billing-address h3 {

  }

  button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }

  button:hover {
  background-color:#45A049;
  }

  .order-history-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    padding: 30px;
    float:left;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 8px;
    background: rgb(255, 255, 255);
}

.order-history h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
}

.order-history table {
    width: 100%;
    border-collapse: collapse;
    padding-top: 20px;
}

.order-history th,
.order-history td {
    text-align: left;
    padding: 10px 75px 17px 17px;
    border-bottom: 1px solid #eaeaea;
    vertical-align: middle;
}

.order-history th {
    background-color: #f9f9f9;
    color: #666;
    font-weight: normal;
}

.order-history td {
    color: #333;
}

.order-history tr:hover {
    background-color: #f5f5f5;
}

.view-details {
    color: #2a9d43;
    text-decoration: none;
}
</style>