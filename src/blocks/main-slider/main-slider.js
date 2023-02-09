import Slider from "../../js/common/slider";
import baguetteBox from 'baguettebox.js';

export class MainSlider {
  constructor() {
    const hostElem = document.querySelector('#main-slider-host');
    if (!hostElem) return;

    const swiperContainerElem = hostElem.querySelector('#js-swiper-container');
    const btnPrev = hostElem.querySelector('#js-btn-prev');
    const btnNext = hostElem.querySelector('#js-btn-next');

    new Slider(
      swiperContainerElem,
      { mx: 4, hg: 3, md: 1.5, mb: 1 },
      1,
      btnPrev,
      btnNext,
      null,
      20,
      true);

    baguetteBox.run('.js-baguette', {
      animation: 'fadeIn',
      noScrollbars: true
    });
  }
}

new MainSlider;
