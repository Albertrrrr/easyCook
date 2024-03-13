
<template>
  <div class="navigation-container">
    <div class="navigation-header">Navigation</div>
    <div class="navigation-links">
      <router-link to="/Welcome" class="nav-link">
        <img src="../assets/image/order.png" class="nav-icon" />
        <span>Welcome</span>
      </router-link>

      <router-link to="/user" class="nav-link">
        <img src="../assets/image/order.png" class="nav-icon" />
        <span>User</span>
      </router-link>

      <router-link to="/CustomerOrder" class="nav-link">
        <img src="../assets/image/reflush.png" class="nav-icon" />
        <span>Customers Order</span>
      </router-link>

      <router-link to="/myProduct" class="nav-link">
        <img src="../assets/image/shop.png" class="nav-icon" />
        <span>My Product</span>
      </router-link>

      <router-link to="/category" class="nav-link">
        <img src="../assets/image/system.png" class="nav-icon" />
        <span>Category</span>
      </router-link>

      <div class="nav-link" @click="logOut">
        <img src="../assets/image/outlogin.png" class="nav-icon" />
        <span>Log-out</span>
      </div>
    </div>
</div>
</template>

<script >
  export default {
    name:"managerNavigation",
  data() {
    return {

    };
  },
  mounted() {
  },
    methods:{
       logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('type');
      // use Vue Router complies navigation to log in page
      this.$router.push('/login');
    },

    },

};

</script>

<style scoped lang="scss">
.navigation-container {
  display: flex;
  flex-direction: column;
  width: 250px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}

.navigation-header {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eaeaea;
}

.navigation-links {
  flex-grow: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-link:not(.active):hover {
  background-color: #f5f5f5;
}

.nav-link.active {
  background-color: #e0e0e0;
}

.nav-icon {
  margin-right: 12px;
  width: 24px;
  height: 24px;
}

.nav-link span {
  font-size: 18px;
}

</style>