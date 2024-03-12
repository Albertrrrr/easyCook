<template>
  <div class="user">
    <myHeader :isShowCar="false" :isShowSearch="false"></myHeader>
    <div class="user-container">
      <manager-navigation></manager-navigation>
      <div class="right-container">
        <div style="display: flex; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px">
          <div style="font-size: 23px; font-weight: 700">Change page</div>
        </div>
        <div>
          <h1>Change Your Password</h1>
          <el-form>
            <el-form-item label="New Email:">
              <el-input v-model="Email" placeholder="New Email"></el-input>
            </el-form-item>
            <el-form-item label="New UserName:">
              <el-input v-model="newUsername" placeholder="New UserName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changeEmail">Change</el-button>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item label="Current Password:">
              <el-input v-model="currentPassword" type="password" placeholder="Current Password"></el-input>
            </el-form-item>
            <el-form-item label="New Password:">
              <el-input v-model="newPassword" type="password" placeholder="New Password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword">Change</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div style="margin-top: 40px; display: none">
      <div style="position: absolute; left: 240px; top: 180px; border: 1px solid #ccc; border-radius: 10px">
        <div style="display: flex; flex-direction: column">
          <div class="displayflex" style="font-size: 23px; font-weight: 700; height: 40px; margin-top: 10px">Navigation</div>
          <div class="displayflex active" style="margin-top: 12px">
            <router-link to="/user">
              <div><img src="../assets/image/outlogin.png" /></div>
              <div class="navtext">Welcome</div>
            </router-link>
          </div>
          <div class="displayflex">
            <router-link to="/CustomerOrder">
              <div><img src="../assets/image/outlogin.png" /></div>
              <div class="navtext">Cumstomers Order</div>
            </router-link>
          </div>

          <div class="displayflex">
            <router-link to="/myprodcut">
              <div><img src="../assets/image/outlogin.png" /></div>
              <div class="navtext">My Product</div>
            </router-link>
          </div>

          <div class="displayflex">
            <router-link to="/category">
              <div><img src="../assets/image/outlogin.png" /></div>
              <div class="navtext">Category</div>
            </router-link>
          </div>
          <div class="displayflex">
            <div><img src="../assets/image/outlogin.png" /></div>
            <div class="navtext">Log-out</div>
          </div>
        </div>
      </div>

      <div style="position: absolute; left: 610px; top: 175px; height: 80px">
        <div style="display: flex; align-items: center; border-bottom: 1px solid #ccc; padding-bottom: 8px">
          <div style="font-size: 23px; font-weight: 700">Welcome page</div>
        </div>
        <div>
          <h1>Welcome</h1>
          <form @submit.prevent="changeEmail">
            <label for="newEmail">New Email:</label>
            <input type="email" id="Email" v-model="Email" required />
            <label for="newPassword">New userName:</label>
            <input type="text" id="newUsername" v-model="newUsername" required />
            <button type="submit">change</button>
          </form>

          <form @submit.prevent="changePassword">
            <label for="currentPassword">Current Password:</label>
            <input type="password" id="currentPassword" v-model="currentPassword" required />
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" v-model="newPassword" required />
            <button type="submit">change</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import myHeader from "@/components/header.vue";
  import managerNavigation from "@/components/managerNavigation.vue";

  export default {
    components: {managerNavigation, myHeader},
    data() {
      return {
        Email: "",
        currentPassword: "",
        newPassword: "",
        newUsername: ""
      };
    },
    methods: {
      async changeEmail() {
        try {
          const response = await axios.patch(
            `http://34.147.186.30:8000/api/user/update/`,
            {
              email: this.Email,
              user: this.newUsername
            },
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}` // 假设需要登录令牌进行认证
              }
            }
          );
          console.log(response.data); // Handle response as needed
          // Clear the form after successful submission
          this.Email = "";
        } catch (error) {
          alert(error);
          console.error(error);
          // Handle error
        }
      },
      async changePassword() {
        try {
          const response = await axios
            .put(
              `http://34.147.186.30:8000/api/user/${localStorage.getItem("id")}/change-password/`,
              {
                old_password: this.currentPassword,
                new_password: this.newPassword
              },
              {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}` // 假设需要登录令牌进行认证
                }
              }
            )
            .then((response) => {})
            .catch((error) => {
              if (error.response) {
                console.error("Response:", error.response.data);
                alert(JSON.stringify(error.response.data));
              }

              console.error("Response:", error.response);
            });

          this.currentPassword = "";
          this.newPassword = "";
        } catch (error) {
          console.log(error.response);
          console.error(error);
          // Handle error
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .user-container {
    display: flex;
    box-sizing: border-box;
    padding: 0 0 0 240px;
    margin-top: -50px;
    .left-container {
      width: 220px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
    .right-container {
      flex: 1;
      margin-left: 30px;
      border: 1px solid #ccc;
      padding: 10px 20px;
      border-radius: 10px;
    }
  }

  /* Form container */
  .el-form {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    margin-top: 20px;
    ::v-deep .el-form-item__label {
      font-weight: bold;
      color: black;
    }
  }
  // form {
  //   max-width: 500px;
  //   margin: 0 auto;

  // }

  /* Form groups */
  .form-group {
    margin-bottom: 30px;
  }

  /* Labels */
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  /* Inputs */
  input[type="email"],
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  /* Submit button */
  button[type="submit"] {
    display: block;
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button[type="submit"]:hover {
    background-color: #0056b3;
  }

  .navleft {
    height: 40px;
    padding: 0 40px;
    line-height: 60px;
    font-size: 40px;
    color: green;
    position: absolute;
    left: 200px;
    top: 22px;
  }

  .bodynav {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    height: 60px;
    line-height: 60px;
  }

  .navright {
    display: flex;
  }

  .navright .navcart {
    display: flex;
    position: absolute;
    right: 388px;
    align-items: center;
  }

  .navright .navcart img {
    width: 22px;
    height: 22px;
  }

  .navcartarea {
    font-size: 20px;
    margin-bottom: 14px;
    margin-left: 12px;
  }

  .navsign {
    position: absolute;
    right: 108px;
  }

  .navsignarea {
    font-size: 20px;
  }

  .flex {
    display: flex;
    align-items: center;
    position: absolute;
    left: 240px;
    top: 110px;
  }

  .img20 {
    width: 20px;
    height: 20px;
    font-size: 20px;
  }

  .font20 {
    font-size: 20px;
  }

  .displayflex {
    display: flex;
    height: 50px;
    align-items: center;
    padding: 10px 15px;
  }

  .displayflex img {
    width: 20px;
    height: 20px;
    flex: 0 0 auto;
  }

  .navtext {
    font-size: 18px;
    margin-left: 8px;
  }

  .active {
    background-color: rgb(196 240 196);
    border-left: 10px;
    border-color: red;
    border-width: 10px;
    font-weight: 700;
  }

  table {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
    width: 1200px;
    margin-top: 20px;
  }

  table td,
  table th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 50px;
    width: 500px;
    font-size: 19px;
  }

  table thead th {
    background-color: #cce8eb;
    width: 100px;
  }

  table tr:nth-child(odd) {
    background: #fff;
  }

  table tr:nth-child(even) {
    background: #f5fafa;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }

  .pagination a {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 5px;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    text-decoration: none;
    color: #333;
  }

  .pagination a.active {
    background-color: rgb(196 240 196);
    color: #fff;
  }

  a {
    text-decoration: none;
    display: flex;
    color: black;
  }
</style>
