<template>
  <div class="list-contacts">
    <Header text="Contacts List"/>
    <!--
    The array of contacts can be passed directly into the table without the use of props.
    The current solution offers better re-usability of the component for one level string
    objects by passing as props different arrays of items with correctly assigned object
    keys, edit view and store paths, "no items" message.
    -->
    <Table noItemsMsg="No Contacts"
           :items="$store.state.addressBook.contacts"
           :filters="['firstName', 'lastName', 'eMail']"
           :paths="{view: 'EditContact', store: 'addressBook.contacts'}"/>
    <button @click="create()">create</button>
    <Footer text="Footer"/>
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
