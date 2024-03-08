<template>
  <div>
    <aside class="navigation">
      <h2>Navigation</h2>
      <ul>
        <li><router-link to="/path" tag="a">Dashboard</router-link></li>
        <li><router-link to="/path" tag="a">Order History</router-link></li>
        <li><router-link to="/path" tag="a">Shopping Cart</router-link></li>
        <li><router-link to="/path" tag="a">Settings</router-link></li>
        <li><p to="/path" tag="a" @click="showModal">Log-out</p></li>
      </ul>
    </aside>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <h3>log out?</h3>
        <button @click="logout">Confirm</button>
        <button @click="hideModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    logout() {
      // Implement logout logic here
      alert('Logged out');
      this.hideModal();
    }
  }
}
</script>

<style scoped lang="scss">
.navigation {

  margin-left: 50px;
  margin-right:25px;
  width: 200px;
  height: 280px;
  padding: 0px;
  float:left;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 8px;
  background: rgb(255, 255, 255);
}

.navigation h2 {
  margin-bottom: 10px;
  margin-top: 20px;
  padding-left:20px;
}

.navigation ul {
list-style: none;
  padding: 10px;
}

.navigation ul li a,.navigation ul li p {
  color: #333;
  text-decoration: none;
  padding: 10px 17px;
  display: inline-block;
  text-align: left;
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-content h3 {
  margin-bottom: 20px;
}


  button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  }
</style>
