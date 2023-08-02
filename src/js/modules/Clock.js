/**
 * Create a interactive clock
 * @constructor
 * @param {object} root - the container where all the interacitve elements sits
 * @param {string} dataSet - the `HTMLElement.dataset` value
 */
class Clock {
  constructor (root = undefined, dataSet='control') {
    if (root) {
      this.root = root
      this.root.onclick = this.click.bind(this)
      this.dataSet = dataSet
    }

    // for state
    this.started = false
    this.paused  = false
    this.resumed = undefined
    this.stopped = true

    // time
    this.minutes = 0 
    this.seconds = 0 
    this.hours   = 0 

    // for remaining time
    this.before = null
    this.delta = null
  }

  pause() {
    if ( this.started || this.resumed ) {
      clearInterval(this.interval)
      this.after = Date.now()
      this.delta = 1000 - (this.after - this.before)

      this.paused = true
      this.resumed = false
    }
  }

  resume() {
    if (this.paused) {
      this.resumed = true
      this.paused = false

      console.log(this.delta)
      setTimeout(() => {
        this.seconds++ 
        this.#count()
      },this.delta)

    }
  }

  start() {
    if( this.stopped ) {
      this.started = true
      this.stopped = false

      this.#count()
    }
  }

  stop() {
    if(this.started) {
      this.started = false
      this.stopped = true

      clearInterval(this.interval)

      this.hours   = 0
      this.minutes = 0
      this.seconds = 0
    }

  }

  #count() {
    this.interval = setInterval(() => {
      this.before = Date.now()
      this.seconds++
      if(this.seconds >= 60) {
        this.minutes += Math.round(this.seconds / 60)
        this.seconds  = 0
      }
      if(this.minutes >= 60) {
        this.hours   += Math.round(this.minutes / 60)
        this.minutes  = 0
      }
    }, 1000)
  }

  click(event) {
    if (!this.root) throw new Error('No root defined')

    let dataSet = event.target.dataset[this.dataSet]

    if(this[dataSet]) {
      this[dataSet]()
    }
  }
}

export default Clock
