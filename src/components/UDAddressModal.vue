<template>
  <el-dialog :visible.sync="visible" title="Edit Address" @close="resetForm">
    <div class="form-container"> <!-- 包裹表单的容器 -->
  <el-form ref="addAddressForm" :model="newAddress" label-position="top">
    <!-- Street Line 占据一整行 -->
    <el-form-item label="Street Line">
      <el-input v-model="newAddress.house_number_and_street"></el-input>
    </el-form-item>

    <el-row :gutter="20"> <!-- 使用 gutter 属性添加列之间的间距 -->
      <!-- 左侧列：Area 和 Town，调整 span 值缩小列宽 -->
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

    <el-row :gutter="20"> <!-- 同样为右侧列添加间距 -->
      <!-- 右侧列：County 和 Postcode，同样调整 span 值以控制宽度 -->
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

    <!-- Country 单独一行，根据需要可以调整布局 -->
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
    // 监听selectedAddress prop的变化
    selectedAddress(newVal) {
      if (newVal) {
        this.fetchAddressDetails(newVal);
      }
    }
  },
  methods: {
    // 根据地址ID从API获取地址详情
    async fetchAddressDetails(addressId) {
      try {
        const response = await axios.get(`http://35.197.196.50:8000/api/users/${this.userId}/addresses/${addressId}`, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        });
        // 填充表单数据
        this.newAddress = response.data;
      } catch (error) {
        console.error('There was an error fetching the address details:', error);
      }
    },
    resetForm() {
      // 重置表单的方法，按需实现
    }, //close
    async updateAddress() {
      const userId = localStorage.getItem('id'); // 或其他方式获取userId
      const addressId = this.selectedAddress; // 从prop获取地址ID
      try {
        const response = await axios.put(`http://35.197.196.50:8000/api/users/${userId}/addresses/${addressId}/`, this.newAddress, {
          headers: {
            Authorization: `Token ${this.token}`, // 确保这里的token是有效的
            'Content-Type': 'application/json',
          },
        });
        // 显示成功消息
        Message({
          message: 'Address updated successfully',
          type: 'success',
          duration: 5000, // 可以根据需要调整显示时间
        });
        this.$emit('update:visible', false); // 关闭模态框
        // 调用方法来刷新页面的部分数据，例如重新获取地址列表
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
      const userId = localStorage.getItem('id'); // 或其他方式获取userId
      const addressId = this.selectedAddress; // 从prop获取地址ID
      try {
        const response = await axios.delete(`http://35.197.196.50:8000/api/users/${userId}/addresses/${addressId}/`, {
          headers: {
            Authorization: `Token ${this.token}`, // 确保这里的token是有效的
            'Content-Type': 'application/json',
          },
        });
        // 显示成功消息
        Message({
          message: 'Address updated successfully',
          type: 'success',
          duration: 5000, // 可以根据需要调整显示时间
        });
        this.$emit('update:visible', false); // 关闭模态框
        // 调用方法来刷新页面的部分数据，例如重新获取地址列表
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
  },

  // 如果你想在模态框第一次显示时就加载数据，可以使用mounted生命周期钩子
  mounted() {
    if (this.selectedAddress) {
      this.fetchAddressDetails(this.selectedAddress);
    }
  },
};
</script>

<style scoped>
.form-container {
  width: 90%; /* 设置容器宽度为 80% */
  margin: 0 auto; /* 居中显示 */
}
</style>