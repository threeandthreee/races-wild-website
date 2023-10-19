<template lang="pug">
v-app
  v-container.fade-in
    breadcrumbs(:items="crumbs" :loading="!app.player")
    div(v-if="app.player")
      div(v-if="!app.player.short")
        .text-body1 No player found.
      .d-flex.flex-column(v-else)
        v-btn.d-flex.justify-start(
          variant="text"
          size="x-large"
          v-if="app.player.discord"
        )
          v-img(src="/discord-mark-blue.svg" width="40px")
          .ml-4 @{{app.player.discord}}
        v-btn.d-flex.justify-start(
          variant="text"
          size="x-large"
          color="primary"
          v-if="app.player.twitch"
          :href="`https://twitch.tv/${app.player.twitch}`"
        )
          v-img.ml-1(src="/TwitchGlitchPurple.svg" width="35px")
          .ml-4 twitch.tv/{{app.player.twitch}}
        v-btn.d-flex.justify-start(
          variant="text"
          size="x-large"
          color="primary"
          v-if="app.player.youtube"
          :href="`https://youtube.com/@${app.player.youtube}`"
        )
          v-img.ml-n1(src="/youtube.svg" width="50px")
          .ml-2 youtube.com/@{{app.player.youtube}}
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'

import Breadcrumbs from '@/components/Breadcrumbs.vue'

const route = useRoute()
const app = useAppStore()

const crumbs = computed(() => {
  let label = ''
  if(app.player)
    if(app.player.short)
      label = app.player.short
    else
      label = '404'
  return [
    { url: '/players', label: 'Player' },
    { label: label }
  ]
})

onMounted(() => {
  app.loadPlayer(decodeURIComponent(route.params.short))
})
watch(() => route.params.short, short => {
  app.loadPlayer(decodeURIComponent(short))
})
</script>