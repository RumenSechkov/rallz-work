<template>
  <div>
    <ConfirmationPopup
      title="are you sure?"
      message="do you really want to delete this contact?"
      confirm-btn="yes"
      cancel-btn="cancel"
      @popup-confirm="deleteItem"/>
    <div id="search-container">
      <img id="search-icon" src="../assets/img/search-icon.png"/>
      <input id="search" v-model="searchValue"/>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="key in Object.keys(items.length ? items[0] : {})"
              :key="key"
              :class="{
                'active': sortParams.column === key,
                'asc': sortParams.isAsc,
                'desc': !sortParams.isAsc}"
              @click="() => {
            sortParams.column = key;
            sortParams.isAsc = !sortParams.isAsc}">
            {{titleFromKey(key)}}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr id="no-contacts-results" v-if="!searchItems(items, filters).length">
          {{searchValue ? noSearchResult : noItemsMsg}}
        </tr>
        <tr v-for="(item, index) in searchItems(items, filters)" :key="index">
          <td v-for="key in item" :key="key">{{key}}</td>
          <td @click="editItem(item)"><img src="../assets/img/edit-contact.svg"/></td>
          <td @click="$emit('popup-show', item)"><img src="../assets/img/delete-contact.svg"/></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import ConfirmationPopup from './ConfirmationPopup.vue';

  export default {
    name: 'Table',
    components: {ConfirmationPopup},
    props: {
      noItemsMsg: String,
      noSearchResult: String,
      items: Array,
      filters: Array,
      paths: Object,
    },
    data() {
      return {
        searchValue: '',
        sortParams: {
          column: '',
          isAsc: true,
        },
      };
    },
    methods: {
      titleFromKey(key) {
        // Regex expression splits camelCase strings into separate word strings with
        // exception of strings like "amIEvil" which will be split into "am IEvil" so
        // in that way more common cases like "itemID" will be split correctly.
        return key.replace(/([a-z])([A-Z])/g, '$1 $2');
      },
      editItem(item) {
        this.$store.commit('write', {
          path: 'activeItem',
          value: item,
        });
        this.$router.push({name: this.paths.view});
      },
      deleteItem(item) {
        this.$store.commit('write', {
          path: this.paths.store,
          value: item,
          action: 'delete',
        });
        this.$store.commit('write', {
          path: 'activeItem',
          value: null,
        });
      },
      sortItems(items) {
        if (this.sortParams.column) {
          return items.sort((itemA, itemB) => {
            if (itemA[this.sortParams.column] < itemB[this.sortParams.column]) {
              return this.sortParams.isAsc;
            }
            if (itemA[this.sortParams.column] > itemB[this.sortParams.column]) {
              return !this.sortParams.isAsc;
            }
            return 0;
          });
        }
        return items;
      },
      searchItems(items, filters) {
        if (this.searchValue) {
          return this.sortItems(items
            .filter(item => !filters.every(filter => !item[filter].toLowerCase()
              .includes(this.searchValue.toLowerCase()))));
        }
        return this.sortItems(items.filter(() => true));
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../main.scss';

  #search-container {
    width: 45rem;
    margin: auto;
    text-align: end;
    input {
      width: 14rem;
      margin: 0 0 0.4rem 0;
      padding: 0 1.5rem;
      line-height: 1.8rem;
      font-size: 1.4rem;
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 2px solid $color-black;
      &:focus {
        outline: none;
      }
    }
    img#search-icon {
      position: relative;
      left: 1.2rem;
      height: 1.1rem;
    }
  }

  table {
    width: 45rem;
    margin: 2rem auto 3rem auto;
    border: none;
    border-spacing: 0;
    font-size: 0.8rem;
    thead {
      tr {
        height: 2.4rem;
        font-family: $font-axis-extra-bold;
        font-size: 1rem;
        font-weight: 900;
        text-transform: uppercase;
        color: $color-white;
        background-color: $color-black;
        th {
          padding: 0 1rem;
        }
      }
    }
    tbody {
      tr {
        height: 2rem;
        td {
          padding-left: 1.4rem;
          text-align: left;
        }
        &#no-contacts-results {
          background-color: $color-yellow;
        }
      }
    }
    img {
      height: 0.9rem;
      margin: 0.2rem;
    }
  }
</style>
