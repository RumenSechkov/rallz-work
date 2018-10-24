import Vue from 'vue';
import Router from 'vue-router';
import ListContacts from './views/ListContacts.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/list-contacts',
    },
    {
      path: '/list-contacts',
      name: 'ListContacts',
      component: ListContacts,
    },
    {
      path: '/edit-contact',
      name: 'EditContact',
      component: () => import(/* webpackChunkName: "edit-contact" */ './views/EditContact.vue'),
    },
  ],
});
