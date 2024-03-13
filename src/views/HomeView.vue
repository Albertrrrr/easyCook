<template>
  <div class="home">
    <div class="w">
      <div class="categoriesBox">
        <div class="categories"> Popular Categories </div>
        <div class="categoriesList">
          <div v-for="(item, index) in categories" :key="index" class="categoriesItem" @click="selectCategory(item.id)">
            <img :src="item.description || 'https://via.placeholder.com/300' " class="cover">
            <div class="text">{{ item.name}}</div>
          </div>
        </div>
      </div>
      <div class="categoriesBox" >
        <div class="categories products"> Popular Products </div>
        <div class="productsList categoriesList">
          <!-- Modify v-for to iterate through the products array -->
          <div v-for="(product, index) in products" :key="index" @click="selectProduct(product.id)" class="productsItem categoriesItem">
            <div class="imgBox">
              <!-- Use product.url as the image source, or use the default image if it's not available -->
              <img :src="product.url || 'https://via.placeholder.com/300'" class="cover">
            </div>
            <div class="content">
              <!-- Use product.name as title -->
              <div class="title">{{ product.name }}</div>
              <div class="center flex row-between">
                <div class="priceBox flex">
                  <!-- Show product price -->
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
      </div>


      <indexFooter></indexFooter>
    </div>

    <!-- details -->
    <el-dialog :visible.sync="goodsDetails" width="1200px" custom-class="goodsDetailsDialog">
      <goodsDetails :selectedProductId="selectedProductId"></goodsDetails>
    </el-dialog>
  </div>
</template>

<script>
// bottom
import indexFooter from '@/components/indexFooter.vue';
// shopping cart
import shopCar from '@/components/shopCar.vue';
// 商品详情
import goodsDetails from '@/components/goodsDetails.vue';

import axios from "axios";
export default {
  components: { indexFooter, shopCar, goodsDetails },
  data() {
    return {
      value: 4,
      goodsDetails: false, // Product Details dialog box display control
      products: [],
      selectedProductId: null, // Selected Product ID
      categories: [], // categories
      selectedCategoryId:null,

    }
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      try {
        const response = await axios.get('http://34.147.186.30:8000/api/products/', {
          headers: { 'Authorization': `Token ${token}` },
        });
        this.products = response.data.results;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    selectProduct(productId) {
      this.selectedProductId = productId;
      this.goodsDetails = true; // Show details dialog
    },

    selectCategory(CategoryId) {
      this.selectedCategoryId = CategoryId;
      this.$router.replace({ path: `/category/${this.selectedCategoryId}` });
    },

    async fetchCategories() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      try {
        const response = await axios.get('http://34.147.186.30:8000/api/categories/', {
          headers: { 'Authorization': `Token ${token}` },
        });
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },


  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__body {
  padding: 0;
}

::v-deep .el-dialog__header {
  padding: 0;
}

.categoriesBox {
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

        .shopping {
          width: 40px;
          height: 40px;
          border-radius: 40px;
          background: rgb(242, 242, 242);
          color: rgb(26, 26, 26);
          font-size: 20px;
          transition: all .3s;
        }

        .shopping:active {
          background: rgb(44, 116, 47);
          color: #fff;
        }


      }

      &:hover {
        border: 1px solid rgb(44, 116, 47);
        box-shadow: 0px 0px 12px 0px rgba(32, 181, 38, 0.32);

        .title {
          color: rgb(44, 116, 47) !important;
        }

        // .shopping {
        //   background: rgb(44, 116, 47);
        //   color: #fff;
        // }

        .heart {
          opacity: 1;
        }

      }


    }


  }
}
</style>
