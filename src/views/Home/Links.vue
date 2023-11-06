<template lang="pug">
.links.d-flex.flex-column
  v-btn.d-flex.justify-start.pa-2.my-2(
    color="primary"
    :variant="theme.global.name.value == 'dark' ? 'tonal' : 'text'"
    size="x-large"
    href="https://twitch.tv/raceswild"
    target="_blank"
  )
    .icon-wrapper
      v-img.pt-1(src="/TwitchGlitchPurple.svg" height="55px")
    span twitch.tv/raceswild
  v-btn.d-flex.justify-start.pa-2.my-2(
    color="primary"
    :variant="theme.global.name.value == 'dark' ? 'tonal' : 'text'"
    size="x-large"
    href="https://www.youtube.com/@raceswild"
    target="_blank"
  )
    .icon-wrapper
      v-img(src="/youtube.svg" width="40px")
    span youtube.com/@raceswild
  v-btn.d-flex.justify-start.pa-2.my-2(
    color="primary"
    :variant="theme.global.name.value == 'dark' ? 'tonal' : 'text'"
    size="x-large"
    href="https://calendar.google.com/calendar/embed?src=843820166f86304619f110c549714ea3dabbf2d4dfa75dc233dcca2fa410cf37%40group.calendar.google.com&ctz=America%2FNew_York"
    target="_blank"
  )
    .icon-wrapper
      v-img.flex-grow-0(src="/google-calendar.png")
    span events calendar
  v-btn.d-flex.justify-start.pa-2.my-2(
    color="primary"
    :variant="theme.global.name.value == 'dark' ? 'tonal' : 'text'"
    size="x-large"
    href="https://discord.gg/V7caHdC8r3"
    target="_blank"
  )
    .icon-wrapper
      v-img.flex-grow-0(src="/discord-mark-blue.svg" width="40px")
    span aces wilds discord
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()
</script>

<style>
.links .icon-wrapper {
  width:50px;
  height:50px;
  border-radius:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-right:10px
}
</style>