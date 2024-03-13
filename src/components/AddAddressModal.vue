<template>
  <el-dialog :visible.sync="visible" title="Add a new address" @close="resetForm">
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
      <el-button type="primary" @click="addAddress">Add</el-button>
    </el-form-item>
  </el-form>
    </div>
</el-dialog>
</template>

<script>
export default {
  name: 'AddAddressModal',
  props: {
    visible: {
      type: Boolean,
      default: false,
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
    };
  },
  methods: {
    addAddress() {
      this.$emit('add', { ...this.newAddress });
      this.resetForm();
    },
    resetForm() {
      this.newAddress = {
        house_number_and_street: '',
        area: '',
        town: '',
        county: '',
        postcode: '',
      };
      this.$refs.addAddressForm.resetFields();
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 90%;
  margin: 0 auto;
}
</style>