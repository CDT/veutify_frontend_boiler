<template>
  <login-form />
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  components: {
    LoginForm
  },
  mounted () {
    document.getElementById('app').classList.toggle('show-cat')
  },
  beforeDestroy () {
    console.log('before destroy')    
    document.getElementById('app').classList.remove('show-cat')
  }
}
</script>
