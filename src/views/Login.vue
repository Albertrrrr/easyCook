<template>
  <div class="login-container">
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
      <a href="#">Don't have an account? Sign up</a>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { MessageBox, Message } from 'element-ui';

export default {
  data() {
    return {
      email: '',
      password: '',
      role: 'user'
    };
  },
  methods: {
    async login(){
       try {
        const response = await axios.post('http://35.197.196.50:8000/api/login/', {
          email: this.email,
          password: this.password,
          user_type: this.role,
        });

        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('username', response.data.username);

          MessageBox.alert('Successful login, 2 seconds to jump...', 'Successful', {
            confirmButtonText: 'ok',
            callback: () => {
              // 设置一个 3 秒的倒计时后跳转
              setTimeout(() => {
                if(this.role === 'user'){
                  this.$router.push('/');
                }else {
                  //管理员后台主页
                }
              }, 1500);
            }
          });
        }
      } catch (error) {
        // 使用 Element UI 的 Message 组件显示错误消息
        Message.error('Unsuccessful：' + error.response.data.detail);
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
