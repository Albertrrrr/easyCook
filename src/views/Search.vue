
<template>
    <div class="w">
      <h2 style="margin-bottom: 20px; margin-top: 20px">Search Results：</h2>
      <el-button style="margin-bottom: 50px; color: green" @click="goback">back</el-button>
      <div class="categoriesBoxList">
        <div class="productsList categoriesList">
          <div v-for="(product, index) in products" :key="index" @click="selectProduct(product.id)" class="productsItem categoriesItem">
            <div class="imgBox">
              <img :src="product.url || 'https://via.placeholder.com/300'" class="cover">
            </div>
            <div class="content">
              <div class="title">{{ product.name }}</div>
              <div class="center flex row-between">
                <div class="priceBox flex">
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
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
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
      value: 4,
      products: [],
      selectedProductId: null,
      totalItems: 0, // Backend's total product count
      currentPage: 1, // Current page number
      pageSize: 10, // Number of products per page
      nextPageUrl: '', // URL for the next page of products
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
          let url = 'http://34.147.186.30:8000/api/search/products/';
          let method = 'post';
          let data = {
            name: this.query,
          };
          let params = {};

          // If it is a paging request, adjust the request parameters and methods
          if (this.currentPage > 1) {
            method = 'get'; // Assuming that the paging request uses the GET method
            params = { page: this.currentPage }; // Adding Paging Parameters
            // For paging requests, if there are additional query parameters (e.g., categoryID), you should also add here
          }

          let response;
          if (method === 'post') {
            response = await axios.post(url, data, {
              headers: { 'Authorization': `Token ${token}` },
            });
          } else {
            response = await axios.post(url, data,{
              params: params,
              headers: { 'Authorization': `Token ${token}` },
            });
          }

          this.products = response.data.results;
          this.totalItems = response.data.count;
          // Note: Instead of using nextPageUrl directly, it relies on the currentPage and API response to manage paging
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },
    selectProduct(productId) {
      this.selectedProductId = productId;
      this.goodsDetails = true;
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.fetchProducts(true); // Indicate this is a pagination request
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // Reset to the first page
      this.fetchProducts(); // Fetch the first page with the new page size
    },
    goback() {
      this.$router.push('/index');
    }
  },
}
</script>


<style>
.el-pagination {
  margin-top: 50px;
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