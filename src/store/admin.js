import { defineStore } from 'pinia'

const MONGO = import.meta.env.VITE_MONGO

const ezfetch = async (url, opts, fallback) => {
  let resp = await fetch(url, opts)
    .catch(err => console.log(err))
  if(!resp.ok)
    return fallback
  let data = await resp.json()
  return data
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    secret: null,
    isAuthed: false
  }),
  actions: {
    async checkSecret() {
      let resp = await fetch(`${MONGO}/check?secret=${this.secret}`)
      this.isAuthed = resp.ok
    },
    upsertEventMetadata(metadata) {
      return ezfetch(`${MONGO}/upsert_event_metadata?secret=${this.secret}`, {
        method: 'POST',
        body: JSON.stringify(metadata)
      })
    },
    upsertPlayer(player) {
      return ezfetch(`${MONGO}/upsert_player?secret=${this.secret}`, {
        method: 'POST',
        body: JSON.stringify(player)
      })
    },
    upsertConstant(constant) {
      return ezfetch(`${MONGO}/upsert_constant?secret=${this.secret}`, {
        method: 'POST',
        body: JSON.stringify(constant)
      })
    },
    upsertGuide(guide) {
      return ezfetch(`${MONGO}/upsert_guide?secret=${this.secret}`, {
        method: 'POST',
        body: JSON.stringify(guide)
      })
    }
  }
})