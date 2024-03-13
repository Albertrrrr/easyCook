<template>
  <div id="main-view">
    <!-- Header Section -->
    <header-component></header-component>

    <!-- Main Content -->
    <div class="main-content">

      <navigation-component></navigation-component>
      <dashboard-component></dashboard-component>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/header.vue';
import NavigationComponent from '../components/navigation.vue'
import DashboardComponent from '../components/dashboard.vue';

export default {
  components: {
    'header-component': HeaderComponent,
    'navigation-component':NavigationComponent,
    'dashboard-component': DashboardComponent
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
