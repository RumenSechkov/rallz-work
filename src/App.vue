<template>
  <div id="app">
    <router-view id="view"/>
    <aside id="side-bar"></aside>
  </div>
</template>

<script>
import CountryList from 'country-list';
import { Contact } from './components/Contact.vue';

export default {
  beforeCreate() {
    const localContacts = localStorage.getItem('gig-address-book-contacts');
    if (localContacts) {
      const localContactsArray = JSON.parse(localContacts);
      const classContacts = [];
      localContactsArray.forEach((contact) => {
        classContacts.push(new Contact(
          contact.firstName,
          contact.lastName,
          contact.eMail,
          contact.country,
        ));
      });
      this.$store.commit('write', {
        path: 'addressBook.contacts',
        value: classContacts,
      });
    }
    const countryList = CountryList();
    this.$store.commit('write', {
      path: 'addressBook.countryList',
      value: countryList,
    });
  },
};
</script>

<style lang="scss">
  @import 'main';
  html {
    font-size: 18px;
  }
  #app {
    font-family: $font-source-sans-pro;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    #view {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: calc(100% - 190px);
      margin-right: $side-bar-size;
    }
    #side-bar {
      z-index: -1;
      position: fixed;
      top: 0;
      right: 0;
      height: 100%;
      width: $side-bar-size;
      background: url('assets/img/side-bar.png');
      background-size: 340px;
    }
  }
</style>
