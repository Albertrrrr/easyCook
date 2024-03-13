<template>
  <div class="headerContent">
    <header class="header">
      <div class="w content">
        <img src="../assets/image/logo.png" class="logo" @click="goIndex">
        <div class="search flex" v-if="isShowSearch">
          <el-input prefix-icon="el-icon-search" v-model="keyWords" placeholder="search"></el-input>
          <div class="btn seachBtn" @click="searchProduct">search</div>
        </div>
        <div class="shopping flex btn" @click="clickShop" v-if="isShowCar">
            <el-badge :value="cartItemCount" type="primary">
              <img src="@/assets/image/Bag.png" alt="">
            </el-badge>
          <span>Shopping cart:</span>
        </div>
        <div class="login btn" @click="goLogin" v-if="!isManager">
          <span>User Account</span>
        </div>
      </div>

    </header>

    <!-- 购物车 -->
      <el-drawer :visible.sync="shopDrawer" :with-header="false" :size="456">
      <shopCar ref="shopCar" @update:cartItemCount="cartItemCount = $event" @update="shopDrawer = false"></shopCar>
    </el-drawer>
  </div>
</template>

<script>
import shopCar from "@/components/shopCar.vue";
import { Message } from 'element-ui';

export default {
  components: {shopCar},
  props: {
    isShowSearch: {
      type: Boolean,
      default: () => true,
    },
    isShowCar: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      keyWords: '',
      cartItemCount: 0,
      shopDrawer: false,

    }
  },
  mounted() {
    this.updateCartCountFromLocalStorage();
 },
  watch: {
  shopDrawer(newVal) {
    if (!newVal) {
      this.updateCartCountFromLocalStorage();
    }
  }
},
   computed: {
    isManager() {
      return localStorage.getItem('type') === 'manager';
    }
  },
  methods: {
    updateCartCountFromLocalStorage() {
    const count = localStorage.getItem('cartItemCount');
    this.cartItemCount = count ? parseInt(count, 10) : 0;
    },
    clickShop() {
      this.shopDrawer = true
      // this.$emit('clickShop')
    },
    goIndex() {
      const currentID = localStorage.getItem('id');
      console.log("__",currentID)
      if(currentID === null){
        this.$router.push('/')
      }else {
        this.$router.push('/index')
      }

    },
    goLogin() {
      this.$router.push('/dash')
    },
    searchProduct() {
            const trimmedKeyWords = this.keyWords.trim();
            if (trimmedKeyWords === '') {
              Message({
                type: 'warning',
                message: 'Please enter a search term.'
              });
              return;
            }

            if (this.lastSearch === trimmedKeyWords) {
              // if searching value is same as last time, then no need to reload
              if (this.$route.path === `/search/${trimmedKeyWords}`) {
                this.refreshData();
                return;
              }
            }

            this.lastSearch = trimmedKeyWords;
            // If already on the search page, use 'replace' to avoid errors and an invalid history stack.
            // othwise, use 'push' for normal navigation.
            if (this.$route.path === `/search/${trimmedKeyWords}`) {
              this.$router.replace({ path: `/search/${trimmedKeyWords}` });
            } else {
              this.$router.push({ path: `/search/${trimmedKeyWords}` });
            }
          }, //close
  }
}
</script>

<style scoped lang="scss">
.headerContent {
  height: 93px;
}

.header {
  height: 93px;
  box-shadow: inset 0px -1px 0px 0px rgb(230, 230, 230);
  background: rgb(255, 255, 255);
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 0 37px;


  .content {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    position: relative;
  }

  .login {
    color: rgb(51, 51, 51);
    font-family: Poppins;
    font-size: 20px;
    font-weight: 400;

    span:hover {
      color: #2c742f;
    }
  }

  .logo {
    width: 227px;
    height: 72px;
    margin-bottom: -7px;
    cursor: pointer;
  }

  .search {
    height: 58px;

    ::v-deep .el-input {
      height: 100%;
      width: 400px;

      input {
        height: 100%;
        border-radius: 6px 0 0 6px;
      }
    }

    .seachBtn {
      color: rgb(255, 255, 255);
      font-family: Poppins;
      font-size: 20px;
      font-weight: 400;
      width: 119px;
      height: 100%;
      border-radius: 0px 6px 6px 0px;
      background: rgb(44, 116, 47);
    }
  }

  .shopping {
    img {
      width: 34px;
      height: 34px;
    }


    span {
      color: rgb(51, 51, 51);
      font-family: Poppins;
      font-size: 20px;
      font-weight: 400;
      margin-left: 12px;
    }

    span:hover {
      color: #2c742f;
    }


    ::v-deep .el-badge__content {
      top: 6px;
      right: 19px;
    }
  }
}
</style>
