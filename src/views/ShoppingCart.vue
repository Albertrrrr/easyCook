<template>
  <div class="shoppingCart-container">
    <SecondaryMenu/>
    <p class="min-title">My Shopping Cart</p>
    <div class="account-container">
      <div class="account-area">
        <div class="account-left">

          <div class="card-con">
            <ul class="Cart-title">
              <li class="title-item t1">PRODUCT</li>
              <li class="title-item t3">PRICE</li>
              <li class="title-item t4">QUANTITY</li>
              <li class="title-item t5">SUBTOTAL</li>
              <li class="t2"></li>
            </ul>
            <ul class="cart-list">
              <li class="cart-list-item">
                <img src="../assets/images/a.png">
                <p class="product-name">Fish Chip Burger Curry Sauce</p>
                <p class="product-price">$14.00</p>
                <div class="counter-container">
                  <div class="counter-item">
                    <span class="el-icon-minus"></span>
                  </div>
                  <div class="counter-item counter-center">
                    1
                  </div>
                  <div class="counter-item">
                    <span class="el-icon-plus"></span>
                  </div>
                </div>
                <p class="product-price all-price" style="font-weight: 500;">$14.00</p>
                <span class="del-produce">
                <i class="el-icon-minus" color="rgb(102, 102, 102)"></i>
              </span>
              </li>
              <li class="cart-list-item">
                <img src="../assets/images/b.png">
                <p class="product-name">Fish Chip Burger Curry Sauce</p>
                <p class="product-price">$28.00</p>
                <div class="counter-container">
                  <div class="counter-item">
                    <span class="el-icon-minus"></span>
                  </div>
                  <div class="counter-item counter-center">
                    2
                  </div>
                  <div class="counter-item">
                    <span class="el-icon-plus"></span>
                  </div>
                </div>
                <p class="product-price all-price" style="font-weight: 500;">$14.00</p>
                <span class="del-produce">
                <i class="el-icon-minus" color="rgb(102, 102, 102)"></i>
              </span>
              </li>
              <li class="cart-list-item">
                <img src="../assets/images/c.png">
                <p class="product-name">Fish Chip Burger Curry Sauce</p>
                <p class="product-price">$14.00</p>
                <div class="counter-container">
                  <div class="counter-item">
                    <span class="el-icon-minus"></span>
                  </div>
                  <div class="counter-item counter-center">
                    1
                  </div>
                  <div class="counter-item">
                    <span class="el-icon-plus"></span>
                  </div>
                </div>
                <p class="product-price all-price" style="font-weight: 500;">$14.00</p>
                <span class="del-produce">
                <i class="el-icon-minus" color="rgb(102, 102, 102)"></i>
              </span>
              </li>
            </ul>
            <div class="btn-container">
              <div class="btn-item">Return to shop</div>
              <div class="btn-item">Update Cart</div>
            </div>
          </div>
          <div class="code-con">
            <p class="code-left">Coupon Code</p>
            <div class="code-right">
              <input class="code-input" placeholder="Enter code"/>
              <p class="input-btn">Apply Coupon</p>
            </div>
          </div>

        </div>
        <div class="account-right">
          <div class="account-right-main">
            <p class="right-title">Cart Total</p>
            <ul class="card-total-list">
              <li class="cart-item">
                <span>Subtotal:</span>
                <span>$56.00</span>
              </li>
              <li class="cart-item">
                <span>Shipping:</span>
                <span>Free</span>
              </li>
              <li class="cart-item">
                <span>Total:</span>
                <span style="font-size: 18.42px;font-weight: 600;">$56.00</span>
              </li>
            </ul>
            <div class="btn-cart-total btn" @click="goAccount">Proceed to checkout</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SecondaryMenu from '@/components/SecondaryMenu.vue'

export default {
  components: {
    SecondaryMenu
  },
  methods:{
    goAccount(){
      this.$router.push('/account')
    }
  }
}
</script>

<style scoped lang="scss">

.min-title {
  color: rgb(26, 26, 26);
  font-size: 36.82px;
  font-weight: 600;
  text-align: center;
  margin: 38px 0;
}

.account-container {
  padding: 0 0 40px calc((100% - 1520px) / 8 * 5);

  .account-area {
    width: 1520px;
    display: flex;
    justify-content: space-between;


    .account-left {
      width: 65.8%;

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

          .product-name, .product-price {
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

      .btn-container {
        padding: 24px 23px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .btn-item {
          width: 193.6px;
          height: 51.2px;
          background: rgb(242, 242, 242);
          border-radius: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgb(77, 77, 77);
          font-size: 16.1px;
          font-weight: 600;
        }
      }

      .t1 {
        width: calc(100% - 585px);
        text-align: left;
      }

      .t2 {
        width: 28px;
      }

      .t3 {
        width: 90px;
      }

      .t4 {
        width: 142px;
        margin: 0 70px;
      }

      .t5 {
        width: 90px;
        margin-right: 70px;
      }
    }

    .account-right {
      width: 32.3%;
      height: 100px;

      .account-right-main {
        width: 100%;
        border: 1.15px solid rgb(230, 230, 230);
        padding: 27.6px;
        box-sizing: border-box;
        border-radius: 10px;

        .right-title {
          color: rgb(26, 26, 26);
          font-size: 23.02px;
          font-weight: 500;


        }

        .card-total-list {
          color: rgb(77, 77, 77);
          font-size: 16.11px;
          font-weight: 400;
          margin-bottom: 24px;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16.3px 0;
          border-bottom: 1px solid rgb(230, 230, 230);

          &:last-child {
            border-bottom: unset;
          }

          .card-item-right {
            color: rgb(26, 26, 26);
            font-size: 16.11px;
            font-weight: 500;
          }
        }

        .btn-cart-total {
          height: 58.8px;
          border-radius: 80px;
          background: rgb(44, 116, 47);
          color: rgb(255, 255, 255);
          font-size: 18.42px;
          font-weight: 600;
        }
      }
    }
  }

}
</style>
