import Slider from "../../js/common/slider";

export class SliderBroadcast {
  constructor() {
    const hostElem = document.querySelector('#slider-broadcast-host');
    if (!hostElem) return;

    const swiperContainerElem = hostElem.querySelector('[data-swiper-container]');
    const btnPrev = hostElem.querySelector('[data-btn-prev]');
    const btnNext = hostElem.querySelector('[data-btn-next]');

    new Slider(
      swiperContainerElem,
      { mx: 3, hg: 2, md: 1.5, mb: 1 },
      1,
      btnPrev,
      btnNext,
      null,
      20
    );
  }
}

new SliderBroadcast();
