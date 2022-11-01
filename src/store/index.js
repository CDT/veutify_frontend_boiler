import Vue from 'vue'
import Vuex from 'vuex'
import { sidebarItems, filterSidebar } from '@/components/Sidebar/sidebarItems'
import { routes } from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    sidebar: []
  },
  getters: {
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    removeUser (state) {
      state.user = null
    },
    setToken (state, token) {
      localStorage.setItem('token', token)
    },
    clearToken () {
      localStorage.removeItem('token')
    },
    updateSidebar (state) {
      console.log('updateSidebar')
      let userRoles = state.user?.roles || []
      let sidebar = JSON.parse(JSON.stringify(sidebarItems)) // 复制一下原菜单数组
      filterSidebar(sidebar, userRoles, routes)
      state.sidebar = sidebar
    }
  },
  actions: {
    logout (context) {
      context.commit('clearToken')
      context.commit('removeUser')
    }
  },
  modules: {
  }
})
