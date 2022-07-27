class Scroll {
  constructor(el) {
    this.el = document.querySelector(el.el)
    this.top = el.top
    this.unit = el.unit || '%'
    this.el.style.position = `fixed`
    this.el.style.bottom = '0px'
    // this.el.style.transform = 'translateY(100%)'
    window.addEventListener('scroll', () => { this.scroll() })
  }
  scroll() {
    const position = this.unitEl()
    this.el.style.bottom = 'unset'
    this.el.style.transform = 'translateY(0)'
    if (position - window.scrollY > 0 || window.scrollY == 0) {
      this.el.style.top = `${position - window.scrollY}px`
    } else {
      this.el.style.top = '0px'
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
if (!window.location.href.includes("file:///C:/Users/User/Desktop/Practice/SMS_ads/pages/register.html")) {
  function parallax() {
    console.log('Hllo');
    const carousel = document.getElementById('carousel'),
      slider = carousel.querySelector('.slider'),
      slides = slider.querySelectorAll('.slide'),
      imgs = slider.querySelectorAll('img')

    window.addEventListener('scroll', () => {
      let sideY = window.scrollY
      console.log();
      if (carousel.offsetTop - 300 < sideY) {
        slider.style.display = `flex`
      }
      if (carousel.offsetTop < sideY && carousel.offsetTop + carousel.clientHeight > sideY + 700) {
        slider.style.opacity = `1`
        slider.style.transform = `translateX(-${(carousel.clientHeight / slider.clientWidth) * sideY}%)`
        imgs.forEach(img => {
          let speed = img.getAttribute('data-speed')
          img.style.transform = `translateX(-${((sideY - carousel.offsetTop) * speed) < 60 ? ((sideY - carousel.offsetTop) * speed) + 200 : (sideY - carousel.offsetTop) * speed}px) translateY(-50%)`
        })
        slides.forEach(slide => {
          slide.style.opacity = `1`
          slide.style.transform = `translateX(-${(sideY - carousel.offsetTop) * 1.05}px) translateY(0%)`
        })
      } else if (carousel.offsetTop - 300 > sideY || carousel.offsetTop + carousel.clientHeight - 550 < sideY) {
        slider.style.opacity = `0`
        setTimeout(() => {
          if (carousel.offsetTop - 300 > sideY || carousel.offsetTop + carousel.clientHeight < sideY) {
            slider.style.display = `none`
          }
        }, 500);
      }
    })
  }
  parallax()
  new Scroll({
    el: '.slider',
    top: carousel.offsetTop,
    unit: 'px'
  })
}

// Form inputs

const inputs = document.querySelectorAll('input')

inputs.forEach(input => {
  if (input.value.includes('A')) {
    console.log(input);
  }
})