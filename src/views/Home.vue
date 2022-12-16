<template>
  <div class="d-flex">
    <v-card class="mx-5" min-width="344" v-for="card in cards" :key="card.name">
      <v-card-text>
        <p class="text-h4 text--primary">{{ card.name }}</p>
        <p>{{ card.desc }}</p>
      </v-card-text>
      <v-card-actions class="row-reverse">
        <v-btn text color="blue" right @click="card.demo">查看</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rowcount: 4,
      cards: [
        {
          name: '确认框',
          desc: '确认框',
          demo: this.confirm
        }
      ]
    }
  },
  methods: {
    confirm () {
      this.$confirm()
    }
  }
}
</script>
