class Carousel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId)

        this.config = {
            images: [],
            duration: 500,
            autoplay: false,
            autoplaySpeed: 3000,
            showArrows: true,
            showDots: true,
            ...options,
        }

        this.currentIndex = 0
        this.track = null
        this.dotsList = []
        this.autoplayTimer = null

        this.init()
    }

    init() {
        if (!this.config.images.length) return


        this.container.innerHTML = ''
        this.dotsList = []

        this.track = document.createElement('div')
        this.track.classList.add('carousel-track')
        this.track.style.transition = `transform ${this.config.duration}ms ease-in-out`

        this.config.images.forEach(src => {
            const slide = document.createElement('div')
            slide.classList.add('carousel-slide')
            const img = document.createElement('img')
            img.src = src
            slide.appendChild(img)
            this.track.appendChild(slide)
        })

        this.container.appendChild(this.track)

        if (this.config.showArrows) this.createArrows()
        if (this.config.showDots) this.createDots()

        this.setupEventListeners()
        this.updateView()

        if (this.config.autoplay) this.startAutoplay()
    }


    updateConfig(newOptions) {
        this.stopAutoplay()
        this.config = {...this.config, ...newOptions}
        this.init()
    }

    createArrows() {
        const prevBtn = document.createElement('button')
        prevBtn.classList.add('carousel-arrow', 'prev')
        prevBtn.innerHTML = '&#10094;'
        prevBtn.addEventListener('click', () => this.prev())

        const nextBtn = document.createElement('button')
        nextBtn.classList.add('carousel-arrow', 'next')
        nextBtn.innerHTML = '&#10095;'
        nextBtn.addEventListener('click', () => this.next())

        this.container.appendChild(prevBtn)
        this.container.appendChild(nextBtn)
    }

    createDots() {
        const dotsContainer = document.createElement('div')
        dotsContainer.classList.add('carousel-dots')

        this.config.images.forEach((_, index) => {
            const dot = document.createElement('div')
            dot.classList.add('carousel-dot')
            dot.addEventListener('click', () => this.goTo(index))
            this.dotsList.push(dot)
            dotsContainer.appendChild(dot)
        })

        this.container.appendChild(dotsContainer)
    }

    updateView() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`
        if (this.config.showDots) {
            this.dotsList.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex)
            })
        }
    }

    next() {
        this.currentIndex++
        if (this.currentIndex >= this.config.images.length) this.currentIndex = 0
        this.updateView()
    }

    prev() {
        this.currentIndex--
        if (this.currentIndex < 0) this.currentIndex = this.config.images.length - 1
        this.updateView()
    }

    goTo(index) {
        this.currentIndex = index
        this.updateView()
    }

    startAutoplay() {
        if (!this.config.autoplay) return
        this.stopAutoplay()
        this.autoplayTimer = setInterval(() => this.next(), this.config.autoplaySpeed)
    }

    stopAutoplay() {
        clearInterval(this.autoplayTimer)
    }

    setupEventListeners() {
        this.container.addEventListener('mouseenter', () => this.stopAutoplay())
        this.container.addEventListener('mouseleave', () => this.startAutoplay())

        
        document.onkeydown = (e) => {
            if (e.key === 'ArrowLeft') this.prev()
            if (e.key === 'ArrowRight') this.next()
        }
    }
}
