<template>
  <div id="main-view">
    <!-- Header Section -->
    <header-component></header-component>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Navigation Sidebar -->

   <navigation-component></navigation-component>
      <!-- Dashboard Content -->
      <detail-component></detail-component>

    </div>
    <div class="main2">

            <detail2-component> </detail2-component>
    </div>

  </div>
</template>

<script>
// 引入子組件
import HeaderComponent from '../components/header.vue';
import NavigationComponent from '../components/navigation.vue'
import DetailComponent from '../components/detail.vue';
import Detail2Component from "@/components/detail2.vue";

export default {
  components: {
    'header-component': HeaderComponent,
    'navigation-component':NavigationComponent,
    'detail-component': DetailComponent,
        'detail2-component': Detail2Component
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

.main2{
  margin-left: 275px;
}
</style>
