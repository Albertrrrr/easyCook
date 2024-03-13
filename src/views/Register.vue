<template>
  <el-container>
    <myHeader :isShowCar="false" :isShowSearch="false"></myHeader>
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
import myHeader from "@/components/header.vue";
export default {
  components: {myHeader},
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        code: '',
        userType: 'user', // User type selected by default
      }
    };
  },
   methods: {
    async generateVCode() {
      if (this.form.userType === 'user') {
        // If the user type is user, display a prompt message
        Message({
          message: 'Users do not need to enter a verification code',
          type: 'info'
        });
      } else {
        // If the user type is manager, send a POST request
        try {
          const response = await axios.post('http://34.147.186.30:8000/api/generateVCode/', {
            email: this.form.email // Ensure that the mailbox input data from the form is bound here
          });
          // If the request is successful
          if (response.status === 200) {
            Message({
              message: 'Verification code has been generated, please contact the administrator to get this.',
              type: 'success'
            });
          }
        } catch (error) {
          // If the request fails
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
          const response = await axios.post('http://34.147.186.30:8000/api/register/', {
            user_type: this.form.userType,
            v_code: this.form.code,
            email: this.form.email,
            password: this.form.password,
            username: this.form.username
          });

          // If registration is successful
          if (response.status === 201) {
            Message({
              message: 'Successful',
              type: 'success'
            });

            // Wait 2 seconds and jump
            setTimeout(() => {
              this.$router.push('/login');
            }, 2000);
          }
        } catch (error) {
          let errorMessage = 'Unsuccessful';
          if (error.response && error.response.data) {
            // Extract the error messages returned by the backend
            for (let key in error.response.data) {
              if (error.response.data[key].length > 0) {
                errorMessage = error.response.data[key][0];
                break;
              }
            }
          } else {
            // If there is no detailed error message, a generic error is displayed
            errorMessage += `: ${error.message}`;
          }
          // Displaying Error Messages
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


.el-col {
  display: flex;
  align-items: center;
  width: 210px;
}

.el-button {
  width: 100%;
}


.el-row {
  margin-right: -10px;
  margin-left: -10px;
}

.el-col {
  padding-right: 10px;
  padding-left: 10px;
}
</style>