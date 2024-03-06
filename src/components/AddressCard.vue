<template>
  <el-card class="address-card" :class="{ 'is-selected': isSelected }" @click="selectCard">
    <div class="content">
      <h4>{{ address.house_number_and_street }}</h4>
      <p v-if="address.area">{{ address.area }}</p>
      <p>{{ address.town }}, {{ address.county }}</p>
      <p>{{ address.postcode }}, {{ address.country }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'AddressCard',
  props: {
    address: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectCard() {
    this.$emit('selected', this.address.id); // 确保事件名称匹配
  },
  },
};
</script>

<style scoped>
.address-card:hover {
  transform: scale(1.05);
}
.is-selected {
  border-color: #409EFF;
  box-shadow: 0 0 8px 0 rgba(64, 158, 255, 0.5);
  animation: selected-animation 1s ease-out infinite; /* 使用定义的动画 */
}
.address-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  border: 2px solid transparent; /* 确保卡片有一个默认的边框，避免布局因为边框变化而跳动 */
}

.address-card:hover {
  transform: scale(1.05);
}

@keyframes selected-animation {
  0% {
    border-color: transparent;
  }
  50% {
    border-color: #409EFF;
  }
  100% {
    border-color: transparent;
  }
}

</style>
