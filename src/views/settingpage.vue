<template>
  <div id="main-view">
    <!-- Header Section -->
    <header-component></header-component>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Navigation Sidebar -->
    <navigation-component></navigation-component>
      <!-- Dashboard Content -->
      <setting-component></setting-component>


    </div>
    <div class="hi">    <address-component> </address-component>   </div>
  </div>
</template>


<script>
// 引入子組件
import HeaderComponent from '../components/header.vue';
import NavigationComponent from "../components/navigation.vue";
import SettingComponent from '../components/setting.vue'
import Address from "@/components/address.vue";
export default {
  components: {
    'header-component': HeaderComponent,
    'setting-component':SettingComponent,
    'navigation-component':NavigationComponent,
    'address-component':Address,
  }
}
</script>

<style>
#main-view {
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
}

.hi{
  margin-left: 550px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 8px;
  padding-left : 20px;
  margin-top: 10px;
  width: 1075px
}
</style>
