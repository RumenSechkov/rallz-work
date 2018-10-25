import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeItem: null,
    showPopup: false,
    addressBook: {
      contacts: [],
      countryList: null,
    },
  },
  mutations: {
    write(state, payload) {
      const path = payload.path.split('.');
      path.forEach((prop, index) => {
        if (path.length !== index + 1) {
          state = state[prop];
        } else {
          switch (payload.action) {
            case ('create'):
              state[prop].push(payload.value);
              localStorage.setItem('gig-address-book-contacts', JSON.stringify(this.state.addressBook.contacts));
              break;
            case ('edit'):
              state[prop].splice(state[prop].indexOf(this.state.activeItem), 1, payload.value);
              localStorage.setItem('gig-address-book-contacts', JSON.stringify(this.state.addressBook.contacts));
              break;
            case ('delete'):
              state[prop].splice(state[prop]
                .indexOf(payload.value ? payload.value : this.state.activeItem), 1);
              localStorage.setItem('gig-address-book-contacts', JSON.stringify(this.state.addressBook.contacts));
              break;
            default:
              state[prop] = payload.value;
              break;
          }
        }
      });
    },
  },
});
