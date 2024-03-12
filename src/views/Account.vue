

<template>
  <div>
    <SecondaryMenu/>
    <div class="account-container">
      <div class="account-area">
        <div class="account-left">
          <p class="acc-left-title">Address Information</p>
          <div>
          <el-row :gutter="20">
            <el-col :span="8" v-for="address in addresses" :key="address.id">
              <address-card :address="address" :isSelected="selectedAddressId === address.id" @click.native="selectAddress(address.id)"></address-card>
            </el-col>
            <el-col :span="8">
            <el-card class="add-new-card">
              <i class="el-icon-plus add-icon"  @click="showAddModal"></i>
            </el-card>
          </el-col>
          </el-row>
          <add-address-modal :visible.sync="showModal" @add="addNewAddress"></add-address-modal>
        </div>

          <div class="line-container"></div>

          <p class="acc-left-title">Additional Info</p>
          <p class="se-title">Order Notes (Optional)</p>
          <el-input type="textarea" placeholder="Notes about your order, e.g. special notes for delivery"></el-input>
        </div>
        <div class="account-right">
          <div class="account-right-main">
            <p class="right-title">Order Summary</p>

            <ul class="product-list">
              <div class="item " v-for="(item, index) in items" :key="index">
                  <li class="list-item">
                    <div class="product-msg">
                      <img class="pro-img" :src="item.product_detail.url">
                      <p class="pro-el" style="margin-right: 8px;">{{ item.product_detail.name }}</p>
                      <p>{{ item.quantity }}</p>
                      <div class="product-price">x ${{ item.product_detail.price }}</div>
                    </div>

                    <div class="product-price">${{ item.final_price }}</div>
                  </li>
              </div>

            </ul>

            <div class="opts-item">
              <div class="opts-label">Subtotal:</div>
              <div class="opts-container">${{totalFinalPrice}}</div>
            </div>
            <div class="opts-item">
              <div class="opts-label">Shipping:</div>
              <div class="opts-container">Free</div>
            </div>
            <div class="opts-item" style="border-bottom: none;margin-bottom: 13.8px">
              <div class="opts-label">Total:</div>
              <div class="opts-container" style="font-weight: 600;font-size: 20px;">${{totalFinalPrice}} </div>
            </div>

            <p class="right-title">Payment Method</p>
            <ul class="radio-list">
              <li class="radio-item">
                <el-radio v-model="radio" label="1">Alipay
                </el-radio>
              </li>
            </ul>

            <div class="place-btn" @click="createOrder">
              Place Order
            </div>
          </div>

           <el-dialog :visible.sync="showModalOrder" title="Order Status..">
            <p v-if="orderCreated">Order has been generated..</p>
            <div>
              <el-button @click="showModalOrder = false">Return</el-button>
              <el-button type="primary" @click="payOrder" v-if="orderCreated">Pay</el-button>
            </div>
          </el-dialog>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SecondaryMenu from '@/components/SecondaryMenu.vue'
import AddressCard from '@/components/AddressCard.vue';
import AddAddressModal from '@/components/AddAddressModal.vue';
import axios from "axios";

