<!--
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-13 09:42:42
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-13 14:16:10
-->
<template>
  <button
    class="btn_cya"
    :class="[type, { disabled, loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="btn_spinner"></span>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CyaButton',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      console.log('按钮点击事件')
      this.$emit('click')
    },
  },
}
</script>

<style scoped>
.btn_cya {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s;
}
.btn_cya.default {
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
}
.btn_cya.primary {
  background-color: skyblue;
  color: gray;
  border: 1px solid skyblue;
}
.btn_cya.danger {
  background-color: red;
  color: white;
  border: 1px solid red;
}
.btn_cya.disabled {
  cursor: not-allowed;
  background-color: #f5f5f5;
  color: #ccc;
}
.btn_cya.loading {
  position: relative;
  display: flex;
  align-items: center;
}
.btn_spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid gray;
  border-radius: 50%;
  border-top-color: pink;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
