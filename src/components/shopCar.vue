<template>
  <div class="shopCar">
    <div class="content">
      <div class="title flex row-between">
        <div class="text">Shopping Card </div>
         <div class="icons-container">
            <i class="el-icon-refresh btn" @click="fetchShoppingCartItems"></i>
            <i class="el-icon-close btn" @click="$emit('update', false)"></i>
          </div>
      </div>
        <div class="carList">
            <!-- 使用 v-for 循环遍历 items 数组，并使用 item 作为每次循环的变量 -->
            <div class="item flex" v-for="(item, index) in items" :key="index">
              <!-- 使用 item.product_detail.url 作为图片源 -->
              <img :src="item.product_detail.url" alt="">
              <div class="goods flex">
                <div class="left">
                  <!-- 显示商品名称 item.product_detail.name -->
                  <div class="goodsName">{{ item.product_detail.name }}</div>
                  <div class="num">
                    <!-- 显示数量 item.quantity 以及价格 item.product_detail.price -->
                    <span>{{ item.quantity }} x </span>
                    <span class="big">{{ item.product_detail.price }}</span>
                    <span class="big"> = $ {{ item.final_price }} </span>
                  </div>
                </div>
                <i class="el-icon-circle-close close btn" @click="deleteItem(item.id)"></i>
              </div>
            </div>
          </div>

      <div class="bottom">
        <div class="total flex row-between">
          <div>{{items.length}} Product</div>
          <div class="price">${{totalFinalPrice }}</div>
        </div>
        <el-button type="success" class="w100" round @click="onGoCheckOut">Checkout </el-button>
        <el-button type="success" class="w100 successBtn" plain round @click="onGoCart">Go To Cart</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'shopCar',
  data() {
    return {
      items: [], // Stores individual cart items
      totalFinalPrice: 0, // Stores total final price
    }
  },
  created() {
    this.fetchShoppingCartItems();
  },
  methods: {
    async fetchShoppingCartItems() {
      const shoppingCartID = localStorage.getItem('shoppingCartID');
      if (!shoppingCartID) {
        console.error('Shopping Cart ID not found');
        return;
      }

      try {
        const response = await axios.get(`http://34.147.186.30:8000/api/shopping-cart-items/cart/${shoppingCartID}/`, {
          headers: { 'Authorization': `Token ${localStorage.getItem('token')}` },
        });
        this.items = response.data.items;
        this.totalFinalPrice = response.data.total_final_price;
        localStorage.setItem('cartItemCount', this.items.length);
      } catch (error) {
        console.error('Error fetching shopping cart items:', error);
      }
    },
    onGoCart() {
      this.$router.push('/shoppingcart');
      this.$emit('update', false);
    },
    onGoCheckOut() {
      this.$router.push('/account');
    },
    async deleteItem(id) {
      try {
        const response = await axios.delete(`http://34.147.186.30:8000/api/shopping-cart-items/item/${id}/`, {
          headers: { 'Authorization': `Token ${localStorage.getItem('token')}` },
        });

        if (response.status === 204 || response.data.message === 'Deleted successfully!') {
          // 删除成功后重新获取购物车数据以更新界面
          this.$message.success('Delete Successful!');
          localStorage.setItem('cartItemCount', this.items.length);
          await this.fetchShoppingCartItems();
        }
      } catch (error) {
        console.error('error:', error);
        // 可以选择处理错误，例如向用户显示错误信息
      }
    }, // close

  }
}
</script>

<style scoped lang="scss">
.w100 {
  width: 100%;
}

::v-deep.successBtn {
  margin: 12px 0 0 0 !important;
  border: none;
}

.shopCar {
  width: 100%;
  height: 100%;
  padding: 40px;
  font-family: Poppins;
  color: rgb(26, 26, 26);


  .carList {
    flex: 1;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }

    .item {
      border-bottom: 1px solid rgb(230, 230, 230);
      padding: 12px 0;
      cursor: pointer;

      &:last-child {
        border: none;
      }

      img {
        width: 120px;
        height: 100px;
        object-fit: contain;
      }

      .goods {
        width: calc(100% - 120px);

        .goodsName {
          font-size: 14px;
          font-weight: 400;
        }

        .num {
          color: rgb(128, 128, 128);
          font-size: 14px;
          font-weight: 400;

          .big {
            color: rgb(26, 26, 26);
            font-size: 14px;
            font-weight: 600;
          }

        }

        .left {
          flex: 1;
        }
      }

      .close {
        font-size: 30px;
        color: rgb(204, 204, 204);
      }


    }
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 20px;
  }

  .total {
    font-size: 16px;
    font-weight: 400;
    padding: 24px 0;

    .price {
      color: rgb(26, 26, 26);
      font-size: 16px;
      font-weight: 600;
    }
  }
  .icons-container {
  display: flex; /* 设置父容器为flex布局 */
  align-items: center; /* 垂直居中图标 */
}

.icons-container .btn {
  margin-right: 5px; /* 控制图标之间的间距 */
}

.icons-container .btn:last-child {
  margin-right: 0; /* 最后一个图标不需要右边距 */
}
}
</style>
