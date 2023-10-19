<template lang="pug">
div(v-if="app.guides")
  v-data-table(
    :items="app.guides"
    :headers="headers"
    @click:row="select"
    :loading="loading"
  )
  v-btn(color="primary" @click="create") Create Guide
  v-dialog(
    v-model="dialog"
    fullscreen
  )
    v-card(:loading="loading")
      v-card-text
        .d-flex.align-center.justify-space-between.mb-4
          .text-h4 {{app.guide._id ? 'Edit' : 'Create'}} Guide
          v-btn(
            size="x-large"
            flat
            @click="dialog = false"
          )
            v-icon(size="x-large") mdi-close
        v-row.mb-2
          v-col(cols=12)
            v-text-field(
              v-model="app.guide.slug"
              label="Slug"
              variant="outlined"
              hide-details
              @change="app.guide.slug = app.guide.slug.toLowerCase().replace(' ','-')"
            )
          v-col(cols=12)
            v-text-field(
              v-model="app.guide.title"
              label="Title"
              variant="outlined"
              hide-details
            )
          v-col(cols=12 sm=6)
            v-textarea(
              v-model="app.guide.content"
              label="Content (markdown)"
              variant="outlined"
              hide-details
              no-resize
              rows=10
            )
          v-col(cols=6).d-none.d-sm-block
            v-card.pa-4.md-preview.markdown(
              height="305px"
              variant="flat"
              v-html="util.markdown(app.guide.content)"
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
const search = ref('')
const headers = [
  { title: 'Slug', key: 'slug' },
  { title: 'Title', key: 'title' }
]
async function select(_, item) {
  dialog.value = true
  loading.value = true
  await app.loadGuide(item.item.raw.slug)
  loading.value = false
}
function create() {
  dialog.value = true
  app.guide = {}
}
async function update() {
  loading.value = true
  await admin.upsertGuide(app.guide)
  dialog.value = false
  await app.loadGuides(true)
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  await app.loadGuides()
  loading.value = false
})
</script>