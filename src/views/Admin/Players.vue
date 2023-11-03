<template lang="pug">
div(v-if="app.players")
  v-data-table(
    :items="app.players"
    :headers="headers"
    @click:row="select"
    :loading="loading"
  )
  v-btn(color="primary" @click="create") Add Player
  v-dialog(
    v-model="dialog"
    fullscreen
  )
    v-card(:loading="loading")
      v-card-text
        .d-flex.align-center.justify-space-between.mb-4
          .text-h4 {{app.player._id ? 'Edit' : 'Add'}} Player
          v-btn(
            size="x-large"
            flat
            @click="dialog = false"
          )
            v-icon(size="x-large") mdi-close
        v-row.mb-2
          v-col(cols=12)
            v-text-field(
              v-model="app.player.short"
              label="Short"
              variant="outlined"
              hide-details
            )
          v-col(cols=12)
            v-text-field(
              v-model="app.player.discord"
              label="Discord"
              variant="outlined"
              hide-details
            )
          v-col(cols=12)
            v-text-field(
              v-model="app.player.discord_id"
              label="Discord ID"
              variant="outlined"
              hide-details
            )
          v-col(cols=12)
            v-text-field(
              v-model="app.player.twitch"
              label="Twitch"
              variant="outlined"
              hide-details
            )
          v-col(cols=12)
            v-text-field(
              v-model="app.player.youtube"
              label="Youtube"
              variant="outlined"
              hide-details
            )
        v-btn(color="primary" @click="update") Update
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAdminStore } from '@/store/admin'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

const admin = useAdminStore()
const app = useAppStore()
const util = useUtilStore()

const loading = ref(false)
const dialog = ref(false)
const headers = [
  { title: 'Short', key: 'short' },
  { title: 'Discord', key: 'discord' },
  { title: 'Twitch', key: 'twitch' },
  { title: 'Youtube', key: 'youtube' }
]
async function select(_, item) {
  dialog.value = true
  loading.value = true
  await app.loadPlayer(item.item.raw.short)
  loading.value = false
}
function create() {
  dialog.value = true
  app.player = {}
}
async function update() {
  loading.value = true
  await admin.upsertPlayer(app.player)
  dialog.value = false
  await app.loadPlayers(true)
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  await app.loadPlayers()
  loading.value = false
})
</script>