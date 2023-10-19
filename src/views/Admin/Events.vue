<template lang="pug">
div(v-if="app.archive")
  .d-flex.pt-1
    v-text-field.mr-4(
      v-model="search"
      label="Search"
      variant="outlined"
      clearable
    )
    v-select(
      v-model="year"
      :items="yearOptions"
      label="Year"
      variant="outlined"
      style="max-width:100px"
      @update:modelValue="app.loadArchive(year)"
    )
  v-data-table(
    :items="app.archive"
    :search="search"
    :headers="headers"
    @click:row="select"
    :loading="loading"
    :sort-by="sort"
  )
    template(v-slot:item.start.dateTime="{ item }")
      | {{util.format(item.raw.start.dateTime, 'MMM D, YYYY')}}
  v-dialog(
    v-model="dialog"
    fullscreen
  )
    v-card(:loading="loading")
      v-card-text(v-if="app.event")
        .d-flex.align-center.justify-space-between.mb-4
          .text-h4 {{util.format(app.event.start.dateTime)}}
          v-btn(
            size="x-large"
            flat
            @click="dialog = false"
          )
            v-icon(size="x-large") mdi-close
        v-row.mb-2
          v-col(cols=12)
            .text-h4.mb-2 {{app.event.summary}}
            .markdown(v-html="app.event.description")
            v-divider.mt-4
          v-col(cols=12 sm=6)
            v-textarea(
              v-model="app.event.metadata.instructions"
              label="Instructions (markdown)"
              variant="outlined"
              hide-details
              no-resize
              rows=10
            )
          v-col(cols=6).d-none.d-sm-block
            v-card.pa-4.md-preview.markdown(
              height="305px"
              variant="flat"
              v-html="util.markdown(app.event.metadata.instructions)"
            )
          v-col(cols=12 lg=6)
            v-autocomplete(
              v-model="app.event.metadata.guides"
              label="Associated Guides"
              variant="outlined"
              hide-details
              :items="app.guides"
              item-title="slug"
              item-value="_id"
              multiple
            )
          v-col(cols=12 sm=9 lg=4)
            v-autocomplete(
              v-model="app.event.metadata.participants"
              label="Participants"
              variant="outlined"
              hide-details
              :items="app.players"
              item-title="short"
              item-value="_id"
              multiple
            )
          v-col(cols=12 sm=3 lg=2)
            v-autocomplete(
              v-model="app.event.metadata.winners"
              label="Winners"
              variant="outlined"
              hide-details
              :items="app.players.filter(it => app.event.metadata.participants && app.event.metadata.participants.includes(it._id))"
              item-title="short"
              item-value="_id"
              multiple
            )
          v-col(cols=12 sm=6 lg=3)
            v-text-field(
              v-model="app.event.metadata.bingo"
              label="Bingo"
              variant="outlined"
              hide-details
            )
          v-col(cols=12 sm=6 lg=3)
            v-text-field(
              v-model="app.event.metadata.racetime"
              label="Racetime"
              variant="outlined"
              hide-details
            )
          v-col(cols=12 sm=6 lg=3)
            v-text-field(
              v-model="app.event.metadata.twitch"
              label="Twitch"
              variant="outlined"
              hide-details
            )
          v-col(cols=12 sm=6 lg=3)
            v-text-field(
              v-model="app.event.metadata.youtube"
              label="Youtube"
              variant="outlined"
              hide-details
            )
        v-btn.mr-4(color="primary" @click="update") Update
        v-btn(color="primary" variant="outlined" :href="app.event.htmlLink" target="_blank") Go to Calendar Entry
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
const search = ref('')
const year = ref(new Date().getFullYear())
const yearOptions = Array(2 + year.value - 2022).fill()
  .map((it, index) => 2022 + index)
const headers = [
  { title: 'Summary', key: 'summary' },
  { title: 'Date', key: 'start.dateTime' }
]
const sort = [{key:"start.dateTime"}]
async function select(_, item) {
  dialog.value = true
  loading.value = true
  await app.loadEvent(item.item.raw.id, true)
  loading.value = false
}
function create() {
  dialog.value = true
  app.event = {}
}
async function update() {
  loading.value = true
  await admin.upsertEventMetadata(app.event.metadata)
  dialog.value = false
  await app.loadArchive(year.value, true)
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  await app.loadArchive(year.value)
  await app.loadGuides()
  await app.loadPlayers()
  loading.value = false
})
</script>