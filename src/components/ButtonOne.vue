<!--
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-13 11:16:17
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-13 13:31:17
-->
<template>
  <div>
    <h2>本地全局注册引用示例</h2>
    <div class="btn_container">
      <CyaButton @click="handler1">按钮1</CyaButton>
      <CyaButton @click="handler1" type="primary">按钮1</CyaButton>
      <CyaButton @click="handler1" type="danger">按钮1</CyaButton>
      <CyaButton @click="handler1" :disabled="true">按钮1</CyaButton>
      <CyaButton @click="handler1" :loading="true">按钮1</CyaButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handler1() {
      console.log('hello world 按钮1')
    },
  },
}
</script>

<style scoped>
.btn_container {
  display: flex;
  justify-content: center;
}
</style>
