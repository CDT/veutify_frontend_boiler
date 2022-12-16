import { apiBase, timeout} from '@/config'
import axios from 'axios'
import Vue from 'vue'

const appAxios = axios.create({
  baseURL: apiBase,
  timeout
})

Vue.prototype.$axios = appAxios

// 设置token
appAxios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  } else {
    delete config.headers['Authorization']
  }
  return config
})

export default appAxios