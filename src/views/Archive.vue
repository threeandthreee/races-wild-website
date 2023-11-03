<template lang="pug">
v-app
  v-container.fade-in(style="max-width:600px")
    breadcrumbs(:items="[{label:'archive'}]" :loading="!app.archive")
    div(v-if="app.archive")
      v-text-field.mr-4(
        v-model="search"
        label="Search"
        variant="outlined"
        clearable
      )
      v-data-table(
        :headers="headers"
        :items="app.archive"
        :search="search"
        :sort-by="sort"
      )
        template(v-slot:item.summary="{ item }")
          router-link(:to="`/event/${item.raw.id}`") {{item.raw.summary}}
        template(v-slot:item.start.dateTime="{ item }")
          | {{util.format(item.raw.start.dateTime, 'MMM D, YYYY')}}
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { useUtilStore } from '@/store/util'

import Breadcrumbs from '@/components/Breadcrumbs.vue'

const app = useAppStore()
const util = useUtilStore()

const search = ref('')

const headers = [
  { title: "Summary", key: "summary" },
  { title: "Date", key: "start.dateTime"}
]
const sort = [{key:"start.dateTime", order:"desc"}]


onMounted(() => {
  app.loadArchive()
})
</script>