import { Navigation, Swiper, Pagination, Grid, Manipulation, } from 'swiper';

Swiper.use([Grid, Navigation, Pagination, Manipulation,]);

/**
 Входящие араметры:
  sliderElem — контейнер swiper-а
 slidesPerView = { md?: number, hg?: number, fl?: number, mx?: number }
 */

export default class Slider {
  swiper;

  constructor(sliderElem, slidesPerView, slidesPerColumn, btnPrev, btnNext, paginationElem, customGap, isLoop, isNoSwipe) {

    const gap = customGap ? +customGap : 30;

    this.swiper = new Swiper(sliderElem, {
      slidesPerView: slidesPerView.mb || slidesPerView.md || slidesPerView.hg || slidesPerView.fl || slidesPerView.mx,
      grid: {
        rows: slidesPerColumn,
      },
      lazy: true,
      keyboard: true,
      spaceBetween: gap,
      loop: isLoop,
      speed: 400,
      allowTouchMove: !isNoSwipe,
      pagination: {
        el: paginationElem,
        clickable: true
      },
      navigation: {
        prevEl: btnPrev,
        nextEl: btnNext
      },
      breakpoints: {
        479: {
          slidesPerView: slidesPerView.md || slidesPerView.hg || slidesPerView.fl || slidesPerView.mx
        },
        767: {
          spaceBetween: gap - 10 > 16 ? gap - 10 : 16,
          slidesPerView: slidesPerView.hg || slidesPerView.fl || slidesPerView.mx
        },
        1023: {
        slidesPerView: slidesPerView.fl || slidesPerView.mx
        },
        1279: {
          spaceBetween: gap,
          slidesPerView: slidesPerView.mx || 'auto'
        }
      }
    });
  }

  getActiveSlide() {
    return this.swiper.activeIndex;
  }
}
