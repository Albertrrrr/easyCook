<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <div class="header">
          <h1>Create Account</h1>
          <el-radio-group v-model="form.userType" class="user-type">
            <el-radio label="user">Customer</el-radio>
            <el-radio label="manager">Manager</el-radio>
          </el-radio-group>
        </div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Email">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Username">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            <div class="password-hint">Password must be at least 8 characters long and contain at least one uppercase and one lowercase letter.</div>
          </el-form-item>
          <el-form-item label="Code">
            <el-row :gutter="20">
              <el-col :span="18">
                <el-input v-model="form.code" autocomplete="off" placeholder="Customer Optional"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="success" @click="generateVCode">Generate</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="success" style="width: 100%;" @click="registerAccount">Create Account</el-button>
          </el-form-item>
        </el-form>
        <div class="text-center">
          Already have an account?
          <router-link to="/login" class="btn">
              <span> Sign in </span>
          </router-link>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        code: '',
        userType: 'user', // 默认选中的用户类型
      }
    };
  },
   methods: {
    async generateVCode() {
      if (this.form.userType === 'user') {
        // 如果用户类型为 user，显示提示消息
        Message({
          message: 'Users do not need to enter a verification code',
          type: 'info'
        });
      } else {
        // 如果用户类型为 manager，发送 POST 请求
        try {
          const response = await axios.post('http://35.197.196.50:8000/api/generateVCode/', {
            email: this.form.email // 确保此处绑定了表单中的邮箱输入数据
          });
          // 如果请求成功
          if (response.status === 200) {
            Message({
              message: 'Verification code has been generated, please contact the administrator to get this.',
              type: 'success'
            });
          }
        } catch (error) {
          // 如果请求失败
          Message({
            message: 'An error has occurred while generating the verification code, please try again later.\n',
            type: 'error'
          });
          console.error('Error during code generation:', error);
        }
      }
    },
      async registerAccount() {
        try {
          const response = await axios.post('http://35.197.196.50:8000/api/register/', {
            user_type: this.form.userType,
            v_code: this.form.code,
            email: this.form.email,
            password: this.form.password,
            username: this.form.username
          });

          // 如果注册成功
          if (response.status === 201) {
            Message({
              message: 'Successful',
              type: 'success'
            });

            // 等待2秒后跳转
            setTimeout(() => {
              this.$router.push('/login');
            }, 2000);
          }
        } catch (error) {
          let errorMessage = 'Unsuccessful';
          if (error.response && error.response.data) {
            // 提取后端返回的错误消息
            for (let key in error.response.data) {
              if (error.response.data[key].length > 0) {
                errorMessage = error.response.data[key][0];
                break;
              }
            }
          } else {
            // 如果没有详细的错误信息，则显示通用错误
            errorMessage += `: ${error.message}`;
          }
          // 显示错误消息
          Message({
            message: errorMessage,
            type: 'error'
          });
        }
    } //end
  }
};
</script>

<style scoped>
.box-card {
  max-width: 650px;
  margin: 10px auto;
  padding: 35px;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}

.user-type {
  margin-top: 20px;
}

.text-center {
  text-align: center;
}

.el-form-item {
  margin-bottom: 20px;
}

/* 根据您的颜色需求进行调整 */
.el-radio__inner {
  border-color: green;
}

.el-radio__input.is-checked .el-radio__inner {
  border-color:green;
  background-color: green;
}

.el-radio__input.is-checked .el-radio__inner::after {
  background-color: #ffffff;
}

.el-button--success {
  background-color: green;
  border-color: green;
}

/* 调整 Generate 按钮的大小以适应列宽 */
.el-col {
  display: flex;
  align-items: center;
  width: 210px;
}

.el-button {
  width: 100%;
}

/* 修正边距 */
.el-row {
  margin-right: -10px;
  margin-left: -10px;
}

.el-col {
  padding-right: 10px;
  padding-left: 10px;
}
</style>