<template>
  <div class="page">
    <myHeader :isShowCar="false" :isShowSearch="false"></myHeader>
    <div class="page-container">
      <manager-navigation></manager-navigation>

      <div class="right-container">
        <div style="display: flex; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px">
          <div style="font-size: 23px; font-weight: 700">My Product</div>
        </div>


        <div style="padding-top: 10px; display: flex; align-items: center">
          <el-input v-model="searchValue" placeholder="search" style="width: 200px; margin-right: 10px" />
          <el-button @click="handleSearch">search</el-button>
          <el-button type="primary" @click="addOrder" style="margin-left: auto">add</el-button>
        </div>
        <div>
          <el-table :data="orders" border stripe style="margin-top: 10px">
            <el-table-column label="Product ID" align="center" width="120" prop="id"></el-table-column>
            <el-table-column label="Product Name" align="center" min-width="120" prop="name"></el-table-column>
            <el-table-column label="CategoryID" align="center" min-width="120" prop="categoryID"></el-table-column>
            <el-table-column label="Price" align="center" min-width="120" prop="price"></el-table-column>
            <el-table-column label="Stock" align="center" min-width="120" prop="stock"></el-table-column>
            <el-table-column label="Description" align="center" min-width="120" prop="description" show-overflow-tooltip></el-table-column>
            <el-table-column label="URL" align="center" min-width="150" prop="url" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.url ? scope.row.url : "xxx" }}
              </template>
            </el-table-column>
            <el-table-column label="Operate" align="center" width="260">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editOrder(scope.row)">Update</el-button>
                <el-button type="danger" size="mini" @click="deleteOrder(scope.row.id)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :current-page="currentPage" background layout="prev, pager, next" :total="total" style="text-align: center" @current-change="handleCurrentChange">
          </el-pagination>

          <el-dialog :visible="showModal" title="Update" width="35%" @close="showModal = false">
            <el-form :model="selectedOrder" label-width="120px">
              <el-form-item label="Product ID:">
                <el-input v-model="selectedOrder.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="Product Name:">
                <el-input v-model="selectedOrder.name"></el-input>
              </el-form-item>
              <el-form-item label="Category ID:">
                <el-input v-model="selectedOrder.categoryID"></el-input>
              </el-form-item>
              <el-form-item label="Price:">
                <el-input v-model="selectedOrder.price"></el-input>
              </el-form-item>
              <el-form-item label="Stock:">
                <el-input v-model="selectedOrder.stock"></el-input>
              </el-form-item>
              <el-form-item label="Description:">
                <el-input v-model="selectedOrder.description"></el-input>
              </el-form-item>
              <el-form-item label="URL:">
                <el-input v-model="selectedOrder.url"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="closeModal">close</el-button>
              <el-button type="primary" @click="saveChanges(selectedOrder.id)">save</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import myHeader from "@/components/header.vue";
import managerNavigation from "@/components/managerNavigation.vue";

export default {
  components: { myHeader, managerNavigation },
  data() {
    return {
      showModal: false, // 控制弹出窗口显示和隐藏
      // displayedOrders1: [], // 订单数据数组
      selectedOrder: {}, // 选中的订单数据
      searchValue: "",
      orders: [], // 原始订单数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的订单数量
      total: 0,
    };
  },
  mounted() {
    this.fetchOrders();
  },
  computed: {
    // displayedOrders() {
    //   if (Array.isArray(this.orders)) {
    //     const startIndex = (this.currentPage - 1) * this.pageSize;
    //     const endIndex = startIndex + this.pageSize;
    //     return this.orders.slice(startIndex, endIndex);
    //   } else {
    //     // 如果订单数组未定义或不是数组，返回一个空数组或执行其他逻辑
    //     return [];
    //   }
    // },
    // totalPages() {
    //   // 计算总页数
    //   return Math.ceil(this.orders.length / this.pageSize);
    // },
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
    addOrder() {
      this.selectedOrder = {};
      this.showModal = true;
    },
    editOrder(order) {
      this.selectedOrder = { ...order }; // Copy the data of the selected order for displaying back
      this.showModal = true; // Show pop-up window
    },
    closeModal() {
      this.showModal = false; // Close pop-up window
    },
    saveChanges(id) {
      if (id) {
        fetch("http://34.147.186.30:8000/api/products/" + `${id}/`, {
          method: "Put",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.selectedOrder),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response Error");
            }
            return response.json();
          })
          .then((data) => {})
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.fetchOrders(); // Execute the fetchOrders() method regardless of success or failure
            this.displayedOrders;
          });
      } else {
        fetch("http://34.147.186.30:8000/api/products/", {
          method: "Post",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.selectedOrder),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response Error");
            }
            return response.json();
          })
          .then((data) => {})
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.fetchOrders();
            this.displayedOrders;
          });
      }

      this.showModal = false; // Close pop-up window
    },
    deleteOrder(id) {
      fetch("http://34.147.186.30:8000/api/products/" + `${id}/`, {
        method: "Delete",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response Error");
          }
          return response.json();
        })
        .then((data) => {})
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.fetchOrders();
          this.displayedOrders;
        });
    },
    changePage(page, event) {
      event.preventDefault(); // Blocking Link Default Jump Behavior
      this.currentPage = page;
      this.fetchOrders(); // May need to recapture the current page of orders
    },
    handleSearch() {
      this.currentPage = 1;
      this.fetchOrders();
    },
    fetchOrders() {
      let url = "";
      if (this.searchValue) {
        url = `http://34.147.186.30:8000/api/search/products/?page=${this.currentPage}`;
      } else {
        url = `http://34.147.186.30:8000/api/products/?page=${this.currentPage}`;
      }
      if (this.searchValue) {
        url += `&category=${this.searchValue}`;
      }
      fetch(url, {
        method: "Get",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response Error");
          }
          return response.json();
        })
        .then((data) => {
          this.orders = data.results;
          this.total = data.count;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchOrders();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  margin-top: -50px;
  box-sizing: border-box;
  padding: 0 0 0 240px;

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
