<template>
  <div id="background-blur" v-if="popupCalled">
    <div id="popup-container">
      <div id="confirmation-popup">
        <div id="title-img">X IMAGE</div>
        <p id="title">{{title}}</p>
        <p id="message">{{message}}</p>
        <button id="cancel-btn" @click="$emit('popup-cancel')">{{cancelBtn}}</button>
        <button id="confirm-btn" @click="$emit('popup-confirm', payload)">{{confirmBtn}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationPopup',
  props: {
    title: String,
    message: String,
    confirmBtn: String,
    cancelBtn: String,
  },
  data() {
    return {
      popupCalled: false,
      payload: null,
    };
  },
  mounted() {
    this.$parent.$on('popup-show', (payload) => {
      this.popupCalled = true;
      if (payload) this.payload = payload;
    });
    this.$on(['popup-confirm', 'popup-cancel'], () => {
      this.popupCalled = false;
      this.payload = null;
    });
  },
};
</script>

<style scoped lang="scss">
  @import '../main.scss';
  #background-blur {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: $background-color-black-blur;
    #popup-container {
      margin-right: $side-bar-size;
      #confirmation-popup {
        height: 14rem;
        width: 14rem;
        margin: 10rem auto;
        padding: 0.5rem;
        border-radius: 4px;
        background-color: $color-white;
        #title-img {
          position: relative;
          top: -1rem;
        }
        #title {
        }
        #message {
        }
        button {
          height: 2.2rem;
          padding: 0 1rem;
          border: 0;
          font-size: 0.8rem;
          font-family: $font-axis-extra-bold;
          font-weight: 900;
          text-transform: uppercase;
          &#cancel-btn {
            width: 8rem;
            color: $color-white;
            background-color: $color-grey;
          }
          &#confirm-btn {
            width: 5rem;
            background-color: $color-green;
          }
        }
      }
    }
  }
</style>
