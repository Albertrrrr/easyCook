<template>
  <div class="page">
    <myHeader :isShowCar="false" :isShowSearch="false"></myHeader>
    <div class="page-container">
      <manager-navigation></manager-navigation>
      <div class="right-container">
        <div style="display: flex; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px">
          <div style="font-size: 23px; font-weight: 700">Category</div>
        </div>

        <!--     这个表单：1. 搜索功能；2. 增删改（增加需要上传到服务器进行更新数据库，删除删除服务器中的数据）       -->
        <div style="padding-top: 10px; display: flex; align-items: center">
          <el-input v-model="searchId" placeholder="search" style="width: 200px; margin-right: 10px"></el-input>
          <el-button type="primary" @click="fetchcategory(searchId)">search</el-button>
          <el-button type="primary" @click="addCategory" style="margin-left: auto">add</el-button>
        </div>
        <div style="margin-top: 10px">
          <el-table :data="displayedcategory" border stripe style="margin-top: 10px">
            <el-table-column label="Category ID" align="center" width="120" prop="id"></el-table-column>
            <el-table-column label="Category Name" align="center" min-width="120" prop="name"></el-table-column>
            <el-table-column label="Description" align="center" min-width="120" prop="description"></el-table-column>
            <el-table-column label="Operate" align="center" width="180">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="editCategory(scope.row)">Update</el-button>
                <el-button type="danger" size="mini" @click="deleteCategory(scope.row.id)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog :visible="showModal" title="Update" width="35%" @close="showModal = false">
            <el-form :model="selectedCategory" label-width="120px">
              <el-form-item label="ID:">
                <el-input v-model="selectedCategory.id" disabled></el-input>
              </el-form-item>
              <el-form-item label="Name:">
                <el-input v-model="selectedCategory.name"></el-input>
              </el-form-item>
              <el-form-item label="Description:">
                <el-input v-model="selectedCategory.description"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="closeModal">close</el-button>
              <el-button type="primary" @click="saveChanges(selectedCategory.id)">save</el-button>
            </div>
          </el-dialog>

          <div class="pagination">
            <a
              href="#"
              v-for="page in totalPages"
              :key="page"
              :class="{ active: page === currentPage }"
              @click="changePage(page, $event)">
              {{ page }}
            </a>
        </div>
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
    components: {managerNavigation, myHeader},
    data() {
      return {
        showModal: false, // 控制弹出窗口显示和隐藏
        // displayedOrders1: [], // 订单数据数组
        selectedCategory: {}, // 选中的订单数据
        searchId: "",
        category: [], // 原始订单数据
        currentPage: 1, // 当前页码
        pageSize: 5 // 每页显示的订单数量
      };
    },
    mounted() {
      this.fetchcategory();
    },
    computed: {
      displayedcategory() {
        if (Array.isArray(this.category)) {
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          return this.category.slice(startIndex, endIndex);
        } else {
          // 如果订单数组未定义或不是数组，返回一个空数组或执行其他逻辑
          return [];
        }
      },
      totalPages() {
        // 计算总页数
        return Math.ceil(this.category.length / this.pageSize);
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
      addCategory() {
        this.selectedCategory = {};
        this.showModal = true;
      },
      editCategory(ctegory) {
        this.selectedCategory = { ...ctegory }; // 复制选中订单的数据以便回显
        this.showModal = true; // 显示弹出窗口
      },
      closeModal() {
        this.showModal = false; // 关闭弹出窗口
      },
      saveChanges(id) {
        if (id) {
          fetch("http://34.147.186.30:8000/api/categories/" + `${id}/`, {
            method: "Put",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.selectedCategory)
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
              this.fetchcategory();
            });
        } else {
          fetch("http://34.147.186.30:8000/api/categories/", {
            method: "Post",
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.selectedCategory)
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
              this.fetchcategory();
              this.displayedcategory;
            });
        }

        this.showModal = false; // 关闭弹出窗口
      },
      deleteCategory(id) {
        fetch("http://34.147.186.30:8000/api/categories/" + `${id}/`, {
          method: "Delete",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
          }
        })
          .then((response) => {
            // if (!response.ok) {
            //   throw new Error('Network response Error'); //如果请求失败，抛出错误
            // }
            // return response.json();
          })
          .then((data) => {})
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.fetchcategory();
            this.displayedcategory;
          });
      },
      changePage(page, event) {
      event.preventDefault(); // 阻止链接默认跳转行为
      this.currentPage = page;
      this.fetchOrders(); // 可能需要重新获取当前页的订单
    },
      fetchcategory(id) {
        // alert(id)
        const numericId = parseInt(id);
        if (!isNaN(numericId) || id === null || id === undefined || id === "") {
          let url = "http://34.147.186.30:8000/api/categories/";
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
              if (id) {
                this.category = [];
                this.category[0] = data;
                this.displayedcategory;
              } else {
                this.category = data;
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          try {
            const categoryData = axios.post(
              `http://34.147.186.30:8000/api/search/categories/`,
              {
                name: id
              },
              {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}` // 假设需要登录令牌进行认证
                }
              }
            );

            categoryData
              .then((response) => {
                this.category = [];
                this.category = response.data;
                this.displayedcategory;
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
