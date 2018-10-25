<template>
  <div id="main">
    <input :value="show"/>
    <div v-if="showPopup">
      <p>are you sure?</p>
      <p>do you really want to delete this cabra?</p>
      <button @click="confirmation()">yes</button>
      <button>cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationPopup',
  data() {
    return {
      showPopup: true,
      show: '',
    };
  },
  methods: {
    confirmation(func) {
      // func();
      console.log(this.showPopup);
      console.log(this.show);

      if (!func) {
        console.log('func');
        // exec();
        // Needed for ESLint. Can be used for confirmation.
        return 'popup-confirmed';
      }
      // Needed for ESLint. Can be used for confirmation.
      return 'popup-initiated';
    },
  },
};
</script>

<style scoped>

</style>
