<template lang="pug">
v-app
  v-container.fade-in
    breadcrumbs(:items="[{label:'guides'}]" :loading="!app.guides")
    .d-flex.flex-column.align-start(v-if="app.guides")
      v-btn(
        v-for="guide in app.guides"
        :key="guide._id"
        variant="text"
        color="primary"
        :to="`/guide/${guide.slug}`"
      ) {{guide.title}}
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/store/app'

import Breadcrumbs from '@/components/Breadcrumbs.vue'

const app = useAppStore()

onMounted(() => {
  app.loadGuides()
})
</script>