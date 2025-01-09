<!--
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-11 13:26:56
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-13 11:23:05
-->
<template>
  <div>
    <h2>本地按需引用示例--全局注册引用</h2>
    <CyaButton @click="handler">按钮3</CyaButton>
  </div>
</template>
<script>
export default {
  methods: {
    handler() {
      console.log('hello world 我是按钮3')
    },
  },
}
</script>

<style></style>
