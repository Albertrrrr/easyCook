<template>
    <div class="product-list">
      <h1 class="hh">Product</h1>
      <table class="order-history">
            <tr class="table">
              <th class="product">Product</th>
                <th class="name">Name</th>
                <th class="price1">Price</th>
                <th class="price2">Quantity</th>
                <th>Final_price</th>
            </tr>
      </table>
      <tbody>
            <!-- 使用 v-for 来循环 orders 数组中的每个订单对象 -->
            <tr class="product-item" v-for="item in orders" :key="item.id">
        <!-- Use item properties, make sure these are present in the objects -->
        <img :src="item.url" alt="Product Image" class="imgg"> <!-- 添加图片 -->
        <th class="productname">{{ item.name }}</th>
        <th class="price">{{ item.price }}</th>
        <th class="qua">{{ item.quantity }}</th>
        <th class="last">{{ item.final_price }}</th>
              </tr>
       </tbody>
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
              url: order.product_detail.url,
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

.hh{
  padding-left: 10px;
  padding-bottom: 10px;
  text-align: center;
}

.productname{
  margin-left: 107px;
}
.price{
margin-left: 100px;
}

.qua{
margin-left: 160px;
}

.product-list {
    border: 1px solid #ddd;
  padding-top: 15px;
    margin-top: 30px;
    width: 1000px;
    height: 500px
}
.product{
      margin-left: 30px;
}
.price1{
      padding: 30px 0px 17px 0px;
}

.product-item {
    display: flex;
    align-items: center ;
    //justify-content: space-between;
    margin-bottom: 10px;
   border-bottom: 1px solid #ddd;
    text-align: center;
  font-size: 16px;
  width: 1000px;
}


.product-item img {
               width: 100px;
            height: 100px;

}


.tr{

;  text-align: center;
    align-items: center;
  font-size: 13px;
}



.span{
  text-align: center;
    align-items: center;
  font-size: 13px;
}

.order-history th,
{
  text-align: left;
    padding: 30px 10px 17px 0px;
  border-bottom: 1px solid #eaeaea;
  vertical-align: middle;
  background-color: #f9f9f9;
  color: #666;
  font-weight: normal;
  font-size: 20px;
  width: 950px;

}

.last{
  margin-left: 195px;
}

.order-history td {

}

</style>