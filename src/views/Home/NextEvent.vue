<template lang="pug">
v-card.pa-2(variant="text" to="/next")
  .text-overline Next Up
  .text-h4.text-sm-h3.text-md-h2 {{event && event.summary || 'TBD'}}
  .text-h6.text-sm-h5.text-md-h4(v-if="event")
    .d-flex.flex-wrap
      span.mr-2 {{util.format(event.start.dateTime)}}
      div
        span(v-if="util.relativity(event) == 'future'")
          | ({{util.relative(event.start.dateTime)}})
        span(v-else)
          | (<a href="https://twitch.tv/raceswild">right now!</a>)
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

const app = useAppStore()
const util = useUtilStore()
const event = computed(() => app.upcoming[0])
</script>
