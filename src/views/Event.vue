<template lang="pug">
v-app
  v-container.event.fade-in
    breadcrumbs(:items="crumbs" :loading="!app.event")
    div(v-if="app.event")
      div(v-if="!app.event.id")
        .text-body1 No event found.
      div(v-else)
        .text-h4.text-sm-h3.text-md-h2 {{app.event.summary}}
        .text-h6.text-sm-h5.text-md-h4
          .d-flex.flex-wrap
            span.mr-2 {{util.format(app.event.start.dateTime)}}
            div
              span(v-if="util.relativity(app.event) == 'future'")
                | ({{util.relative(app.event.start.dateTime)}})
              span(v-else-if="util.relativity(app.event) == 'present'")
                | (<a href="https://twitch.tv/raceswild">right now!</a>)
        .text-body1.markdown.mt-4(v-html="app.event.description")
        div(v-if="app.event.metadata")
          div(v-if="app.event.metadata.participants && app.players")
            v-divider.my-4
            .d-flex.align-baseline.mb-1
              .text-overline.mt-n2.mr-2 {{util.relativity(app.event) == 'future' ? 'Expected Participants' : 'Participants'}}
              v-btn(
                color="primary"
                size="x-small"
                variant="outlined"
                v-if="!revealWinner && util.relativity(app.event) == 'past'"
                @click="revealWinner=true"
              ) Reveal Winner
            v-chip.mr-2(
              v-for="participant of participants"
              color="primary"
              :href="`/player/${participant.short}`"
              :variant="chipVariant(participant)"
            ) {{participant.short}}
          div(v-if="util.relativity(app.event) != 'past'")
            div(v-if="app.event.metadata.instructions")
              .v-divider.mt-4.mb-8
              .v-divider.mt-8.mb-4
              .text-overline.mt-n2 Participant Instructions
              .markdown(v-html="util.markdown(app.event.metadata.instructions)")
            div(v-if="app.event.metadata.guides && app.guides")
              .v-divider.my-4
              .text-overline.mt-n2 Relevant Guides
              v-card.mb-4(
                v-for="guide of app.guides.filter(it => app.event.metadata.guides.includes(it._id))"
                variant="elevated"
              )
                v-card-title {{guide.title}}
                v-card-text
                  .markdown.mb-n4(v-html="util.markdown(guide.content)")
          div(v-else)
            div(v-if="['racetime', 'twitch', 'youtube'].some(it => it in app.event.metadata)")
              v-divider.my-4
              .d-flex
                v-btn(
                  height="60px"
                  width="60px"
                  variant="icon"
                  size="x-large"
                  v-if="app.event.metadata.racetime"
                  :href="app.event.metadata.racetime"
                )
                  v-img(src="/racetimeGG-favicon-512x512.png" width="70px" height="60px")
                v-btn(
                  height="60px"
                  width="60px"
                  variant="icon"
                  size="x-large"
                  v-if="app.event.metadata.twitch"
                  :href="app.event.metadata.twitch"
                )
                  v-img(src="/TwitchGlitchPurple.svg" width="70px" height="60px")
                v-btn(
                  height="60px"
                  width="60px"
                  variant="icon"
                  size="x-large"
                  v-if="app.event.metadata.twitch"
                  :href="app.event.metadata.youtube"
                )
                  v-img.mt-n1(src="/youtube.svg" width="70px" height="70px")
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

import Breadcrumbs from '@/components/Breadcrumbs.vue'

const route = useRoute()
const app = useAppStore()
const util = useUtilStore()

const crumbs = computed(() => {
  let label = ''
  if(!route.params.id)
    label = 'next'
  else if(app.event)
    if(app.event.id)
      label = util.format(app.event.start.dateTime, 'MMM D, YYYY')
    else
      label = '404'
  return [
    { url: '/archive', label: 'Event' },
    { label: label }
  ]
})

const participants = computed(() => {
  return app.players
    .filter(it => app.event.metadata.participants.includes(it._id))
    .sort((a, b) => {
      let A = a.short.toUpperCase()
      let B = b.short.toUpperCase()
      if(A<B)
        return -1
      if(A>B)
        return 1
      return 0
    })
})

const revealWinner = ref(false)
const chipVariant = participant => {
  if(!revealWinner.value)
    return 'tonal'
  else if(app.event.metadata.winners.includes(participant._id))
    return 'elevated'
  else
    return 'outlined'
}

onMounted(async () => {
  await app.loadEvent(route.params.id)
  if(app.event){
    if(app.event.metadata.participants)
      app.loadPlayers()
    if(util.relativity(app.event) != 'past' && app.event.metadata.guides){
      app.loadGuides()
    }
  }
})
watch(() => route.params.id, id => {
  app.loadEvent(id)
})
</script>