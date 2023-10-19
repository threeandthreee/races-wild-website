<template lang="pug">
v-app
  v-container.fade-in
    breadcrumbs(:items="[{label:'players'}]" :loading="!app.players")
    div(v-if="app.players")
      .d-flex
        v-data-table(
          :items="app.players"
          :headers="headers"
          :sort-by="sort"
        )
          template(v-slot:item.short="{item}")
            router-link(:to="`/player/${encodeURIComponent(item.raw.short)}`") {{item.raw.short}}
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/store/app'

import Breadcrumbs from '@/components/Breadcrumbs.vue'

const app = useAppStore()

const headers = [
  { title: 'Name', key: 'short' },
  { title: 'Participations', key: 'participationCount' },
  { title: 'Wins', key: 'winCount' }
]
const sort = [
  {key:"participationCount", order:"desc"},
  {key:"short"}
]

onMounted(() => {
  app.loadPlayers()
})
</script>