import Slider from "../../js/common/slider";

class Statistics {

  constructor() {
    const hostElemArr = [
      document.querySelector('#statistics-host-1'),
      document.querySelector('#statistics-host-2'),
    ];
    hostElemArr.forEach(elem => {
      this.onInit(elem);
    })
  }

  onInit(hostElem) {
    if (!hostElem) return;

    const swiperContainerElem = hostElem.querySelector('#js-swiper-container');
    const btnPrev = hostElem.querySelector('#js-btn-prev');
    const btnNext = hostElem.querySelector('#js-btn-next');
    const swiperPaginationElem = hostElem.querySelector('#js-pagination-slider');

    this.slider = new Slider(
      swiperContainerElem,
      { mx: 1 },
      1,
      btnPrev,
      btnNext,
      swiperPaginationElem,
      20,
      false,
      window.innerWidth > 768,
    );
  }
}

new Statistics();
