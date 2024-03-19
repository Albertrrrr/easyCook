<template>
  <div class="order-details-container">
    <div class="header-container">
    <h1>Order Details</h1>
    <p class="back-to-list"><router-link to="/orderpage" tag="a">Back to List</router-link></p>
  </div>

  <div class="cards-container">
       <div class="card billing-address">
          <h2>Address</h2>
          <p class="name">{{orderDetails.name}}</p>
          <p class="first">{{orderDetails.house_number_and_street}}</p>
          <p class="first">{{orderDetails.town }}</p>
          <p class="first">{{orderDetails.area }}</p>
          <p class="first">{{orderDetails.postcode }}</p>
          <p class="first">{{orderDetails.country }}</p>
      </div>

      <div class="card order-summary">
          <h2 class="order">Order ID: {{orderDetails.id}}</h2>
          <p class="total1">Create Time: </p>
           <p>{{ orderDetails.createTime}}</p>
           <p class="total1">End Time: </p>
           <p>{{ orderDetails.endTime}}</p>
          <h3 class="order">Order State: {{orderDetails.status}}</h3>
          <h3 class="total1">Total：${{orderDetails.totalCost}}</h3>

      </div>

      <div class="card action-buttons">
          <button v-if="orderDetails.status === 'unpaid'" id="cancelOrder" @click="cancel">Cancel</button>
          <button v-if="orderDetails.status === 'unpaid'" id="payOrder" @click="payOrder">Pay</button>
          <button v-if="orderDetails.status === 'delivered'" id="doneOrder" @click="done">Done</button>
          <h2 v-if="orderDetails.status === 'done'">Thanks for your shopping! Your order has been done.</h2>
          <h2 v-if="orderDetails.status === 'cancel'">Your order has been canceled.</h2>
          <h2 v-if="orderDetails.status === 'processing'">Your order is processing. Please wait for a while.</h2>
      </div>

    <el-dialog :visible.sync="showModalOrder" title="Order Status">
            <p>Payment status is being detected...</p>
            <div>
              <el-button @click="showModalOrder = false">Return</el-button>
            </div>
    </el-dialog>

     </div>
  </div>
</template>


<script>
import axios from 'axios';
import {Message} from "element-ui";
export default {
  props: {
    orderId: String,
  },
  data() {
    return {
    orderDetails: {},
    ID:null,
    howModalOrder: false,
    showModalOrder:false,
    orderCreated: false,
    userId: localStorage.getItem('id'),
    token: localStorage.getItem('token'),
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
                 const firstItem = response.data.item[0];
        this.orderDetails = {
          id:response.data.id,
           name: firstItem.product_detail.name,
           house_number_and_street: response.data.address.house_number_and_street,
          postcode:response.data.address.postcode,
          area: response.data.address.area,
          town: response.data.address.town,
          country: response.data.address.country,
          cardID: firstItem.cartID,
          createTime: response.data.createTime,
          endTime: response.data.finishTime,
          status: response.data.status,
          totalCost: response.data.totalCost,
        };
      })
          .catch(error => {
            console.error("There was an error fetching the order details:", error);
          });
      },
      done() {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    axios.post(`http://34.147.186.30:8000/api/users/${userId}/orders/${this.ID}/`,{}, {
      headers: {
            Authorization: `Token ${token}`,
          },
    }).then(response => {
      console.log('Order processed successfully on the server.');
      Message.success("successful");
      location.reload(); // reload page
    }).catch(error => {
      console.error('Failed to process the order on the server.', error);
      Message.error("fails");
    });
  } catch (error) {
    console.error('Error during the processing.', error);
    Message.error("error");
  }
}, // close

cancel() {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    axios.put(`http://34.147.186.30:8000/api/users/${userId}/orders/${this.ID}/`, {},{
      headers: {
            Authorization: `Token ${token}`,
          },
    }).then(response => {
      console.log('Order cancelled successfully on the server.');
      Message.success("successful");
      location.reload();
    }).catch(error => {
      console.error('Failed to cancel the order on the server.', error);
      Message.error("fails");
    });
  } catch (error) {
    console.error('Error during the cancellation process.', error);
    Message.error("error");
  }
}, // close
    async payOrder() {
    this.showModalOrder = true;
    if (!this.ID) return;

    try {
      const userId = localStorage.getItem('id');
      const response = await axios.get(`http://34.147.186.30:8000/api/alipay/${userId}/${this.ID}/`, {
         headers: {
          Authorization: `Token ${this.token}`,
        }
      });
      if (response.status === 200) {
        this.paymentUrl = response.data.pay_url;
        window.open(this.paymentUrl, '_blank'); // open the payment page
        this.checkPaymentStatus();
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  },// close
      async checkPaymentStatus() {
      let attempts = 0; // initiate payment attempts
      const maxAttempts = 30;
       const userId = localStorage.getItem('id');
      const checkInterval = setInterval(async () => {
        attempts++;

        // payment reach the max
        if (attempts > maxAttempts) {
          clearInterval(checkInterval);
          this.$message.error('Check payment status timeout, please confirm payment result manually.');
          return;
        }

        try {
          const response = await axios.get(`http://34.147.186.30:8000/api/users/${userId}/orders/${this.ID}/`, {
            headers: {
              Authorization: `Token ${this.token}`,
            }
          });

          // if payment successful, stop checking
          if (response.data.isPaid) {
            clearInterval(checkInterval);
            this.$message.success('Payment Successful');
            this.showModalOrder = false;
          }
          // payment unsuccessful
        } catch (error) {
          console.error('Error checking payment status:', error);
          clearInterval(checkInterval);
          this.$message.error('Error checking payment status.');
        }
      }, 3000); // check every 3 seconds
    },


    }
  }
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-around;
    padding: 20px;
}

.card {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    flex: 0 0 auto;
}

@media (min-width: 1024px) {
    .card {
        width: calc(350px - 40px);
    }
}

@media (max-width: 1023px) {
    .card {
        width: calc(50% - 40px);
    }
}

@media (max-width: 767px) {
    .card {
        width: calc(100% - 40px);
    }
}


.action-buttons button {
    background-color: #1890ff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.action-buttons button:hover {
    background-color: #40a9ff;
}

#cancelOrder {
    background-color: #ff4d4f;
}

#cancelOrder:hover {
    background-color: #ff7875;
}


#doneOrder {
    background-color: #52c41a;
}

#doneOrder:hover {
    background-color: #73d13d;
}

    </style>