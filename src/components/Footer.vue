<template>
  <div>
    <footer>
      <img src="../assets/img/gig-logo.svg"/>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped lang="scss">
  @media only screen and (max-width: 570px) {
    footer {
      display: none;
    }
  }
  footer {
    max-width: 40rem;
    margin: 3rem auto;
    img {
      position: fixed;
      left: 3rem;
      bottom: 3rem;
      height: 2rem;
    }
  }
</style>
