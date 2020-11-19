export const scrollTop = (el, number = 0, time) => {
  console.log(el)
  // const el = this.container? document.querySelector(this.container) : document.querySelector('.newContent')
  if (!time) {
    el.scrollTop = document.documentElement.scrollTop = number
    return number
  }
  const spacingTime = 20
  let spacingInex = time / spacingTime
  let nowTop = el.scrollTop + document.documentElement.scrollTop
  const everTop = (number - nowTop) / spacingInex
  const scrollTimer = setInterval(() => {
    if (spacingInex > 0) {
      spacingInex--
      scrollTop(el, (nowTop += everTop))
    } else {
      clearInterval(scrollTimer)
    }
  }, spacingTime)
  return false
}