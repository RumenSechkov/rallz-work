<template>
  <header>
    <h1>{{text}}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss">
  header {
    color: #42b983;
  }
</style>