export default {
  data() {
    return{
      addresses: [],
      showModal: false,
      showModalOrder: false,
      selectedAddressId: null, // 新增
      radio:null,
      items: [], // Stores individual cart items
      totalFinalPrice: 0, // Stores total final price

      userId: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
      orderCreated: false,
      payID: null,
      paymentUrl: '',
    }
  },
  methods: {
    selectAddress(id) {
    this.selectedAddressId = id;
    },
    showAddModal() {
    this.showModal = true;
    },
    async fetchAddresses() {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://34.147.186.30:8000/api/users/${userId}/addresses/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        this.addresses = response.data;
      } catch (error) {
        console.error('There was an error fetching the addresses:', error);
      }
    },
    async addNewAddress(newAddress) {
        const userId = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const addressWithUserId = {
          ...newAddress, // 展开原有的 newAddress 对象
          user: userId, // 添加 userID 字段
        };

        try {
          const response = await axios.post(`http://34.147.186.30:8000/api/users/${userId}/addresses/`, addressWithUserId, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          // 假设响应中包含了新添加的地址对象，你可以直接将其添加到列表中
          this.addresses.push(response.data);
          this.showModal = false;
        } catch (error) {
          console.error('There was an error adding the address:', error);
        }
    }, // close
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
      } catch (error) {
        console.error('Error fetching shopping cart items:', error);
      }
    },// close
    async createOrder() {
    try {
      const response = await axios.post(`http://34.147.186.30:8000/api/users/create/${this.userId}/orders/`, {
        address_id: this.selectedAddressId
      }, {
        headers: {
          Authorization: `Token ${this.token}`,
        }
      });

      if (response.status === 201) {
        this.orderCreated = true;
        this.payID = response.data.id; // 假设返回的数据中包含 payID
        this.showModalOrder = true; // 显示模态框

      } else {
        this.$message.error('Failed to generate order，Please check address options');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      this.$message.error('Failed to generate order，Please check address options');
    }
  },
  async payOrder() {
    if (!this.payID) return;

    try {
      const response = await axios.get(`http://34.147.186.30:8000/api/alipay/${this.userId}/${this.payID}/`, {
         headers: {
          Authorization: `Token ${this.token}`,
        }
      });
      if (response.status === 200) {
        this.paymentUrl = response.data.pay_url;
        window.open(this.paymentUrl, '_blank'); // 打开支付页面
        this.checkPaymentStatus();
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  },// close
      async checkPaymentStatus() {
      let attempts = 0; // 初始化尝试次数
      const maxAttempts = 30; // 最大尝试次数

      const checkInterval = setInterval(async () => {
        attempts++; // 每次检查时尝试次数加1

        // 如果达到最大尝试次数，清除定时器并停止检查
        if (attempts > maxAttempts) {
          clearInterval(checkInterval);
          this.$message.error('Check payment status timeout, please confirm payment result manually.');
          return;
        }

        try {
          const response = await axios.get(`http://34.147.186.30:8000/api/users/${this.userId}/orders/${this.payID}/`, {
            headers: {
              Authorization: `Token ${this.token}`,
            }
          });

          // 如果支付成功
          if (response.data.isPaid) {
            clearInterval(checkInterval); // 停止检查
            this.$message.success('Payment Successful');
            this.showModalOrder = false; // 关闭模态框
          }
          // 如果还未支付成功，定时器将继续，直到达到最大尝试次数
        } catch (error) {
          console.error('Error checking payment status:', error);
          clearInterval(checkInterval);
          this.$message.error('Error checking payment status.');
        }
      }, 3000); // 设置为每3秒检查一次
    },// close

  },
  components: {
    SecondaryMenu,
    AddressCard,
    AddAddressModal,
  },
  created() {
    this.fetchAddresses();
    this.fetchShoppingCartItems();
  },

}
</script>

<style scoped lang="scss">
.add-new-card {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-new-card:hover {
  background-color: #f2f2f2; /* 鼠标悬停时的背景色变化 */
}

.add-icon {
  font-size: 24px; /* 调整图标大小 */
  color: #409EFF; /* 图标颜色 */
}
.account-container {
  padding: 60px 0 40px calc((100% - 1520px) / 8 * 5);

  .account-area {
    width: 1520px;
    display: flex;
    justify-content: space-between;


    .account-left {
      width: 65.8%;

      ::v-deep .el-checkbox__inner {
        width: 24px;
        height: 24px;
      }

      ::v-deep .el-textarea__inner {
        height: 115px;
        font-size: 18px;
        padding: 16px 18px;
      }

      ::v-deep .el-textarea__inner::placeholder {
        color: rgb(153, 153, 153);
        font-size: 18.4px;
      }

      ::v-deep .el-checkbox__inner::after {
        height: 14px;
        left: 8px;
        width: 6px;
      }

      ::v-deep .el-checkbox__label {
        color: rgb(77, 77, 77);
        font-size: 16px;
      }

      .line-container {
        margin: 38px 0;
        height: 1px;
        background-color: rgb(230, 230, 230);
      }

      .acc-left-title {
        color: rgb(26, 26, 26);
        font-size: 27.61px;
        font-weight: 500;
        margin-bottom: 23.4px;
      }

      .se-title {
        color: rgb(26, 26, 26);
        font-size: 16.1px;
        margin-bottom: 10px;

      }

      .input-container {
        .input-label {
          font-size: 16px;
          color: rgb(26, 26, 26);
          margin-bottom: 6px;
        }

        ::v-deep .el-form-item {
          margin-bottom: 0px;
        }

        ::v-deep .el-select {
          width: 100%;
        }

        ::v-deep .el-input__inner {
          border: 1px solid rgb(230, 230, 230);
          border-radius: 7px;
          height: 54px;
          font-size: 18.4px;
        }

        ::v-deep .el-input__inner::placeholder {
          color: rgb(153, 153, 153);
          font-size: 18.4px;
        }
      }
    }

    .account-right {
      width: 32.3%;

      .account-right-main {
        width: 100%;
        border: 1.15px solid rgb(230, 230, 230);
        padding: 27.6px;
        box-sizing: border-box;
        border-radius: 10px;
      }

      .right-title {
        color: rgb(26, 26, 26);
        font-size: 23px;
        font-weight: 500;
        margin-bottom: 16px;
      }

      .product-list {
        margin-bottom: 13.8px;

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgb(26, 26, 26);

          .product-msg {
            //background-color: #2c742f;
            flex: 1;
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 400;

            .pro-img {
              width: 69px;
              height: 69px;
              margin-right: 7px;
            }

            //.pro-el {
            //  background-color: red;
            //}
          }

          .product-price {
            margin-left: 6px;
            font-size: 16px;
            font-weight: 500;
          }

        }
      }

      .opts-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13.8px 0;
        border-bottom: 1.15px solid rgb(230, 230, 230);
        box-sizing: border-box;

        .opts-label {
          color: rgb(77, 77, 77);
          font-size: 16.11px;
        }

        .opts-container {
          color: rgb(26, 26, 26);
          font-size: 16.11px;
          font-weight: 500;
        }

      }
    }

    .radio-list {
      .radio-item {
        margin-bottom: 13px;

        .is-checked {
          ::v-deep .el-radio__inner {
            border-color: rgb(0, 179, 7);
          }
        }

        &:last-child {
          margin-bottom: unset;
        }
      }

      ::v-deep .el-radio__label {
        color: rgb(77, 77, 77);
        font-size: 16px;
        font-weight: 400;
      }

      ::v-deep .el-radio__inner {
        width: 24px;
        height: 24px;
        background-color: #ffffff;

        &:hover {
          border-color: rgb(0, 179, 7) !important;
        }
      }

      .borderColor {
        border-color: rgb(0, 179, 7);
      }

      ::v-deep .el-radio__inner::after {
        width: 14px;
        height: 14px;
        background-color: rgb(0, 179, 7);
      }
    }

    .place-btn {
      height: 58.8px;
      color: rgb(255, 255, 255);
      font-size: 18.42px;
      font-weight: 600;
      border-radius: 80px;
      background: rgb(0, 179, 7);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-top: 27.6px;
    }
  }
}
</style>