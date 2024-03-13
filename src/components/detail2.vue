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
        orders: [],
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
        axios.get(`http://34.147.186.30:8000/api/users/${userId}/orders/${this.ID}`,{
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
            }));
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
  padding-left: 15px;
}

.t1 { width: 50%; text-align: left; }
.t2 { width: 12%; }
.t3 { width: 15%; }
.t4 { width: 14%; }
.t2:last-child { flex-grow: 1; }

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
  flex: none;
}

.product-name {
  width: 50%;
  text-align: left;
}

.product-price {
  width: 15%;
}

.counter-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 15%;
}

.all-price {
  width: 20%;
  text-align: left;
  font-weight: 500;
}



</style>