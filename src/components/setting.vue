<template>
<div class="container">

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
        const token = localStorage.getItem('token');
      axios.patch("http://34.147.186.30:8000/api/user/update/", {

        username: this.username,
        email: this.email
      },{headers: {
                Authorization: `Token ${token}`,
              }},)
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
      console.log("toke catch")
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      console.log("pass",this.old_password)
        console.log("pass",this.new_password)
         axios.put(`34.147.186.30:8000/api/user/${userId}/change-password`, {
           old_password: this.old_password,
          new_password: this.new_password
        },{headers: {
                Authorization: `Token ${token}`,
              },})
        .then(response => {
          alert("Password changed successfully!");
        })
        .catch(error => {
          console.error("Error changing password:", error);
          alert("Failed to change password.");
        });
        console.log("New password submitted:", this.new_password);
      }
    }
}
</script>

<style scoped lang="scss">

 .container {
    width: 1075px;
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
    background-color: #2c742f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
}
button:hover {
  background-color: #2c742f;

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
  width: 50%;
    padding: 10px;
    margin-bottom: 10px;
    margin-right: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.container .change-password {
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 8px;
  padding-left : 20px;
  margin-top: 20px;
}

input[type="password"] {
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>