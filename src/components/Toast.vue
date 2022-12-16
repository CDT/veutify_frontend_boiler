<template>
  <div class="text-center ma-2">
    <v-snackbar top v-model="snackbar" :color="bgColor[type]" timeout="2000">
      {{ msg }}
      <template v-slot:action="{ attrs }">
        <v-btn :color="closeBtnColor[type]" text v-bind="attrs" @click="snackbar = false">
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </template>
  
  <script>
  export default {
    name: 'toast',
    data: () => ({
      snackbar: false,
      msg: '',
      type: 'normal',    
      bgColor: {
        'normal': undefined,
        'alert': 'red accent-2'
      },
      closeBtnColor: {
        'normal': 'pink',
        'alert': 'white'
      }
    }),
    methods: {
      show (msg, type) {
        this.msg = msg
        this.type = type
        this.snackbar = true
      }
    }
  }
  </script>