<template>
  <v-card class="mt-4 mx-auto text-center hidden-sm-only" min-width="320">
    <!-- 上部分：标题和LOGO-->
    <v-card-text class="py-0">
      <!-- 标题和LOGO卡片：向上偏移32px -->
      <v-card class="v-card--offset mx-auto" color="primary" elevation="4" dark>
        <!-- 标题 -->
        <v-card-text class="headline white--text">小帮手登录</v-card-text>
        <!-- LOGO -->
        <v-card-text><v-icon size="96">mdi-login</v-icon></v-card-text>
      </v-card>

    </v-card-text>

    <!-- 中间：错误提示 -->
    <v-alert type="warning" dense class="my-0 mx-4" v-show="this.error">{{ this.error }}</v-alert>

    <!-- 下部分：登录表单 -->
    <v-form ref="form" @submit.prevent="login">
      <v-card-text>
        <v-text-field label="输入工号" name="username" v-model="username" :rules="[usernameRules.required, usernameRules.minLength]" type="text"></v-text-field>
        <v-text-field label="密码" name="password" v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[passwordRules.required, passwordRules.minLength]" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword"></v-text-field>
        <div class="caption grey--text text--darken-1 text-left">*与中央认证相同</div>
      </v-card-text>
      <v-card-actions>
        <v-row align="center" no-gutters>
          <v-col class="text-center">
            <div class="my-2">
              <v-btn color="primary" block type="submit">登录</v-btn>
            </div>
            <div>
              <v-btn color="primary" x-small text>忘记密码？</v-btn>
            </div>
            <div>
              <v-btn color="primary" x-small text>注册</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>

  </v-card>
</template>
  
<script>
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    showPassword: false,
    username: '',
    password: '',
    error: '',
    usernameRules: {
      required: (value) => !!value || "必填",
      minLength: (value) => (value && value.length >= 2) || "至少2位"
    },
    passwordRules: {
      required: (value) => !!value || "必填",
      minLength: (value) => (value && value.length >= 1) || "至少1位"
    }
  }),
  methods: {
    ...mapMutations(['setUser', 'setToken']),    
    login: function () {
      this.error = ""
      if (!this.$refs.form.validate())  return
      
      this.$axios.post ('/login', { username: this.username, password: this.password })
        .then (resp => {
          let token = resp.data.data?.token
          if (!token) {
            this.error = '响应无token'
          } else {
            this.setToken(token)
            this.$router.push('/')
          }
        })
        .catch (e => {
          console.error(e)
          this.error = e.response?.data?.message || e.message
        })
      
    }
  }
}
</script>

<style>
.v-card--offset {
  top: -32px;
  position: relative;
}
</style>
  