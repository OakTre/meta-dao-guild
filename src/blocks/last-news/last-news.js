import Slider from "../../js/common/slider";

class LastNews {
  constructor() {
    const hostElem = document.querySelector('#last-news-host');
    if (!hostElem) return;

    const swiperContainerElem = hostElem.querySelector('#js-swiper-container');
    const btnPrev = hostElem.querySelector('#js-btn-prev');
    const btnNext = hostElem.querySelector('#js-btn-next');

    new Slider(
      swiperContainerElem,
      { mx: 3, hg: 2, md: 1 },
      1,
      btnPrev,
      btnNext,
      null,
      20
    );
  }
}

new LastNews();
