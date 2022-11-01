<template>
  <v-navigation-drawer v-model="show" fixed app>
    <v-list>
      <template v-for="(item, i) in items">
        <!-- 没有items子列表，则为末级菜单 -->
        <v-list-item v-if="!item.items" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
  
        <!-- 否则则为可展开菜单 -->
        <v-list-group v-else no-action>
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
  
          <v-list-item v-for="(subItem, i) in item.items" :key="i"  :to="subItem.to" router exact>        
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
  </template>

<script>
export default {
  data () {
    return {
      show: false,
      items: this.$store.state.sidebar
    }
  },
  methods: {
  },
  mounted () {
    this.$root.$on('toggleSidebar', () => {
      this.show = !this.show 
    })
  },
  beforeDestroy () {
    this.$root.$off('toggleSidebar')
  }
}


</script>