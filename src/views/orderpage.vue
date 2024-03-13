<template>
  <div id="main-view">
    <!-- Header Section -->
    <header-component></header-component>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Navigation Sidebar -->
   <navigation-component></navigation-component>

      <!-- Dashboard Content -->
      <order-component></order-component>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/header.vue';

import OrderComponent from '../components/order.vue';
import NavigationComponent from "@/components/navigation.vue";

export default {
  components: {
    'header-component': HeaderComponent,
    'navigation-component':NavigationComponent,
    'order-component': OrderComponent
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
