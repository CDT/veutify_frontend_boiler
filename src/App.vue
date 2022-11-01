<template>
  <v-app>
    <sidebar v-if="$store.state.user" />

    <app-bar v-if="$store.state.user" />

    <v-main>
      <v-container fluid fill-height>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>

  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'
import Sidebar from '@/components/Sidebar/index'

export default {
  name: 'App',
  components: { AppBar, Sidebar },
  data () { 
    return {}
  },
};
</script>
