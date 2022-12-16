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

    <toast ref="toast" />
    <confirm ref="confirm" />

  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar'
import Sidebar from '@/components/Sidebar/index'
import Toast from '@/components/Toast'
import Confirm from '@/components/Confirm'
import Vue from 'vue'

export default {
  name: 'App',
  components: { AppBar, Sidebar, Toast, Confirm },
  data () {
    return {}
  },
  mounted () {
    Vue.prototype.$toast = this.$refs.toast.show
    Vue.prototype.$confirm = this.$refs.confirm.show
  }
};
</script>
