<template>
  <v-dialog v-model="dialog" persistent max-width="30%">
     <v-card>
       <v-card-title class="text-h5">
         {{ title }} <v-icon large color="green darken-2"> mdi-emoticon-cool</v-icon>
       </v-card-title>
       <v-card-text>{{ msg }}</v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <!-- <v-btn v-if="disagreeBtnMsg" color="green darken-1" text @click="dialog = false">
           {{ disagreeBtnMsg }}
         </v-btn> -->
         <v-btn color="green darken-1" text @click="dialog = false">
           {{ agreeBtnText }}
         </v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
</template>

<script>
 export default {
   data () {
     return {
       dialog: false,
       title: 'Hello',
       msg: 'How are you',
       disagreeBtnMsg: 'No',
       agreeBtnText: 'OK'
     }
   },
   methods: {
     show (title, msg, agreeBtnText) {
       this.title = title
       this.msg = msg
       this.agreeBtnText = agreeBtnText
       this.dialog = true
     }
   }
 }
</script>