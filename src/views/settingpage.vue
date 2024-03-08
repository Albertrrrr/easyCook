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
  </div>
</template>


<script>
// 引入子組件
import HeaderComponent from '../components/header.vue';
import NavigationComponent from "../components/navigation.vue";
import SettingComponent from '../components/setting.vue'
export default {
  components: {
    'header-component': HeaderComponent,
    'setting-component':SettingComponent,
    'navigation-component':NavigationComponent,
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
</style>
