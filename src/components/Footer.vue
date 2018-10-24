<template>
  <footer>
    <span>{{text}}</span>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss">
  footer {
    color: #42b983;
  }
</style>
