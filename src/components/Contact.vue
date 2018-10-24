<template>
  <form @submit="writeContact('save')">
    <label for="firstName">First Name</label>
    <input v-model="firstName"
           id="firstName"
           :class="{invalid: !validateField('first-name') && firstNameIsVisited}"
           @blur="(firstNameIsVisited = true)"/>
    <span v-if="!validateField('first-name') && firstNameIsVisited">not valid</span>

    <label for="lastName">Last Name</label>
    <input v-model="lastName"
           id="lastName"
           :class="{invalid: !validateField('last-name') && lastNameIsVisited}"
           @blur="(lastNameIsVisited = true)"/>
    <span v-if="!validateField('last-name') && lastNameIsVisited">not valid</span>

    <label for="eMail">E-Mail</label>
    <input v-model="eMail"
           id="eMail"
           :class="{invalid: !validateField('email') && eMailIsVisited}"
           @blur="(eMailIsVisited = true)"/>
    <span v-if="!validateField('email') && eMailIsVisited">not valid</span>

    <label for="country">Country</label>
    <select v-model="country"
            id="country"
            :class="{invalid: !validateField('country') && countryIsVisited}"
            @blur="(countryIsVisited = true)">
      <option value="">Select Country</option>
      <option v-for="(country, key) in countries.getCodeList()"
              :key="key"
              :value="country">{{country}}</option>
    </select>
    <span v-if="!validateField('country') && countryIsVisited">not valid</span>

    <button type="submit" :disabled="!validateField()">{{activeItem ? 'Save' : 'Create'}}</button>
    <button type="reset">Reset</button>
    <button type="button" v-if="activeItem" @click="writeContact('delete')">Delete</button>
    <button type="button" @click="writeContact('cancel')">Cancel</button>
  </form>
</template>

<script>
import { validateName, validateEMail } from '../js/validations';

export class Contact {
  firstName = String;
  lastName = String;
  eMail = String;
  country = String;

  constructor(firstName, lastName, eMail, country) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.eMail = eMail;
    this.country = country;
  }
}

export default {
  name: 'Contact',
  props: {
    paths: Object,
  },
  data() {
    return {
      countries: this.$store.state.addressBook.countryList,
      activeItem: this.$store.state.activeItem instanceof Contact ? this.$store.state.activeItem : null,
      firstName: this.$store.state.activeItem instanceof Contact ? this.$store.state.activeItem.firstName : '',
      firstNameIsVisited: false,
      lastName: this.$store.state.activeItem instanceof Contact ? this.$store.state.activeItem.lastName : '',
      lastNameIsVisited: false,
      eMail: this.$store.state.activeItem instanceof Contact ? this.$store.state.activeItem.eMail : '',
      eMailIsVisited: false,
      country: this.$store.state.activeItem instanceof Contact ? this.$store.state.activeItem.country : '',
      countryIsVisited: false,
    };
  },
  methods: {
    validateField(type) {
      switch (type) {
        case 'first-name':
          return validateName(this.firstName);
        case 'last-name':
          return validateName(this.lastName);
        case 'email':
          return validateEMail(this.eMail);
        case 'country':
          return Boolean(this.country);
        default:
          return (
            validateName(this.firstName) &&
              validateName(this.lastName) &&
              validateEMail(this.eMail) &&
              Boolean(this.country)
          );
      }
    },
    writeContact(action) {
      switch (action) {
        case 'save':
          this.$store.commit('write', {
            path: this.paths.store,
            value: new Contact(this.firstName, this.lastName, this.eMail, this.country),
            action: this.activeItem ? 'edit' : 'create',
          });
          if (this.activeItem) this.$store.commit('write', { path: 'activeItem', value: null });
          this.$router.push({ name: this.paths.view });
          break;
        case 'delete':
          this.$store.commit('write', { path: this.paths.store, action: 'delete' });
          this.$store.commit('write', { path: 'activeItem', value: null });
          this.$router.push({ name: this.paths.view });
          break;
        case 'cancel':
          this.$store.commit('write', { path: 'activeItem', value: null });
          this.$router.push({ name: this.paths.view });
          break;
        default:
      }
    },
  },
};
</script>

<style scoped>

</style>
