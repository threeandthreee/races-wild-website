<template lang="pug">
div
  .text-overline Upcoming
  div
    v-card.pa-2.ma-1(
      v-for="event in events"
      :key="event.id"
      variant="flat"
      :to="`/event/${event.id}`"
    )
      .d-flex.align-center
        div(style="width:80px")
          v-chip.mr-2.flex-shrink-0(color="primary") {{util.format(event.start.dateTime, 'MMM D')}}
        span {{event.summary}}
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

const app = useAppStore()
const util = useUtilStore()
const events = computed(() => app.upcoming.filter(it => it.summary != 'Break'))
</script>
