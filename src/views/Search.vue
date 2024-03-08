
<template>
    <div class="w">
      <h2 style="margin-bottom: 20px; margin-top: 20px">Search Results：</h2>
      <el-button style="margin-bottom: 50px; color: green" @click="goback">back</el-button>
      <div class="categoriesBoxList">
        <div class="productsList categoriesList">
          <!-- 修改 v-for 来遍历 products 数组 -->
          <div v-for="(product, index) in products" :key="index" @click="selectProduct(product.id)" class="productsItem categoriesItem">
            <div class="imgBox">
              <!-- 使用 product.url 作为图片源，如果没有则使用默认图片 -->
              <img :src="product.url || 'https://via.placeholder.com/300'" class="cover">
            </div>
            <div class="content">
              <!-- 使用 product.name 作为标题 -->
              <div class="title">{{ product.name }}</div>
              <div class="center flex row-between">
                <div class="priceBox flex">
                  <!-- 显示产品价格 -->
                  <div class="price">${{ product.price }}</div>
                </div>
                <div class="shopping row-col-center">
                  <i class="el-icon-goods"></i>
                </div>
              </div>
              <el-rate v-model="value" disabled text-color="#FF8A00">
              </el-rate>
              <div class="heart btn">
                <img src="@/assets/image/heartIcon.png" class="icon">
              </div>
            </div>
          </div>
        </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalItems">
          </el-pagination>
      </div>

      <el-dialog :visible.sync="goodsDetails" width="1200px" custom-class="goodsDetailsDialog">
      <goodsDetails :selectedProductId="selectedProductId"></goodsDetails>
     </el-dialog>
    </div>


</template>

<script>
import goodsDetails from "@/components/goodsDetails.vue";
import axios from "axios";

export default {
  components: { goodsDetails },
  props: ['query'],
  data() {
    return {
      goodsDetails: false,
      value: 4, // 星级
      products: [],
      selectedProductId: null,
      totalItems: 0, // 后端返回的总商品数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的商品数量
    };
  },
  created() {
    this.fetchProducts();
  },
  watch: {
    query(newQuery, oldQuery) {
      if (newQuery !== oldQuery) {
        this.fetchProducts();
      }
    }
  },
  methods: {
    async fetchProducts() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      try {
        const response = await axios.post('http://35.197.196.50:8000/api/search/products/', {
          name: this.query
        }, {
          headers: { 'Authorization': `Token ${token}` },
        });
        this.products = response.data.results;
        this.totalItems = response.data.count;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    selectProduct(productId) {
      this.selectedProductId = productId;
      this.goodsDetails = true; // 显示详情对话框
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.fetchProducts();
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.fetchProducts();
    },
    goback(){
      this.$router.push('/index')
    }
  },
}
</script>

<style>
.el-pagination {
  margin-top: 50px; /* 与上方元素保持20px的距离 */
}

.categoriesBoxList {
  display: flex;
  flex-direction: column;
  align-items: center;
  .categories {
    color: rgb(26, 26, 26);
    font-family: Poppins;
    font-size: 32px;
    font-weight: 600;
    padding: 23px 0 40px;

  }

  .categoriesList {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 24px;

    .categoriesItem {
      border: 1px solid rgb(230, 230, 230);
      padding: 16px 0;
      transition: all .3s;
      overflow: hidden;
      cursor: pointer;

      .cover {
        width: 100%;
        margin-bottom: 16px;
        height: 130px;
        object-fit: cover;
        transition: all 1s;
      }

      .text {
        color: rgb(26, 26, 26);
        font-family: Poppins;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
      }

      &:hover {
        border: 1px solid rgb(44, 116, 47);
        box-shadow: 0px 0px 12px 0px rgba(32, 181, 38, 0.32);

        .cover {
          transform: scale(1.1);
        }
      }
    }

  }


  .products {
    padding: 40px 0;
  }

  .productsList {
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0;

    .productsItem {
      padding: 0;
      position: relative;

      .heart {
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 40px;
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 998;
        opacity: 0;
        transition: all .5s;

        .icon {
          width: 26px;
          height: 26px;
          margin: 0;
        }

      }

      .imgBox {
        padding: 5px;
        overflow: hidden;
        height: 230px;

        img {
          width: 100%;
          height: 230px;
          object-fit: cover;
          margin-bottom: 0;
          transition: all 1s;
        }

      }

      .content {
        padding: 12px;
        font-family: Poppins;

        .title {
          color: rgb(77, 77, 77);
          font-size: 14px;
          font-weight: 400;
        }

        .priceBox {
          font-size: 16px;

          .price {
            color: rgb(26, 26, 26);
            font-weight: 500;
          }

          .original {
            color: rgb(153, 153, 153);
            font-weight: 400;
            text-decoration-line: line-through;
          }
        }
      }
      }

  }
}
</style>