import Slider from "../../js/common/slider";

export class SimilarGames {
  constructor() {
    const hostElem = document.querySelector('#similar-games-host');
    if (!hostElem) return;

    const swiperContainerElem = hostElem.querySelector('#js-swiper-container');
    const btnPrev = hostElem.querySelector('#js-btn-prev');
    const btnNext = hostElem.querySelector('#js-btn-next');

    new Slider(
      swiperContainerElem,
      { mx: 5, hg: 4, md: 2, mb: 1 },
      1,
      btnPrev,
      btnNext,
      null,
      20,
      true);
  }
}

new SimilarGames;
