class Scroll {
  constructor(el) {
    this.container = document.querySelector(el.container)
    this.el = document.querySelector(el.el)
    this.top = el.top
    this.unit = el.unit || '%'
    this.stop = el.stop || false
    this.el.style.position = stop ? 'absolute' : `fixed`
    this.el.style.bottom = '0px'
    window.addEventListener('scroll', () => { this.scroll() })
  }
  scroll() {
    const position = this.unitEl()
    this.el.style.bottom = 'unset'
    this.el.style.transform = 'translateY(0)'
    if (position - window.scrollY > 0 || window.scrollY == 0) {
      this.el.style.position = `fixed`
      this.el.style.top = `${position - window.scrollY}px`
    } else {
      if (this.stop && (position + this.container.clientHeight - window.innerHeight) - window.scrollY < 0) {
        this.el.style.position = `absolute`
        this.el.style.top = `unset`
        this.el.style.bottom = `0px`
        console.log(
          'position', position,
          'height', this.container.clientHeight,
          'el', (position + this.container.clientHeight) - window.scrollY,
          'win',
        );
      } else {
        this.el.style.position = `fixed`
        this.el.style.top = '0px'
      }
    }
  }
  unitEl() {
    if (this.unit === 'px') {
      return this.top > 0 ? this.top : 0
    } else if (this.unit === '%') {
      return (window.innerHeight / 100) * this.top - this.el.clientHeight
    }
  }
}

// Navigation Menu
const burger = document.getElementById('burger'),
  menu = document.getElementById('menu')

burger.addEventListener('click', (e) => {
  e.target.classList.toggle('active')
  if (menu.className !== 'navbar-list open') {
    menu.classList.add('open')
  } else {
    menu.classList.remove('open')
    menu.classList.add('close')
    setTimeout(() => {
      menu.classList.remove('close')
    }, 500);
  }
})

// Parallax / Scroll Animation
function parallax() {
  if (!window.location.href.includes("file:///C:/Users/User/Desktop/Practice/SMS_ads/pages/register.html")) {
    const carousel = document.getElementById('carousel'),
      slider = carousel.querySelector('.slider'),
      slides = slider.querySelectorAll('.slide'),
      imgs = slider.querySelectorAll('img')

    window.addEventListener('scroll', () => {
      let sideY = window.scrollY
      if (carousel.offsetTop - 300 < sideY) {
        slider.style.display = `flex`
      }
      // if (carousel.offsetTop < sideY) {
      // slider.style.opacity = `1`
      slider.style.transform = `translateX(-${(carousel.clientHeight / slider.clientWidth) * sideY}%)`
      imgs.forEach(img => {
        let speed = img.getAttribute('data-speed')
        // img.style.transform = `translateX(-${((sideY - carousel.offsetTop) * speed) < 100 ? ((sideY - carousel.offsetTop) * speed) + 200 : (sideY - carousel.offsetTop) * speed}px) translateY(-50%)`
        img.style.transform = `translateX(-${((sideY / 250) * speed) > 50 ? (sideY / 250) * speed : 50}%) translateY(-50%)`
      })
      slides.forEach(slide => {
        slide.style.opacity = `1`
        slide.style.transform = `translateX(-${sideY - carousel.offsetTop}px) translateY(0%)`
      })

    })
    new Scroll({
      container: '#carousel',
      el: '.slider',
      top: carousel.offsetTop,
      stop: true,
      unit: 'px'
    })
  } else {
    return
  }
}

parallax()

// Form inputs

const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
  if (input.value.includes('A')) {
    console.log(input);
  }
})

const btnUp = document.getElementById('up') ?? null

window.addEventListener('scroll', () => {
  let sideY = window.scrollY
  if (sideY > 700 && btnUp != null) {
    btnUp.style.opacity = '1'
  } else if (sideY < 700 && btnUp != null) {
    btnUp.style.opacity = '0'
  }
})
