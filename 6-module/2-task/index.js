'use strict';

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: './assets/images/default-slide-img.jpg'
    }
  ];

  constructor(element) {
    this.el = element;

    let activeCarouselItem = this.slides[0];

    let carouselItemsHtml = this.slides
      .map((item, index) => `<li data-target="#mainCarousel" data-slide-to="${item.id}" class="carousel-indicator ${item === activeCarouselItem ? "active" : ""}"></li>`)
      .join();

    this.el.insertAdjacentHTML("afterBegin", `
      <div id="mainCarousel" class="main-carousel carousel slide">
        <ol class="carousel-indicators">
            ${carouselItemsHtml}
        </ol>
        <div class="carousel-inner">
            ${this._carouselItemHtml(activeCarouselItem.id)}
        </div>

        <button class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </button>
        <button class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </button>
      </div>
    `);

    this.el.querySelector(".carousel-indicators").addEventListener("click", this._carouselIndicatorsClick.bind(this));

    this.el.querySelector(".carousel-control-prev").addEventListener("click", this._carouselPrevClick.bind(this));
    this.el.querySelector(".carousel-control-next").addEventListener("click", this._carouselNextClick.bind(this));

  }

  _carouselIndicatorsClick(event) {
    let newCarouselIndicator = event.target.closest(".carousel-indicator");

    if (!event.currentTarget.contains(newCarouselIndicator))
      return;

    let newCarouselIndicatorId = +newCarouselIndicator.dataset.slideTo;

    if (isNaN(newCarouselIndicatorId))
      return;

    let curActiveCarouselIndicator = event.currentTarget.querySelector(".carousel-indicator.active");
    if (curActiveCarouselIndicator) {
      curActiveCarouselIndicator.classList.remove("active");
    }

    newCarouselIndicator.classList.add("active");

    this.el.querySelector("#mainCarousel > .carousel-inner").innerHTML = this._carouselItemHtml(newCarouselIndicatorId);
  }

  _carouselPrevClick(event) {
    let curActiveCarouselSlide = this._getActiveSlide();

    let newCarouselIndicatorId = !curActiveCarouselSlide || this.slides.indexOf(curActiveCarouselSlide) === 0
      ? this.slides[this.slides.length - 1].id
      : this.slides[this.slides.indexOf(curActiveCarouselSlide) - 1].id;

    this._setCarouselItemActive(newCarouselIndicatorId);
  }

  _carouselNextClick(event) {
    let curActiveCarouselSlide = this._getActiveSlide();

    let newCarouselIndicatorId = !curActiveCarouselSlide || this.slides.indexOf(curActiveCarouselSlide) === (this.slides.length - 1)
      ? this.slides[0].id
      : this.slides[this.slides.indexOf(curActiveCarouselSlide) + 1].id;

    this._setCarouselItemActive(newCarouselIndicatorId);
  }

  _getActiveSlide() {
    let curActiveCarouselIndicator = this.el.querySelector("#mainCarousel > .carousel-indicators > .carousel-indicator.active");
    
    let curActiveCarouselIndicatorId = curActiveCarouselIndicator
      ? +curActiveCarouselIndicator.dataset.slideTo
      : NaN;
    
    return !isNaN(curActiveCarouselIndicatorId)
      ? this.slides.find((item) => item.id === curActiveCarouselIndicatorId)
      : undefined;
  }

  _setCarouselItemActive(id) {
    let curActiveCarouselIndicator = this.el.querySelector("#mainCarousel > .carousel-indicators > .carousel-indicator.active");

    if (curActiveCarouselIndicator) {
      curActiveCarouselIndicator.classList.remove("active");
    }

    if(!isNaN(+id)) {
      let newCarouselIndicator = this.el.querySelector(`#mainCarousel > .carousel-indicators > .carousel-indicator[data-slide-to='${id}']`);
      if (newCarouselIndicator) {
        newCarouselIndicator.classList.add("active");
        this.el.querySelector("#mainCarousel > .carousel-inner").innerHTML = this._carouselItemHtml(+id);
      }
    }
  }

  _carouselItemHtml(index) {
    let slide = this.slides.find((item) => item.id === index);

    if (slide) {
    return `
      <div class="carousel-item active">
        <img src="${slide.img}" alt="Activelide">
        <div class="container">
            <div class="carousel-caption">
                <h3 class="h1">${slide.title}</h3>
                <div>
                    <a class="btn" href="#" role="button">
                        View all DEALS
                        <img src="assets/icons/icon-angle-white.svg" class="ml-3" alt="">
                    </a>
                </div>
            </div>
        </div>
      </div>    
    `;
    } else {
      return '';
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
