<template>
  <div>
    <table>
      <label for="search">Search</label>
      <input v-model="searchValue" id="search"/>
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
        </tr>
      </thead>
      <tbody>
        <tr v-if="!items.length">{{noItemsMsg}}</tr>
        <tr v-for="(item, index) in searchItems(items, filters)" :key="index">
          <td v-for="key in item" :key="key">{{key}}</td>
          <td @click="editItem(item)">edit</td>
          <td @click="deleteItem(item)">delete</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    noItemsMsg: String,
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
      this.$router.push({ name: this.paths.view });
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

</style>
