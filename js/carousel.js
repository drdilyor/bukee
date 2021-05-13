
class Carousel {
  
  /**
   * @param {HTMLElement} elem 
   */
  constructor(elem) {
    this.elem = elem
    
    const slides = elem.querySelectorAll('.carousel > .slide')

    if (slides.length === 0)
      throw new TypeError('carousel cannot have zero slides')

    let active = null
    for (const slide of slides) {
      if (slide.classList.contains('is-active')) {
        if (active === null)
          active = slide
        else
          slide.classList.remove('is-active')
      }
    }
    if (active === null) {
      active = slides[0]
      active.classList.add('is-active')
    }
    
    this.time = 5000
    console.assert(this.time > 1000)
    this.start()
    this.createIndicators()
  }
  start() {
    this.timeoutId = setTimeout(() => {
      this.start()
    }, this.time)
    this.next()
  }
  
  next() {
    const [slides, activeIndex] = this.nextSlide()
    this.updateIndicators(activeIndex)
  }
  
  nextSlide() {
    /** @type {Array<HTMLElement>} */
    const slides = [].slice.call(this.elem.querySelectorAll('.carousel > .slide'))

    const current = slides.findIndex(i => i.classList.contains('is-active'))
    console.log({current, length: slides.length})
    
    let next = 0
    if (current === slides.length - 1) {
      console.log('last item')
    }
    else {
      console.log('not last item')
      next = current + 1
    }

    slides[current].classList.add('is-leaving')
    slides[current].classList.remove('is-active')
    slides[next].classList.add('is-entering', 'is-active')
    setTimeout(() => {
      slides[current].classList.remove('is-leaving')
      slides[next].classList.remove('is-entering')
    }, 1000)
    return [slides, current]
  }
  
  /**
   * @param {Array<HTMLElement>} slides
   * @param {Number} activeIndex
   */
  createIndicators() {
    const slides = [].slice.call(this.elem.querySelectorAll('.carousel > .slide'))
    const activeIndex = slides.findIndex(i => i.classList.contains('is-active'))
    const indicators = this.elem.querySelector('ul.indicators')
    if (!indicators) return
    const html = slides.map((el, i) => `<li${i == activeIndex ? ' class="is-active"' : ''}></li>`).join('')
  indicators.innerHTML = html
  }

  /**
   * @param {Array<HTMLElement>} slides
   * @param {Number} activeIndex
   */
  updateIndicators(activeIndex) {
    const indicatorsContainer = this.elem.querySelector('.indicators')
    /** @type {Array<HTMLElement>} */
    const indicators = [].slice.call(indicatorsContainer.querySelectorAll('li'))
    indicators.forEach((el, i) => {
      if (i == activeIndex)
        el.classList.add('is-active')
      else
        el.classList.remove('is-active')
    })
  }
  
  stop() {
    clearTimeout(this.timeoutId)
  }
}
