<template lang="pug">
v-app
  v-container.fade-in(style="max-width:600px" v-if="app.upcoming")
    next-event.mb-4
    links
    .text-body-1.my-4.fade-in(
      v-if="app.constant"
      v-html="util.markdown(app.constant.value)"
    )
    v-divider.mt-4
    .d-flex.justify-space-between
      v-btn(
        size="x-large"
        variant="text"
        width="50%"
        color="primary"
        to="/archive"
      ) Archive
      v-divider(vertical)
      v-btn(
        size="x-large"
        variant="text"
        width="50%"
        color="primary"
        to="/players"
      ) Players
    v-divider.mb-4
    upcoming(v-if="app.upcoming.length > 1")
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

import NextEvent from './Home/NextEvent.vue'
import Links from './Home/Links.vue'
import Upcoming from './Home/Upcoming.vue'

const app = useAppStore()
const util = useUtilStore()
onMounted(async () => {
  await app.loadUpcoming()
  await app.loadConstant('home-blurb')
})
</script>
