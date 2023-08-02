import Clock from "./modules/Clock.js"

const controller = new Clock(control)
setInterval(() => {
  let s = controller.seconds
  seconds.innerHTML = s < 10 ? '0'+s : s
  let m = controller.minutes
  minutes.innerHTML = m < 10 ? '0'+m : m
  let h = controller.hours
  hours.innerHTML = h < 10 ? '0'+h : h
})
