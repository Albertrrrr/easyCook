<template>
  <div class="page">
    <myHeader :isShowCar="false" :isShowSearch="false"></myHeader>
    <div class="page-container">
      <div class="left-container">
        <div style="display: flex; flex-direction: column">
          <div class="displayflex" style="font-size: 23px; font-weight: 700; height: 40px; margin-top: 10px">Navigation</div>
          <div class="displayflex" style="margin-top: 12px">
            <router-link to="/Welcome">
              <div><img src="../assets/image/order.png" /></div>
              <div class="navtext">Welcome</div>
            </router-link>
          </div>
          <div class="displayflex" style="margin-top: 12px">
            <router-link to="/user">
              <div><img src="../assets/image/order.png" /></div>
              <div class="navtext">User</div>
            </router-link>
          </div>
          <div class="displayflex active">
            <router-link to="/CustomerOrder">
              <div><img src="../assets/image/reflush.png" /></div>
              <div class="navtext">Cumstomers Order</div>
            </router-link>
          </div>

          <div class="displayflex">
            <router-link to="/myprodcut">
              <div><img src="../assets/image/shop.png" /></div>
              <div class="navtext">My Product</div>
            </router-link>
          </div>

          <div class="displayflex">
            <router-link to="/category">
              <div><img src="../assets/image/system.png" /></div>
              <div class="navtext">Category</div>
            </router-link>
          </div>
          <div class="displayflex">
            <router-link to="/Login">
              <div><img src="../assets/image/outlogin.png" /></div>
              <div class="navtext">Log-out</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div style="display: flex; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px">
          <div style="font-size: 23px; font-weight: 700">Cumstomers Order</div>
        </div>
        <div>
          <!--          <div style="padding-top:10px">-->
          <!--            <input type="text" id="searchInput" placeholder="搜索" style="height: 20px">-->
          <!--            <button onclick="search()">搜索</button>-->
          <!--          </div>-->
          <!--这个表能够直接调用API接口从服务器接受数据，然后通过See More 前往发货页面-->
          <el-table :data="displayedOrders" border stripe style="margin-top: 10px">
            <el-table-column label="Order ID" align="center" width="120" prop="id"></el-table-column>
            <el-table-column label="User ID" align="center" min-width="120" prop="user"></el-table-column>
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

          <div class="pagination">
            <a href="#" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="changePage(page)">{{ page }}</a>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible="show" title="SeeMore" width="40%" @close="show = false">
      <el-form :model="currentRow" label-width="100px">
        <el-form-item label="OrderID">
          <el-input v-model="currentRow.id" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="UserID">
          <el-input v-model="currentRow.user" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="TotalCost">
          <el-input v-model="currentRow.totalCost" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item label="CreateTime">
          <el-date-picker v-model="currentRow.createTime" type="datetime" disabled style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="Status">
          <el-input v-model="currentRow.status" disabled size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="warning" v-if="currentRow.isPaid">delivery</el-button>
        <el-button type="primary" @click="show = false">close</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myHeader from "@/components/header.vue";

export default {
  components: {myHeader},
  data() {
    return {
      orders: [], // 原始订单数据
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页显示的订单数量
      currentRow: {},
      show: false,
    };
  },
  mounted() {
    this.fetchOrders();
  },
  computed: {
    displayedOrders() {
      // 根据当前页码和每页数量计算显示的订单
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.orders.slice(startIndex, endIndex);
    },
    totalPages() {
      // 计算总页数
      return Math.ceil(this.orders.length / this.pageSize);
    },
  },
  filters: {
    formatDate: function (value) {
      // 格式化日期时间
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
    changePage(page) {
      // 切换页码
      this.currentPage = page;
    },
    fetchOrders() {
      //访问数据库

      fetch("http://35.197.196.50:8000/api/manager/orders/", {
        method: "Get",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response Error"); //如果请求失败，抛出错误
          }
          return response.json();
        })
        .then((data) => {
          // this.orders = data;
          this.orders = data.results;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleSeeMore(row) {
      console.log(row);
      this.currentRow = row;
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  box-sizing: border-box;
  padding: 0 0 0 240px;
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
