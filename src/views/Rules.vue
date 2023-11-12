<template lang="pug">
v-app
  v-container.fade-in(style="max-width:600px")
    breadcrumbs(:items="[{label:'rules'}]" :loading="!app.guide")
    div(v-if="app.guide")
      div(v-if="!app.guide.slug")
        .text-body1 No guide found.
      .markdown(v-else v-html="util.markdown(app.guide.content)")
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

import Breadcrumbs from '@/components/Breadcrumbs.vue'

const app = useAppStore()
const util = useUtilStore()

onMounted(() => {
  app.loadGuide('rules')
})
</script>