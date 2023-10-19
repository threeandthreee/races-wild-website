<template lang="pug">
v-app
  v-container.fade-in
    breadcrumbs(:items="[{label:'admin'}]" :loading="loading")
    v-text-field(
      v-model="admin.secret"
      placeholder="should you be here?"
      variant="outlined"
      @change="admin.checkSecret"
      hide-details="auto"
      type="password"
    )
    .fade-in(v-if="admin.isAuthed")
      v-divider.my-4
      v-card(variant="flat")
        v-tabs(v-model="tab" color="primary")
          v-tab(value="events") Events
          v-tab(value="players") Players
          v-tab(value="constants") Constants
          v-tab(value="guides") Guides
        v-card-text
          v-window(v-model="tab")
            v-window-item(value="events")
              events
            v-window-item(value="players")
              players
            v-window-item(value="constants")
              constants
            v-window-item(value="guides")
              guides
</template>

<script setup>
import { ref } from 'vue'
import { useAdminStore } from '@/store/admin'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

import Events from './Admin/Events.vue'
import Players from './Admin/Players.vue'
import Constants from './Admin/Constants.vue'
import Guides from './Admin/Guides.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

const admin = useAdminStore()
const app = useAppStore()
const util = useUtilStore()

const loading = ref(false)
const tab = ref('event')
</script>