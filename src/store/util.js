import { defineStore } from 'pinia'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { markdown } from 'markdown'

dayjs.extend(relativeTime)

export const useUtilStore = defineStore('util', {
  actions: {
    format(timestamp, format) {
      let d = dayjs(timestamp)
      if(!format){
        format = 'dddd, MMM D'
        if(dayjs().year() != d.year())
          format += ', YYYY'
        format += ' @ h'
        if(d.minute())
          format += ':mm'
        format += 'a'
      }
      return d.isValid() ? d.format(format) : null
    },
    relative(timestamp) {
      let d = dayjs(timestamp)
      return d.isValid() ? d.fromNow() : null
    },
    relativity(event) {
      let now = dayjs()
      if(dayjs(event.start.dateTime).isAfter(now))
        return 'future'
      else if(dayjs(event.end.dateTime).isBefore(now))
        return 'past'
      else
        return 'present'
    },
    markdown(md) {
      try{
        return markdown.toHTML(md)
      } catch(err){
        return ''
      }
    },
  }
})