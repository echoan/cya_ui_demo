<!--
 * @Author: Chengya
 * @Description: Description
 * @Date: 2024-12-13 11:18:14
 * @LastEditors: Chengya
 * @LastEditTime: 2024-12-13 11:18:16
-->
<template>
  <div>
    <h2>本地按需引用示例--直接引用</h2>
    <CyaButton @click="handler1">按钮2</CyaButton>
  </div>
</template>

<script>
import CyaButton from '../../packages/CyaButton/CyaButton.vue'
export default {
  components: {
    CyaButton,
  },
  methods: {
    handler1() {
      console.log('hello world 我是按钮2')
    },
  },
}
</script>

<style></style>
