<template>
  <div>
    <Header text="contacts list"/>
    <button @click="create()">add new</button>
    <!--
    The array of contacts can be passed directly into the table without the use of props.
    The current solution offers better re-usability of the component for one level string
    objects by passing as props different arrays of items with correctly assigned object
    keys, edit view and store paths, "no items" message.
    -->
    <Table no-items-msg="no contacts to show"
           no-search-result="your search did not find any matches"
           :items="$store.state.addressBook.contacts"
           :filters="['firstName', 'lastName', 'eMail']"
           :paths="{view: 'EditContact', store: 'addressBook.contacts'}"/>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Table from '../components/Table.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'ListContacts',
  components: {
    Footer,
    Header,
    Table,
  },
  methods: {
    create() {
      this.$router.push({ name: 'EditContact' });
    },
  },
};
</script>

<style scoped lang="scss">
  @import '../main.scss';
  button {
    height: 2.2rem;
    padding: 0 1rem;
    border: 0;
    float: left;
    font-size: 0.8rem;
    font-family: $font-axis-extra-bold;
    font-weight: 900;
    text-transform: uppercase;
    background-color: $color-yellow;
  }
</style>
