<template>
  <div class="shopCar">
    <div class="content">
      <div class="title flex row-between">
        <div class="text">Shopping Card (2)</div>
        <i class="el-icon-close btn" @click="$emit('update', false)"></i>
      </div>
      <div class="carList">
        <div class="item flex" v-for="(item, i) in 2" :key="i">
          <img src="@/assets/image/img.png" alt="">
          <div class="goods flex">
            <div class="left">
              <div class="goodsName">Fresh Indian Orange</div>
              <div class="num">
                <span>1 kg x </span>
                <span class="big">12.00</span>
              </div>
            </div>
            <i class="el-icon-circle-close close btn"></i>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="total flex row-between">
          <div>2 Product</div>
          <div class="price">$26.00</div>
        </div>
        <el-button type="success" class="w100" round>Checkout</el-button>
        <el-button type="success" class="w100 successBtn" plain round @click="onGoCart">Go To Cart</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopCar',
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onGoCart() {
      //this.$router.push('/account')
      this.$router.push('/shoppingcart')
      this.$emit('update', false)
    }
  }
}
</script>

<style scoped lang="scss">
.w100 {
  width: 100%;
}

::v-deep.successBtn {
  margin: 12px 0 0 0 !important;
  border: none;
}

.shopCar {
  width: 100%;
  height: 100%;
  padding: 40px;
  font-family: Poppins;
  color: rgb(26, 26, 26);


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

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    padding-bottom: 20px;
  }

  .total {
    font-size: 16px;
    font-weight: 400;
    padding: 24px 0;

    .price {
      color: rgb(26, 26, 26);
      font-size: 16px;
      font-weight: 600;
    }
  }

}
</style>
