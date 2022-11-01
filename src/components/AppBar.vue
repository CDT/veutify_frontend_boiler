<template>
<v-app-bar app color="primary" dark>
  
  <v-app-bar-nav-icon @click="showSidebar"></v-app-bar-nav-icon>

  <div class="d-flex align-center">
    <router-link to="/">
      <v-icon>mdi-wrench</v-icon> <span class="white--text">小帮手</span>
    </router-link>

  </div>

  <v-spacer></v-spacer>

  <v-btn text @click="$router.push('/profile')"><v-icon>mdi-account</v-icon> 个人</v-btn>

  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item @click="logout">
        <v-list-item-title><v-icon>mdi-logout</v-icon> 退出</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

</v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
      console.log('dispatched')
      this.$router.push('/login')
    },
    showSidebar () {
      this.$root.$emit('toggleSidebar')
    }
  }
}
</script>