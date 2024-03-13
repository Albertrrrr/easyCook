<template>
  <div class="login-container">
    <myHeader :isShowCar="false" :isShowSearch="false"></myHeader>
    <h2>Please Login</h2>
    <form @submit.prevent="login">
      <div class="form-radio">
        <input type="radio" id="customer" name="role" value="user" v-model="role">
        <label for="customer">Customer</label>
        <input type="radio" id="manager" name="role" value="manager" v-model="role">
        <label for="manager">Manager</label>
      </div>
      <div class="form-group">
        <input type="email" id="email" class="form-control" placeholder="Email" required v-model="email">
      </div>
      <div class="form-group">
        <input type="password" id="password" class="form-control" placeholder="Password" required v-model="password">
      </div>
      <button type="submit" class="btn">Login</button>
      <div class="text-center" style="margin-top: 30px">
        Already have an account?
        <router-link to="/register">
          <span> Sign up </span>
        </router-link>
      </div>

    </form>
  </div>
</template>

<script>
import axios from 'axios';
import {MessageBox, Message} from 'element-ui';
import myHeader from "@/components/header.vue";

export default {
  components: { myHeader },
  data() {
    return {
      email: '',
      password: '',
      role: 'user'
    };
  },
  methods: {
    async login() {
      try {
        const loginResponse = await axios.post('http://34.147.186.30:8000/api/login/', {
          email: this.email,
          password: this.password,
          user_type: this.role,
        });

        if (loginResponse.status === 200) {
          localStorage.setItem('token', loginResponse.data.token);
          localStorage.setItem('id', loginResponse.data.id);
          localStorage.setItem('username', loginResponse.data.username);
          localStorage.setItem('type', loginResponse.data.user_type);

          // Get shoppingCartID before the jump
          try {
            const shoppingCartResponse = await axios.get(`http://34.147.186.30:8000/api/shopping-cart/${loginResponse.data.id}/`, {
              headers: {
                'Authorization': `Token ${loginResponse.data.token}` // 假设需要登录令牌进行认证
              }
            });
            // Suppose the API returns a JSON object containing the shoppingCartID
            if (shoppingCartResponse.status === 200) {
              localStorage.setItem('shoppingCartID', shoppingCartResponse.data.shoppingCartID);
            }
          } catch (shoppingCartError) {
            console.error('Failed to fetch shoppingCartID:', shoppingCartError);
            // Errors can be handled here as needed, such as displaying a message to the user
          }

          MessageBox.alert('Successful login, 2 seconds to jump...', 'Successful', {
            confirmButtonText: 'ok',
            callback: () => {
              // Set a 2-second countdown before jumping
              setTimeout(() => {
                if (this.role === 'user') {
                  this.$router.push('/index');
                } else {
                  // Manager's homepage
                  // Add the appropriate route hopping logic
                  this.$router.push('/Welcome');
                }
              }, 2000);
            }
          });
        }
      } catch (error) {
        // Displaying Error Messages with Element UI's Message Component
        Message.error('Unsuccessful：Please check the password, email and login type.' );
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 650px;
  height: 400px;
  margin: auto;
  margin-top: 75px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the items horizontally */
}

.form-radio {
  margin: 30px 0; /* Top and bottom margin */
  display: flex;
  justify-content: center; /* Center the radio buttons */
}

.form-radio input {
  margin-right: 10px; /* Space to the right of the radio button */
}

.form-radio label {
  margin-right: 40px; /* Space between the label and the next radio button */
  font-size: 21px;
  margin-inside: 20px;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn {
  width: 100%;
  padding: 10px;
  background: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

a {
  text-align: center; /* Center the link */
  display: block;
  margin-top: 15px;
}
</style>
