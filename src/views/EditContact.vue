<template>
  <div>
    <Header :text="$store.state.activeItem ? 'edit contact' : 'create contact'"/>
    <!--
    Providing the paths as props from outside, makes the component "not caring" where it
    will pull from or save to, the data needed other than the active item. This makes it
    easier to reuse it by calling it and configure it without opening its file.
    -->
    <Contact :paths="{view: 'ListContacts', store: 'addressBook.contacts'}"/>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Contact from '../components/Contact.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'EditContact',
  components: {
    Footer,
    Header,
    Contact,
  },
};
</script>
