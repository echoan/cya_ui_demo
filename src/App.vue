<template>
  <div id="app">
    <ButtonOne></ButtonOne>
    <ButtonTwo></ButtonTwo>
    <ButtonThree></ButtonThree>
  </div>
</template>

<script>
import ButtonOne from './components/ButtonOne.vue'
import ButtonThree from './components/ButtonThree.vue'
import ButtonTwo from './components/ButtonTwo.vue'
export default {
  name: 'App',
  components: {
    ButtonOne,
    ButtonTwo,
    ButtonThree,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
