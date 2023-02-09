import Slider from "../../js/common/slider";

export class Marketplace {
  constructor() {
    const hostElem = document.querySelector('#marketplace-host');
    if (!hostElem) return;

    const swiperContainerElem = hostElem.querySelector('#js-swiper-container');

    const btnPrev = hostElem.querySelector('#js-btn-prev');
    const btnNext = hostElem.querySelector('#js-btn-next');

    new Slider(
      swiperContainerElem,
      { mx: 5, hg: 4, md: 3, mb: 2 },
      1,
      btnPrev,
      btnNext,
      null,
      20,
      false);
  }
}

new Marketplace;
