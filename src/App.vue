<template>
  <div id="app">
    <router-view/>
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
