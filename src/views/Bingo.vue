<template lang="pug">
v-app
  v-container.fade-in(style="max-width:500px")
    breadcrumbs(:items="[{label:'bingo'}]" :loading="!bingo")
    div(v-if="bingo")
      .text-body1 Play bingo while you watch the race on <a href="https://twitch.tv/raceswild" target="_blank">twitch</a>! If any squares don't make sense to you, just ask in chat!
      v-card.mt-4(variant="outlined")
        iframe(width="100%" frameborder="0" style="aspect-ratio:.85" :src="bingo")
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/store/app'

import Breadcrumbs from '@/components/Breadcrumbs.vue'

const app = useAppStore()

const bingo = computed(() => {
  if(app.event && app.event.metadata && app.event.metadata.bingo)
    return app.event.metadata.bingo
  else if(app.constant && app.constant.slug == 'bingo')
    return app.constant.value
})

onMounted(async () => {
  await app.loadEvent()
  await app.loadConstant('bingo')
})
</script>