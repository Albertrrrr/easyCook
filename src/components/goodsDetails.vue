<template>
    <div class="goods" v-if="productDetails">
        <img :src="productDetails.url || '@/assets/image/goods.png'" class="cover">
        <div class="right">
            <div class="nameBox flex">
                <div class="name">{{ productDetails.name }}</div>
            </div>
            <div class="nameBox flex">
              <div class="nameTag" v-if="productDetails.stock > 0"> Stock: {{productDetails.stock}} </div>
              <div class="nameTag" v-else>Out of Stock</div>
            </div>
            <div class="priceBox flex">
                <div class="price"> ${{ productDetails.price }}</div>
            </div>
            <div class="msg">
                {{productDetails.description}}
            </div>
            <div class="numberBox flex">
                <div class="inputNumber flex">
                    <div class="btn" @click="reduce"> <i class="el-icon-minus"></i> </div>
                    <div class="input">{{ quantity }}</div>
                    <div class="btn" @click="add"> <i class="el-icon-plus"></i> </div>
                </div>
                <el-button type="success" class="flex-1" round @click="addToCart">
                    <span>Add to Cart</span>
                    <i class="el-icon-goods"></i>
                </el-button>
            </div>

            <div class="cell">
                <div class="label">Category:</div>
                <div class="value">{{ productDetails.category_name }}</div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
export default {
    props: {
        selectedProductId: Number,
    },
    data() {
        return {
            productDetails: null,
            quantity: 1, // Initialized quantity
        }
    },
    watch: {
        selectedProductId: {
            immediate: true,
            handler(newVal) {
                this.fetchProductDetails(newVal);
            }
        }
    },
    methods: {
        async fetchProductDetails(productId) {
            const token = localStorage.getItem('token');
            if (!token || !productId) {
                console.error('Token or Product ID not found');
                return;
            }
            try {
                const response = await axios.get(`http://34.147.186.30:8000/api/products/${productId}/`, {
                    headers: { 'Authorization': `Token ${token}` },
                });
                this.productDetails = response.data;
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        },
        reduce() {
            if (this.quantity > 1) this.quantity--;
        },
        add() {
            this.quantity++;
        },
      async addToCart() {
          const cartID = localStorage.getItem('shoppingCartID');
          const token = localStorage.getItem('token');
          if (!cartID || !this.selectedProductId || !token) {
              this.$message.error('Missing necessary information.');
              return;
          }
          try {
              const response = await axios.post(`http://34.147.186.30:8000/api/shopping-cart-items/cart/${cartID}/`, {
                  cartID: cartID,
                  productID: this.selectedProductId.toString(),
                  quantity: this.quantity.toString()
              }, {
                  headers: { 'Authorization': `Token ${token}` },
              });

              if (response.status === 201) {
                  this.$message({
                      message: 'Add to shopping cart successfully!',
                      type: 'success',
                      duration: 5000
                  });
              }
          } catch (error) {
              if (!error.response) {
                  this.$message.error('An unexpected error occurred.');
                  return;
              }
              // according different errors to different message
              const { status, data } = error.response;
              let errorMessage = 'Failed to add the product to the cart.';
              if (status === 400 && data.quantity) {
                  errorMessage = data.quantity; // "Requested quantity exceeds available stock of {product.stock}."
              } else if (status === 404) {
                  errorMessage = 'Product not found.';
              } else if (status === 400 && data.non_field_errors) {
                  errorMessage = data.non_field_errors.join(' ');
              } else if (status === 400) {
                  errorMessage = Object.values(data).join(' ');
              }
              this.$message.error(errorMessage);
          }
      }

    }
}
</script>

<style scoped lang="scss">
.goods {
    width: 100%;
    height: 100%;
    padding: 40px 40px 40px 130px;
    display: flex;
    font-family: Poppins;

    .cover {
        width: 556px;
        height: 556px;
    }

    .right {
        width: calc(100% - 556px);
        padding-left: 24px;

        .nameBox {
            color: rgb(26, 26, 26);
            font-size: 36px;
            font-weight: 600;
            margin-bottom: 20px;

            .nameTag {
                border-radius: 4px;
                background: rgba(32, 181, 38, 0.2);
                padding: 8px 4px;
                /* Body Small/Body Small, 400 */
                color: rgb(44, 116, 47);
                font-size: 14px;
                font-weight: 400;
                margin-left: 8px;

            }
        }

        .priceBox {
            .original {
                color: rgb(179, 179, 179);
                font-size: 20px;
                font-weight: 400;
                text-decoration-line: line-through;
            }

            .price {
                color: rgb(44, 116, 47);
                font-size: 24px;
                font-weight: 500;
                margin-left: 3px;
            }

            .priceTag {
                padding: 3px 10px;
                color: rgb(234, 75, 72);
                font-size: 14px;
                font-weight: 500;
                border-radius: 100px;
                background: rgba(234, 75, 72, 0.1);
                margin-left: 12px;
            }
        }

        .msg {
            color: rgb(128, 128, 128);
            font-size: 14px;
            font-weight: 400;
            padding: 24px 0;
            border-top: 1px solid rgb(230, 230, 230);
            border-bottom: 1px solid rgb(230, 230, 230);
            margin-top: 20px;

        }

        .numberBox {
            padding: 18px 0;
            border-bottom: 1px solid rgb(230, 230, 230);
            margin-bottom: 24px;

            .el-icon-goods {
                margin-left: 16px;
                font-weight: 700;
            }

            .inputNumber {
                box-sizing: border-box;
                border: 1px solid rgb(230, 230, 230);
                border-radius: 170px;
                background: rgb(255, 255, 255);
                padding: 8px;
                margin-right: 12px;

                .input {
                    color: rgb(26, 26, 26);
                    font-size: 16px;
                    font-weight: 400;
                    text-align: center;
                    min-width: 40px;
                }

                .btn {
                    border-radius: 34px;
                    background: rgb(242, 242, 242);
                    width: 34px;
                    height: 34px;
                    font-size: 18px;
                    font-weight: 600;
                }
            }
        }

        .cell {
            color: rgb(26, 26, 26);
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            .label {
                margin-right: 4px;
            }

            .value {
                color: rgb(128, 128, 128);
                font-family: Poppins;
                font-size: 14px;
                font-weight: 400;

                div {
                    margin-right: 5px;
                }

                .link {
                    color: rgb(26, 26, 26);
                    font-size: 14px;
                    font-weight: 400;
                    text-decoration-line: underline;
                    cursor: pointer;
                }
            }

        }

    }
}
</style>
