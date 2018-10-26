<template>
  <div>
    <ConfirmationPopup
      title="are you sure?"
      message="do you really want to delete this contact?"
      confirm-btn="yes"
      cancel-btn="cancel"
      @popup-confirm="writeContact"/>
    <form @submit="writeContact('save')">
      <div class="section left">
        <label for="firstName">first name</label>
        <input id="firstName"
               v-model="firstName"
               placeholder="Enter your name"
               :class="{invalid: !validateField('first-name') && firstNameIsVisited}"
               @click="(firstNameIsVisited = true)"/>
        <span v-if="!validateField('first-name') && firstNameIsVisited">
        please enter your first name using only letters.</span>
      </div>
      <div class="section right">
        <label for="lastName">last name</label>
        <input id="lastName"
               v-model="lastName"
               placeholder="Enter your name"
               :class="{invalid: !validateField('last-name') && lastNameIsVisited}"
               @click="(lastNameIsVisited = true)"/>
        <span v-if="!validateField('last-name') && lastNameIsVisited">
        please enter your last name using only letters.</span>
      </div>
      <div class="section left">
        <label for="eMail">e-mail</label>
        <input id="eMail"
               v-model="eMail"
               placeholder="Enter your e-mail"
               :class="{invalid: !validateField('email') && eMailIsVisited}"
               @click="(eMailIsVisited = true)"/>
        <span v-if="!validateField('email') && eMailIsVisited">
        please enter a valid e-mail address.</span>
      </div>
      <div class="section right">
        <label for="country">country</label>
        <select id="country"
                v-model="country"
                :class="{invalid: !validateField('country') && countryIsVisited}"
                @blur="(countryIsVisited = true)">
          <option value="">Select Country</option>
          <option v-for="(country, key) in countries.getCodeList()"
                  :key="key"
                  :value="country">{{country}}
          </option>
        </select>
        <span v-if="!validateField('country') && countryIsVisited">
        please select a country.</span>
      </div>
      <div id="btn-section">
        <button id="reset-btn" type="reset">reset</button>
        <button id="delete-btn"
                type="button"
                v-if="activeItem"
                @click="$emit('popup-show', 'delete')">Delete</button>
        <button id="cancel-btn"
                type="button"
                @click="writeContact('cancel')">cancel</button>
        <button id="save-btn"
                type="submit"
                :disabled="!validateField()">{{activeItem ? 'save' : 'create'}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { validateName, validateEMail } from '../js/validations';
import ConfirmationPopup from './ConfirmationPopup.vue';

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
  components: {
    ConfirmationPopup,
  },
  props: {
    paths: Object,
  },
  data() {
    return {
      countries: this.$store.state.addressBook.countryList,
      activeItem: this.$store.state.activeItem instanceof Contact ? this.$store.state.activeItem :
        null,
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

<style scoped lang="scss">
  @import '../main.scss';
  @media only screen and (max-width: 570px) {
    form {
      label, input, select, span {
        float: left;
      }
      div.section.left, div.section.right, div#btn-section {
        display: block;
        margin-left: auto;
        margin-right: auto;
        float: none;
      }
    }
  }
  form {
    max-width: 40rem;
    margin: 3rem auto;
    .section {
      display: inline-block;
      height: 5rem;
      width: 45%;
      margin: 1rem 0.3rem;
      padding: 0.2rem 1%;
      &.left {
        float: left;
      }
      &.right {
        float: right;
      }
      label, input, select, span {
        display: block;
        width: 95%;
        float: inherit;
        text-align: left;
      }
      label {
        max-width: calc(16rem + 1px);
        margin: 0 auto 0.8rem auto;
        padding-right: 0.8rem;
        font-family: $font-axis-extra-bold;
        font-size: 0.9rem;
        font-weight: 900;
        text-transform: uppercase;
      }
      input {
        max-width: 16rem;
        padding: 0 0.4rem;
        line-height: 1.8rem;
        border: 1px solid $color-grey-blur;
        border-radius: 5px;
        &:focus {
          outline: none;
        }
      }
      select {
        height: 1.89rem;
        width: calc(95% + 0.8rem + 1px);
        max-width: calc(16.8rem + 1px);
        padding: 0 0.4rem;
        border: 1px solid $color-grey-blur;
        border-radius: 5px;
        &:focus {
          outline: none;
        }
      }
      span {
        max-width: calc(16rem + 1px);
        margin-top: 0.2rem;
        padding-right: 0.8rem;
        font-family: $font-axis-extra-bold;
        font-size: 0.7rem;
        color: $color-red;
        &::first-letter {
          text-transform: capitalize;
        }
      }
    }
    #btn-section {
      margin: 0 0.3rem;
      padding: 0.2rem 1%;
      float: right;
      & button {
        height: 2.2rem;
        margin: 1.8rem 0 0 1.4rem;
        padding: 0 1rem;
        border: 0;
        font-family: $font-axis-extra-bold;
        font-size: 0.8rem;
        font-weight: 900;
        text-transform: uppercase;
        color: $color-white;
        background-color: $color-blue;
        &#save-btn {
          color: $color-black;
          background-color: $color-yellow;
        }
      }
    }
  }
</style>
