<template>
  <div class="page">
    <myHeader :isShowCar="false" :isShowSearch="false"></myHeader>
    <div class="page-container">
      <manager-navigation></manager-navigation>
      <div class="right-container">
        <div style="display: flex; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px">
          <div style="font-size: 23px; font-weight: 700">Cumstomers Order</div>
        </div>
        <div>
          <h3>Search</h3>
          <div style="padding-top: 10px; display: flex; align-items: center">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="unpaid"></el-checkbox>
              <el-checkbox label="cancel"></el-checkbox>
              <el-checkbox label="processing"></el-checkbox>
              <el-checkbox label="delivered"></el-checkbox>
              <el-checkbox label="done"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="padding-top: 10px; display: flex; align-items: center">
            <div class="block">
              <span class="demonstration">Time select from </span>
              <el-date-picker v-model="value1" type="daterange" range-separator="to" start-placeholder="StartDate" end-placeholder="EndDate" value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
          </div>
          <el-button style="color: green; margin-bottom: 30px" @click="submitSearch">Search</el-button>
        </div>
        <div>

          <el-table :data="orders" border stripe style="margin-top: 10px">
            <el-table-column label="Order ID" align="center" width="120" prop="id"></el-table-column>
            <el-table-column label="User ID" align="center" min-width="120" prop="user">
              <template slot-scope="scope">
                {{ scope.row.user || searchId }}
              </template>
            </el-table-column>
            <el-table-column label="Total Cost" align="center" min-width="120" prop="totalCost"></el-table-column>
            <el-table-column label="Create Time" align="center" min-width="120" prop="createTime">
              <template slot-scope="scope">
                {{ scope.row.createTime | formatDate }}
              </template>
            </el-table-column>
            <el-table-column label="Status" align="center" min-width="120" prop="status"></el-table-column>
            <el-table-column label="Operate" align="center" width="120">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleSeeMore(scope.row)">See More</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination :current-page="currentPage" background layout="prev, pager, next" :total="total" style="text-align: center" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :visible="show" title="SeeMore" width="80%" @close="show = false">
      <el-form :model="currentDetails" label-width="120px">
        <el-form-item label="OrderID">
          <el-input v-model="currentDetails.id" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="UserID">
          <el-input v-model="currentDetails.user" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="TotalCost">
          <el-input v-model="currentDetails.totalCost" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="CreateTime">
          <el-input v-model="currentDetails.createTime" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="Status">
          <el-input v-model="currentDetails.status" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="Items" class="order-items-list">
          <div class="order-item" v-for="item in currentDetails.item" :key="item.id">
            <img :src="item.product_detail.url || 'default_image_placeholder.png'" class="order-item-image" />
            <div class="order-item-description">
              <h3>{{ item.product_detail.name }}</h3>
              <p>Price: {{ item.product_detail.price }}</p>
               <p>Quantity: {{ item.quantity }}</p>
              <p>Subtotal: {{ item.final_price }}</p>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="Address">
          <el-card class="address-card">
            <div v-if="currentDetails.address" class="address-content">
              <h3>{{ currentDetails.address.town }}, {{ currentDetails.address.country }}</h3>
              <p>{{ currentDetails.address.postcode }}, {{ currentDetails.address.house_number_and_street }}</p>
            </div>
          </el-card>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="warning" v-if="currentDetails.isPaid && currentDetails.status === 'processing'" @click="handleDelivery(currentDetails.id)"> Delivery </el-button>
        <el-button type="primary" @click="show = false">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myHeader from "@/components/header.vue";
import managerNavigation from "@/components/managerNavigation.vue";
import axios from "axios";

