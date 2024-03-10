<template>
  <div class="page">
     <myHeader :isShowCar="false" :isShowSearch="false"></myHeader>
    <div class="page-container" style="margin-top: 40px">
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
          <div class="displayflex">
            <router-link to="/CustomerOrder">
              <div><img src="../assets/image/reflush.png" /></div>
              <div class="navtext">Cumstomers Order</div>
            </router-link>
          </div>

          <div class="displayflex active">
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
          <div style="font-size: 23px; font-weight: 700">My Product</div>
        </div>

        <!--     这个表单：1. 搜索功能；2. 增删改（增加需要上传到服务器进行更新数据库，删除删除服务器中的数据）       -->
        <div style="padding-top: 10px; display: flex; align-items: center">
          <el-input v-model="searchId" placeholder="search" style="width: 200px; margin-right: 10px" />
          <el-button @click="fetchOrders(searchId)">search</el-button>
          <el-button type="primary" @click="addOrder" style="margin-left: auto">add</el-button>
        </div>
        <div>
          <el-table :data="displayedOrders" border stripe style="margin-top: 10px">
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

          <div class="pagination">
            <a href="#" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }" @click="changePage(page)">{{ page }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import myHeader from "@/components/header.vue";

  export default {
    components: {myHeader},
    data() {
      return {
        showModal: false, // 控制弹出窗口显示和隐藏
        // displayedOrders1: [], // 订单数据数组
        selectedOrder: {}, // 选中的订单数据
        searchId: "",
        orders: [], // 原始订单数据
        currentPage: 1, // 当前页码
        pageSize: 5 // 每页显示的订单数量
      };
    },
    mounted() {
      this.fetchOrders();
    },
    computed: {
      displayedOrders() {
        if (Array.isArray(this.orders)) {
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          return this.orders.slice(startIndex, endIndex);
        } else {
          // 如果订单数组未定义或不是数组，返回一个空数组或执行其他逻辑
          return [];
        }
      },
      totalPages() {
        // 计算总页数
        return Math.ceil(this.orders.length / this.pageSize);
      }
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
      }
    },
    methods: {
      addOrder() {
        this.selectedOrder = {};
        this.showModal = true;
      },
      editOrder(order) {
        this.selectedOrder = { ...order }; // 复制选中订单的数据以便回显
        this.showModal = true; // 显示弹出窗口
      },
      closeModal() {
        this.showModal = false; // 关闭弹出窗口
      },
      saveChanges(id) {
        if (id) {
          fetch("http://35.197.196.50:8000/api/products/" + `${id}/`, {
            method: "Put",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.selectedOrder)
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response Error"); //如果请求失败，抛出错误
              }
              return response.json();
            })
            .then((data) => {})
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              this.fetchOrders(); // 无论成功或失败，都执行fetchOrders()方法
              this.displayedOrders;
            });
        } else {
          fetch("http://35.197.196.50:8000/api/products/", {
            method: "Post",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.selectedOrder)
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response Error"); //如果请求失败，抛出错误
              }
              return response.json();
            })
            .then((data) => {})
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              this.fetchOrders(); // 无论成功或失败，都执行fetchOrders()方法
              this.displayedOrders;
            });
        }

        this.showModal = false; // 关闭弹出窗口
      },
      deleteOrder(id) {
        fetch("http://35.197.196.50:8000/api/products/" + `${id}/`, {
          method: "Delete",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response Error"); //如果请求失败，抛出错误
            }
            return response.json();
          })
          .then((data) => {})
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.fetchOrders(); // 无论成功或失败，都执行fetchOrders()方法
            this.displayedOrders;
          });
      },
      changePage(page) {
        // 切换页码
        this.currentPage = page;
      },
      fetchOrders(id) {
        // alert(id)
        const numericId = parseInt(id);
        if (!isNaN(numericId) || id === null || id === undefined || id === "") {
          let url = "http://35.197.196.50:8000/api/products/";
          if (id) {
            url += `${id}`;
          }
          fetch(url, {
            method: "Get",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`
            }
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response Error"); //如果请求失败，抛出错误
              }
              return response.json();
            })
            .then((data) => {
              // this.orders = data;
              if (id) {
                this.orders = [];
                this.orders[0] = data;
                this.displayedOrders;
              } else {
                this.orders = data.results;
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          try {
            const ordersData = axios.post(
              `http://35.197.196.50:8000/api/search/products/`,
              {
                name: id
              },
              {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}` // 假设需要登录令牌进行认证
                }
              }
            );

            ordersData
              .then((response) => {
                this.orders = [];
                this.orders = response.data.results;
                this.displayedOrders;
              })
              .catch((error) => {
                // 在这里处理错误
                console.error(error);
              });
          } catch (Error) {
            console.error("Failed to fetch shoppingCartID:", Error);
            // 这里可以根据需要处理错误，例如显示消息给用户
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .page-container {
    display: flex;
    box-sizing: border-box;
    padding: 0 0 0 240px;
    margin-top: 20px;
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
