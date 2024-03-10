<template>
<div class="container">
    <!-- Account Settings -->
    <div class="account-settings">
        <h2>Account Settings</h2>
        <label for="username">User name</label>
      <input type="text" id="username" v-model="username">

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email">
      <div>
              <button @click="updateUser">Save Changes</button>
      </div>

    </div>

    <!-- Change Password -->
  <div class="change-password">
        <h2>Change Password</h2>
        <label for="current-password">Current Password</label>
        <input type="password" id="current-password" v-model="old_password">
    <div class="change-pass">
      <div class="change">
        <label for="new-password">New Password Password</label>
        <input type="password" id="new-password" v-model="new_password">
      </div>
    </div>
      <button @click="changePassword">Change Password</button>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
      return {
        username: '',
        email: '',

        old_password: '',
        new_password: '',
      };
    },
  methods: {
    updateUser() {
      // Make sure to use `http://` and include the port if necessary
      axios.patch("http://35.197.196.50:8000/api/user/update/", {
        username: this.username,
        email: this.email
      })
      .then(response => {
        console.log('User details updated:', response);
        alert('User details updated successfully.');
      })
      .catch(error => {
        console.error('Error updating user details:', error);
        alert('User details updated fails.');
      });
    },
      //---------------------------------
      changePassword() {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
         axios.put(`35.197.196.50:8000/api/user/${userId}/change-password`, {
             headers: {
                Authorization: `Token ${token}`,
              },
           old_password: this.old_password,
          new_password: this.new_password
        })
        .then(response => {
          // 密码更新成功后的操作
          alert("Password changed successfully!");
        })
        .catch(error => {
          // 密码更新失败后的操作
          console.error("Error changing password:", error);
          alert("Failed to change password.");
        });

        // 日志记录，用于调试
        console.log("New password submitted:", this.new_password);
      }
    }
}
</script>


<style scoped lang="scss">

 .container {
    width: 70%;
    margin: 30px;
    background-color: #fff;
    float:left;
}

.container .account-settings {
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 8px;
  padding-left : 20px;
  padding-bottom: 25px;
  background: rgb(255, 255, 255);
}

h2 {
    color: #333;
    font-size: 1.5em;
    margin-bottom: 18px;

}
label {
    display: block;
    margin: 10px 0 5px;
    font-size: 1em;
}

input[type="text"],
input[type="email"]{
    width: 50%;
    padding: 10px;
    margin-bottom: 10px;
    margin-right: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
}
button:hover {
  background-color: #45a049;
}
/*================================= */
.container .billing-address {
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 8px;
  padding-left : 20px;
  margin-top: 20px;
  background: rgb(255, 255, 255);
}

input[type=address]{
  width: 80%;
    padding: 10px;
    margin-bottom: 10px;
    margin-right: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.city-post {
  display: flex;

}
.post{
  flex: 1;
  margin-right: 20px;
}
.city label{
  display: block;
}

input[type=post]{
  width: 60%;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.bbuttom{
  margin-bottom: 10px;
}

/* Specific styles for the 'Change Password' section */
.container .change-password {
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 8px;
  padding-left : 20px;
  margin-top: 20px;

}


input[type="password"] {
  width: 60%;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>