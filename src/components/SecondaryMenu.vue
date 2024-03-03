<script>

export default {
  data() {
    return {
      menuList: [
        {
          type: 'icon',

        }, {
          type: 'menu',
          name: 'shoppingCart'
        }, {
          type: 'menu',
          name: 'Check out'
        }
      ]
    }
  }
}

</script>

<template>

  <div class="SecondaryMenu-container">
    <div class="SecondaryMenu-item" v-for="(item,index) in menuList" :key="index">
      <img class="home-icon" v-if="item.type === 'icon'" src="../assets/images/home-icon.png">
      <span v-if="item.type !== 'icon'" class="main-item" :class="{
        'last-item':index === menuList.length -1
      }">{{ item.name }}</span>
      <img class="jt-right" src="../assets/images/jt-right.png" v-if="index !== menuList.length-1">
    </div>
  </div>
</template>

<style scoped lang="scss">
.SecondaryMenu-container {
  width: 1320px;
  margin: 0 auto;
  padding: 16px 0;
  height: 60px;
  box-sizing: border-box;
  color: rgb(153, 153, 153);
  font-size: 20px;
  display: flex;
  align-items: center;
  font-weight: 00;

  .SecondaryMenu-item {
    display: flex;
    align-items: center;
  }

  .main-item {
    cursor: pointer;

  }

  .home-icon {
    width: 18px;
    height: 19px;
  }

  .last-item {
    color: rgb(44, 116, 47);
  }


  .jt-right {
    width: 32px;
  }

}
</style>