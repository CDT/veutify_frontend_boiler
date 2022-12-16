import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'
import appAxios from '@/plugins/axios'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      roles: ['normal']
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackCHunkName: "profile" */ '../views/Profile.vue'),
    meta: {
      roles: ['normal']
    }
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import(/* webpackChunkName: "about" */ '../views/Error.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 权限验证
// 基于meta中的roles和guest：
// roles表示需要登录，且用户角色必须为其中之一
// guest表示无需登录，但是已登录用户访问则直接跳转主页
// 两者不可并存
router.beforeEach (async (to, from, next) => {
  console.log(`auth check to: ${to.name}`)
  let { user } = store.getters
  let token = localStorage.getItem('token')
  let { guest, roles } = to.meta

  // 没token的情况
  if (!token) {
    // 没roles，直接进
    if (!roles || !roles.length) { return next() }
    // 有roles跳login
    return next({ name: 'Login' })
  }

  // 有token，但是没user，需要取一下user，并且刷一下左侧导航菜单
  if (!user) {
    try {
      user = (await appAxios.get('/me')).data?.data
      store.commit('setUser', user)
      store.commit('updateSidebar')
    } catch (e) { 
      // token有问题，清掉，回login界面
      console.error(e)
      store.commit('clearToken')
      return next({ name: 'Login' }) 
    }
  }

  // 有roles，比对一下route的roles是否和user的roles有共同角色，没有则无权访问
  if (roles && roles.length > 0 && 
      user.roles && roles.filter(role => user.roles.includes(role)).length == 0) {
      return next({ name: 'Error' })
  }
  
  // 检查guest，guest为true表示给未登录访客的界面，登陆状态则跳回主页面
  if (guest && user) {
    return next( { name: 'Home' })
  }
  
  next()
})

export default router