export default {
  name: "CustomerOrder",
  components: {
    myHeader,
    managerNavigation,
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      checkList: ["unpaid", "cancel", "processing", "delivered", "done"],
      searchId: "",
      orders: [], // Original Order Data
      currentPage: 1, // Current page number
      pageSize: 10, // Number of orders displayed per page
      currentRow: {},
      show: false,
      currentDetails: {},
      total: 0,
    };
  },
  mounted() {
    this.fetchOrders();
  },
  filters: {
    formatDate: function (value) {
      // Formatting Date Time
      const date = new Date(value);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.checkList.length > 0 || this.value1) {
        this.submitSearch();
      } else {
        this.fetchOrders();
      }
    },
    handleSearch() {
      this.currentPage = 1;
      this.fetchOrders();
    },
    fetchOrders() {
      axios
        .get("http://34.147.186.30:8000/api/manager/orders/", {
          params: {
            page: this.currentPage,
          },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.orders = res.data.results;
          this.total = res.data.count;
        });
    },
    handleSeeMore(row) {
      // Update the method to handle fetching details
      this.currentRow = row;
      this.show = true;

      const userId = row.user; // Assuming 'user' contains the userId
      const orderId = row.id;

      // Adjust the URL to include the actual userId and orderId
      fetch(`http://34.147.186.30:8000/api/users/${userId}/orders/${orderId}/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          // Include any other headers your API requires
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Assuming 'data' is the list to be assigned to 'currentDetails'
          this.currentDetails = data;
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }, // close

    formatDates(GMT) {
      console.log("xx", GMT);
      const date = new Date(GMT);

      const year = date.getFullYear();

      const month = ("0" + (date.getMonth() + 1)).slice(-2);

      const day = ("0" + (date.getDate() + 1)).slice(-2);

      return `${year}-${month}-${day}`;
    },

    submitSearch() {
      axios
        .post(
          `http://34.147.186.30:8000/api/manager/orders/?page=${this.currentPage}`,
          {
            statuses: this.checkList,
            start_date: this.value1 ? this.value1[0] : null,
            end_date: this.value1 ? this.value1[1] : null,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.orders = response.data.results;
          this.total = response.data.count;
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    },

    handleDelivery() {
      const orderId = this.currentDetails.id; // Get id from current order details
      fetch("http://34.147.186.30:8000/api/manager/orders/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
          // Include any other headers your API requires
        },
        body: JSON.stringify({ id: orderId }), // Send order id as request body
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          this.$message({
            message: "Delivery Successful",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message.error(`Error: ${error.message}`);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  box-sizing: border-box;
  padding: 0 0 0 240px;
  margin-top: -50px;
  .left-container {
    width: 220px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .right-container {
    flex: 1;
    margin-left: 30px;
    border: 1px solid #ccc;
    padding: 10px 20px;
    border-radius: 10px;
  }
}
.order-items-list {
  width: 100%;
  margin: 20px 0;
}
.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.order-item-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}
.order-item-description {
  flex-grow: 1;
}
.order-item-quantity {
  margin: 10px 0;
}
.address-card {
  margin-top: 20px;
}
.address-content {
  padding: 15px;
}
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
.card-con {
  width: 100%;
  border: 1.15px solid rgb(230, 230, 230);
  border-radius: 10px;
  margin-bottom: 39px;
}

.code-con {
  border: 1.15px solid rgb(230, 230, 230);
  border-radius: 10px;
  padding: 23px;
  display: flex;
  align-items: center;

  .code-left {
    color: rgb(26, 26, 26);
    font-size: 23px;
    font-weight: 500;
    margin-right: 27.6px;
  }

  .code-right {
    flex: 1;
    position: relative;

    .code-input {
      width: 100%;
      height: 70px;
      border-radius: 80px;
      border: 1px solid rgb(230, 230, 230);
      font-size: 18px;
      padding: 23px 240px 23px 23px;
      box-sizing: border-box;
    }

    .input-btn {
      position: absolute;
      width: 226px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgb(51, 51, 51);
      color: #ffffff;
      font-size: 18.4px;
      font-weight: 600;
      border-radius: 70px;
      right: 0;
      top: 0;
      cursor: pointer;
    }
  }
}

.Cart-title {
  color: rgb(128, 128, 128);
  font-size: 16px;
  font-weight: 500;
  height: 34px;
  border-bottom: 1px solid rgb(230, 230, 230);
  padding-left: 23px;
  display: flex;
  align-items: center;
}

.title-item {
  text-align: center;
}

.cart-list {
  padding: 0 23px;

  .cart-list-item {
    padding: 14px 0;
    display: flex;
    align-items: center;
    border-bottom: 1.15px solid rgb(230, 230, 230);

    &:last-child {
      border-bottom: unset;
    }

    img {
      width: 115px;
      height: 115px;
      margin-right: 14px;
    }

    .product-name,
    .product-price {
      color: rgb(26, 26, 26);
      font-size: 18.4px;
      width: calc(100% - 689px);
    }

    .product-price {
      width: 90px;
      text-align: center;
    }

    .all-price {
      margin-right: 70px;
    }

    .counter-container {
      width: 142px;
      height: 58px;
      border: 1.15px solid rgb(230, 230, 230);
      border-radius: 195.5px;
      padding: 9.2px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 70px;

      .counter-item {
        width: 40px;
        height: 40px;
        background: rgb(242, 242, 242);
        border-radius: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .counter-center {
        background-color: unset;
        color: rgb(26, 26, 26);
        font-size: 18.4px;
      }
    }

    .del-produce {
      width: 28px;
      height: 28px;
      border: 1px solid rgb(230, 230, 230);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;

      background-color: white;
    }
  }
}
.page-container {
  display: flex;
  box-sizing: border-box;
  padding: 0 0 0 240px;
  margin-top: -50px;
  .left-container {
    width: 230px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .right-container {
    flex: 1;
    margin-left: 30px;
    border: 1px solid #ccc;
    padding: 10px 20px;
    border-radius: 10px;
  }
}
body {
  padding: 20px 0;
}

.navleft {
  height: 40px;
  padding: 0 40px;
  line-height: 60px;
  font-size: 40px;
  color: green;
  position: absolute;
  left: 200px;
  top: 22px;
}

.bodynav {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  height: 60px;
  line-height: 60px;
}

.navright {
  display: flex;
}

.navright .navcart {
  display: flex;
  position: absolute;
  right: 388px;
  align-items: center;
}

.navright .navcart img {
  width: 22px;
  height: 22px;
}

.navcartarea {
  font-size: 20px;
  margin-bottom: 14px;
  margin-left: 12px;
}

.navsign {
  position: absolute;
  right: 108px;
}

.navsignarea {
  font-size: 20px;
}

.flex {
  display: flex;
  align-items: center;
  position: absolute;
  left: 240px;
  top: 110px;
}

.img20 {
  width: 20px;
  height: 20px;
  font-size: 20px;
}

.font20 {
  font-size: 20px;
}

.displayflex {
  display: flex;
  height: 50px;
  align-items: center;
  padding: 10px 15px;
}

.displayflex img {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
}

.navtext {
  font-size: 18px;
  margin-left: 8px;
}

.active {
  background-color: rgb(196 240 196);
  border-left: 10px;
  border-color: red;
  border-width: 10px;
  font-weight: 700;
}

table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  width: 1200px;
  margin-top: 20px;
}

table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 50px;
  width: 500px;
  font-size: 19px;
}

table thead th {
  background-color: #cce8eb;
  width: 100px;
}

table tr:nth-child(odd) {
  background: #fff;
}

table tr:nth-child(even) {
  background: #f5fafa;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination a {
  display: inline-block;
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  text-decoration: none;
  color: #333;
}

.pagination a.active {
  background-color: rgb(196 240 196);
  color: #fff;
}

a {
  text-decoration: none;
  display: flex;
  color: black;
}
</style>
