<template>
  <el-dialog :visible.sync="visible" title="Edit Address" @close="resetForm">
    <div class="form-container">
  <el-form ref="addAddressForm" :model="newAddress" label-position="top">
    <el-form-item label="Street Line">
      <el-input v-model="newAddress.house_number_and_street"></el-input>
    </el-form-item>

    <el-row :gutter="20">
       <el-col :span="10">
        <el-form-item label="Area">
          <el-input v-model="newAddress.area"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item label="Town">
          <el-input v-model="newAddress.town"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="10">
        <el-form-item label="County">
          <el-input v-model="newAddress.county"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item label="Postcode">
          <el-input v-model="newAddress.postcode"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="Country">
      <el-input v-model="newAddress.country" readonly value="United Kingdom"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="deleteAddress">Delete</el-button>
      <el-button type="primary" @click="updateAddress">Update</el-button>
    </el-form-item>
  </el-form>
    </div>
</el-dialog>

</template>

<script>
import axios from "axios";
import { Message } from 'element-ui';

export default {
  name: 'UDAddressModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    selectedAddress: {
      type: Number,
      default: '',
    },
  },
  data() {
    return {
      newAddress: {
        house_number_and_street: '',
        area: '',
        town: '',
        county: '',
        postcode: '',
        country: 'United Kingdom',
      },
      userId: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
    };
  },
  watch: {
    selectedAddress(newVal) {
      if (newVal) {
        this.fetchAddressDetails(newVal);
      }
    }
  },
  methods: {
    async fetchAddressDetails(addressId) {
      try {
        const response = await axios.get(`http://34.147.186.30:8000/api/users/${this.userId}/addresses/${addressId}`, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        });
        this.newAddress = response.data;
      } catch (error) {
        console.error('There was an error fetching the address details:', error);
      }
    },
    resetForm() {
    },
    async updateAddress() {
      const userId = localStorage.getItem('id');
      const addressId = this.selectedAddress;
      try {
        const response = await axios.put(`http://34.147.186.30:8000/api/users/${userId}/addresses/${addressId}/`, this.newAddress, {
          headers: {
            Authorization: `Token ${this.token}`,
            'Content-Type': 'application/json',
          },
        });
        // 显示成功消息
        Message({
          message: 'Address updated successfully',
          type: 'success',
          duration: 5000,
        });
        this.$emit('update:visible', false);

        this.$emit('refreshAddresses');
      } catch (error) {
        console.error('Error updating the address:', error);
        // 显示错误消息
        Message({
          message: 'Failed to update address',
          type: 'error',
          duration: 5000,
        });
      }
    },

    async deleteAddress() {
      const userId = localStorage.getItem('id');
      const addressId = this.selectedAddress;
      try {
        const response = await axios.delete(`http://34.147.186.30:8000/api/users/${userId}/addresses/${addressId}/`, {
          headers: {
            Authorization: `Token ${this.token}`,
            'Content-Type': 'application/json',
          },
        });

        Message({
          message: 'Address updated successfully',
          type: 'success',
          duration: 5000,
        });
        this.$emit('update:visible', false);
        this.$emit('refreshAddresses');
      } catch (error) {
        console.error('Error updating the address:', error);
          Message({
          message: 'Failed to update address',
          type: 'error',
          duration: 5000,
        });
      }
    },
  },
  mounted() {
    if (this.selectedAddress) {
      this.fetchAddressDetails(this.selectedAddress);
    }
  },
};
</script>

<style scoped>
.form-container {
  width: 90%;
  margin: 0 auto;
}
</style>