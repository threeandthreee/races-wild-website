<template lang="pug">
v-app
  v-container.fade-in
    breadcrumbs(:items="crumbs" :loading="!app.guide")
    div(v-if="app.guide")
      div(v-if="!app.guide.slug")
        .text-body1 No guide found.
      .markdown(v-else v-html="util.markdown(app.guide.content)")
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

import Breadcrumbs from '@/components/Breadcrumbs.vue'

const route = useRoute()
const app = useAppStore()
const util = useUtilStore()

const crumbs = computed(() => {
  let label = ''
  if(app.guide)
    if(app.guide.slug)
      label = app.guide.title
    else
      label = '404'
  return [
    { url: '/guides', label: 'Guide' },
    { label: label }
  ]
})

onMounted(() => {
  app.loadGuide(route.params.slug)
})
watch(() => route.params.slug, slug => {
  app.loadGuide(slug)
})
</script>