import { defineStore } from 'pinia'

const CAL = import.meta.env.VITE_CAL
const MONGO = import.meta.env.VITE_MONGO

const ezfetch = async (url, opts, fallback) => {
  let resp = await fetch(url, opts)
    .catch(err => console.log(err))
  if(!resp.ok)
    return fallback
  let data = await resp.json()
  return data
}

export const useAppStore = defineStore('app', {
  state: () => ({
    upcoming: null,
    players: null,
    constants: null,
    guides: null,
    archive: null,
    event: null,
    player: null,
    constant: null,
    guide: null
  }),
  actions: {
    async loadUpcoming(force){
      if(!this.upcoming || force)
        this.upcoming = await ezfetch(`${CAL}/cal/upcoming`, null, [])
          .then(data => data.items)
    },
    async loadPlayers(force){
      if(!this.players || force)
        this.players = await ezfetch(`${MONGO}/players`, null, [])
    },
    async loadConstants(force){
      if(!this.constants || force)
        this.constants = await ezfetch(`${MONGO}/constants`, null, [])
    },
    async loadGuides(force){
      if(!this.guides || force)
        this.guides = await ezfetch(`${MONGO}/guides`, null, [])
    },
    async loadArchive(year, force){
      let sampleYear
      try{
        sampleYear = new Date(this.archive[0].start.dateTime).getFullYear()
      } catch(err) {}
      if(year != sampleYear || force) {
        this.archive = null
        this.archive = await ezfetch(`${CAL}/cal/year/${year}`, null, [])
          .then(data => data.items)
      }
    },
    async loadEvent(id, force){
      if(!id){ // next event
        await this.loadUpcoming()
        id = this.upcoming[0] && this.upcoming[0].id
      }
      if(!(this.event && this.event.id == id) || force) {
        this.event = null
        let event
        if(this.upcoming)
          event = this.upcoming.find(it => it.id == id)
        if(!event && this.archive)
          event = this.archive.find(it => it.id == id)
        if(!event)
          event = await ezfetch(`${CAL}/cal/event/${id}`, null, { metadata:{} })
        if(event.id)
          event.metadata = await ezfetch(`${MONGO}/event_metadata?id=${id}`, null, {})
        if(!event.metadata)
          event.metadata = {}
        event.metadata._id = event.id
        this.event = event
      }
    },
    async loadPlayer(short, force){
      if(!(this.player && this.player.short == short) || force) {
        this.player = null
        let player = this.players && this.players.find(it => it.short == short)
        if(!player)
          player = await ezfetch(`${MONGO}/player?short=${encodeURIComponent(short)}`, null, {})
        this.player = player
      }
    },
    async loadConstant(slug, force){
      if(!(this.constant && this.constant.slug == slug) || force) {
        this.constant = null
        let constant = this.constants && this.constants.find(it => it.slug == slug)
        if(!constant)
          constant = await ezfetch(`${MONGO}/constant?slug=${slug}`, null, {})
        this.constant = constant
      }
    },
    async loadGuide(slug, force){
      if(!(this.guide && this.guide.slug == slug) || force) {
        this.guide = null
        let guide = this.guides && this.guides.find(it => it.slug == slug)
        if(!guide)
          guide = await ezfetch(`${MONGO}/guide?slug=${slug}`, null, {})
        this.guide = guide
      }
    }
  }
})
