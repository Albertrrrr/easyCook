<template>
  <div class="welcomeLogin">
    <myHeader :isShowCar="false" :isShowSearch="false"></myHeader>
    <el-carousel class="swiper" arrow="never" @change="swiperchage">
      <el-carousel-item v-for="(item, index) in swiperData" :key="index" class="swiperItem">
        <!-- <img :src="item" alt="" style="width: 100%; height: 100%" /> -->
        <div :style="{ background: `url(${item}) no-repeat center center`, width: '100%', height: '100%', backgroundSize: 'cover' }"></div>
      </el-carousel-item>
      <div class="btns flex">
        <router-link to="/login" class="btn">
          <span>Log In</span>
          <i class="el-icon-right"></i>
        </router-link>
        <router-link to="/register" class="btn">
          <span>Sign Up</span>
          <i class="el-icon-right"></i>
        </router-link>
      </div>
    </el-carousel>
  </div>
</template>

<script>
  // 头部
  import myHeader from "@/components/header.vue";
  // 面包屑
  import hamburger from "@/components/hamburger.vue";
  export default {
    components: { myHeader, hamburger },
    data() {
      return {
        current: 0,
        swiperData: ["https://storage.googleapis.com/ithcs/lunbo-01.png", "https://storage.googleapis.com/ithcs/lunbo-02.png", "https://storage.googleapis.com/ithcs/lunbo-03.png"]
      };
    },
    methods: {
      swiperchage(e) {
        this.current = e;
      }
    }
  };
</script>

<style scoped lang="scss">
  .swiper {
    width: 1320px;
    height: 70vh;
    margin: -80px auto auto auto;
    position: relative;

    ::v-deep .el-carousel__indicators--horizontal {
      bottom: 50px;
    }

    ::v-deep .el-carousel__indicator--horizontal .el-carousel__button {
      width: 8px;
      height: 8px;
      background: rgb(180, 204, 180);
      border-radius: 50px;
      transition: all 0.5s;
    }

    ::v-deep .el-carousel__indicator--horizontal.is-active .el-carousel__button {
      width: 16px;
      height: 8px;
      background: rgb(0, 179, 7);
    }

    .btns {
      position: absolute;
      bottom: 120px;
      left: 100px;
      z-index: 998;

      .btn {
        width: 191px;
        height: 51px;
        border-radius: 53px;
        background: rgb(44, 116, 47);
        color: rgb(255, 255, 255);
        font-size: 16px;
        font-weight: 600;
        margin-right: 60px;

        span {
          margin-right: 25px;
        }

        i {
          transition: all 0.5s;
        }

        &:hover {
          i {
            transform: translateX(20px);
          }
        }
      }
    }
  }

  ::v-deep .el-carousel__container {
    width: 100%;
    height: 100%;
  }

  .swiperItem {
    width: 100%;
    height: 100%;
    background: rgb(237, 242, 238);
  }

  ::v-deep .el-carousel__indicators--outside {
    display: none;
  }
</style>
