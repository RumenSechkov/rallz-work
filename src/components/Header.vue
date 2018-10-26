<template>
  <div>
    <header>
      <h1>{{text}}</h1>
    </header>
  </div>
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
  @import '../main.scss';
  h1 {
    margin: 6rem auto 4rem auto;
    font-family: $font-axis-extra-bold;
    font-weight: 900;
    text-transform: uppercase;
  }
</style>
