<template>
<div>
  <ComparisonObject/>
</div>
</template>

<script>
import ComparisonObject from './components/ComparisonObject.vue';
export default {
  name: 'App',
  components: {
    ComparisonObject
  }
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
