<template lang="pug">
div
  .d-flex.justify-start.align-center.flex-wrap
    v-btn.breadcrumb.pa-0(
      to="/"
      variant="text"
      color="primary"
      size="large"
    ) Races Wild
    .d-flex.justify-start.align-center.flex-wrap(
      v-for="item in items"
    )
      v-icon.mx-2(size="x-small") mdi-greater-than
      v-btn.breadcrumb.pa-0(
        v-if="item.url"
        :to="item.url"
        variant="text"
        color="primary"
        size="large"
      ) {{item.label}}
      v-btn.breadcrumb.pa-0(
        v-else
        disabled
        variant="text"
        size="large"
      ) {{item.label}}
  v-progress-linear.mb-3(indeterminate v-if="loading" color="primary")
  v-divider.mb-4(v-else)
</template>

<script setup>
defineProps(['items', 'loading'])
</script>