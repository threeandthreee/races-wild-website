<template lang="pug">
div(v-if="app.constants")
  v-data-table(
    :items="app.constants"
    :headers="headers"
    @click:row="select"
    :loading="loading"
  )
  v-btn(color="primary" @click="create") Create Constant
  v-dialog(
    v-model="dialog"
    fullscreen
  )
    v-card(:loading="loading")
      v-card-text
        .d-flex.align-center.justify-space-between.mb-4
          .text-h4 {{app.constant._id ? 'Edit' : 'Create'}} Constant
          v-btn(
            size="x-large"
            flat
            @click="dialog = false"
          )
            v-icon(size="x-large") mdi-close
        v-row.mb-2
          v-col(cols=12)
            v-text-field(
              v-model="app.constant.slug"
              label="Slug"
              variant="outlined"
              hide-details
              @change="app.constant.slug = app.constant.slug.toLowerCase().replace(' ','-')"
            )
          v-col(cols=12)
            v-textarea(
              v-model="app.constant.value"
              label="Value"
              variant="outlined"
              hide-details
            )
        v-btn(color="primary" @click="update") Update
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

const app = useAppStore()
const util = useUtilStore()

const loading = ref(false)
const dialog = ref(false)
const headers = [
  { title: 'Slug', key: 'slug' },
  { title: 'Value', key: 'value' }
]
async function select(_, item) {
  dialog.value = true
  loading.value = true
  await app.loadConstant(item.item.raw.slug)
  loading.value = false
}
function create() {
  dialog.value = true
  app.constant = {}
}
async function update() {
  loading.value = true
  await admin.upsertConstant(app.constant)
  dialog.value = false
  await app.loadConstants(true)
  loading.value = false
}

onMounted(async () => {
  loading.value = true
  await app.loadConstants()
  loading.value = false
})
</script>