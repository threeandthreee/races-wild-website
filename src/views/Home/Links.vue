<template lang="pug">
.d-flex.flex-column
  v-btn.d-flex.justify-start.pa-2.my-2(
    color="primary"
    variant="text"
    size="x-large"
    href="https://twitch.tv/raceswild"
    target="_blank"
  )
    div(style="width:70px")
      v-img(src="/TwitchGlitchPurple.svg" width="50px" style="margin-left:4px")
    span twitch.tv/raceswild
  v-btn.d-flex.justify-start.pa-2.my-2(
    color="primary"
    variant="text"
    size="x-large"
    href="https://www.youtube.com/@raceswild"
    target="_blank"
  )
    div(style="width:70px")
      v-img(src="/youtube.svg" width="60px")
    span youtube.com/@raceswild
  v-btn.d-flex.justify-start.pa-2.my-2(
    color="primary"
    variant="text"
    size="x-large"
    href="https://calendar.google.com/calendar/embed?src=843820166f86304619f110c549714ea3dabbf2d4dfa75dc233dcca2fa410cf37%40group.calendar.google.com&ctz=America%2FNew_York"
    target="_blank"
  )
    div(style="width:70px")
      v-img(src="/google-calendar.png" width="60px")
    span events calendar
  v-btn.d-flex.justify-start.pa-2.my-2(
    color="primary"
    variant="text"
    size="x-large"
    href="https://discord.gg/V7caHdC8r3"
    target="_blank"
  )
    div(style="width:70px")
      v-img(src="/discord-mark-blue.svg" width="50px" style="margin-left:6px")
    span aces wilds discord
</template>