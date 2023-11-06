<template>
  <router-view />
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

theme.global.name.value = (window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches) ? 'dark' : 'light'
</script>

<style>
.fade-in {
  animation: fadeIn 1s;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.w-100 {
  width: 100%;
}
.markdown ul, .markdown ol {
  padding-left: 20px;
}
.markdown > * {
  margin-bottom: 16px;
}
.markdown img {
  max-width: 300px;
  display: block;
}

.v-btn.breadcrumb {
  min-width: 0 !important;
}
.md-preview {
  overflow-y: scroll !important;
}
</style>
