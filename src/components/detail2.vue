<template>
   <div class="card-con">
            <ul class="Cart-title" style="margin-left: 100px">
              <li class="title-item t1">NAME</li>
              <li class="title-item t2">PRICE</li>
              <li class="title-item t3">QUANTITY</li>
              <li class="title-item t4">SUBTOTAL</li>
              <li class="t2"></li>
            </ul>
            <div class="item" v-for="item in orders" :key="item.id">
            <ul class="cart-list">
              <li class="cart-list-item">
                    <img :src="item.url" alt="">
                    <p class="product-name">{{ item.name }}</p>
                    <p class="product-price">${{ item.price }}</p>
                      <div class="counter-container">
                        <div class="counter-item counter-center">
                          {{ item.quantity }}
                        </div>
                      </div>
                    <p class="product-price all-price" style="font-weight: 500;">${{ item.final_price }}</p>

              </li>
            </ul>
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
.card-con {
  display: flex;
  flex-direction: column;
  width: 70%;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.Cart-title {
  display: flex;
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.title-item {
  font-weight: bold;
  padding-left: 15px; /* 添加左边距对齐 */
}

/* 设置每个title-item的基础宽度，以便与cart-list-item对应的子元素宽度相匹配 */
.t1 { width: 50%; text-align: left; } /* 产品名称占据更多的空间 */
.t2 { width: 12%; } /*  价格 */
.t3 { width: 15%; } /* 数量 */
.t4 { width: 14%; } /* 小计 */
.t2:last-child { flex-grow: 1; } /* 如果有额外的元素，则让它填充剩余空间 */

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-list-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.cart-list-item img {
  width: 80px;
  height: auto;
  margin-right: 15px;
  flex: none; /* 确保图片不伸缩，固定大小 */
}

.product-name {
  width: 50%; /* 和.t1宽度相同 */
  text-align: left;
}

.product-price {
  width: 15%; /* 和.t2宽度相同 */
}

.counter-container {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 计数器左对齐 */
  width: 15%; /* 和.t3宽度相同 */
}

.counter-item {
  /* 样式保持不变，可能需要调整宽度来适配counter-container */
}

.all-price {
  width: 20%; /* 和.t4宽度相同 */
  text-align: left;
  font-weight: 500;
}



</style>