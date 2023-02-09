import Slider from "../../js/common/slider";

import axios from "axios";

import {subscribe} from "../../js/common/events";

const GRID_WIDTH = 100;

const gameCount = 15;

const minWait = 500;

class GamesList {
  hostElem;

  constructor() {
    const hostElem = document.querySelector('#games-list');
    if (!hostElem) return;
    this.hostElem = hostElem;

    subscribe("gameFiltersChange", (payload) => {
      this.state.page = 1;
      this.state.filters = payload;
      this.setData("loading");
      this.fetchGames();
    });

    this.hostElem.innerHTML = `<div class="swiper gl-swiper swiper-container" data-swiper-container>
      <div class="games-list__swiper-wrapper gl-swiper__swiper-wrapper swiper-wrapper"></div>
      <div class="gl-swiper__pagination-wrapper">
        <button class="gl-swiper__pagination-btn-nav gl-swiper__pagination-btn-nav--prev swiper-button-disabled" data-btn-prev></button>
        <div class="reviews-list__swiper-pagination gl-swiper__pagination swiper-pagination" data-pagination-slider></div>
        <button class="gl-swiper__pagination-btn-nav gl-swiper__pagination-btn-nav--next" data-btn-next></button>
      </div>
    </div>`;

    const swiperContainerElem = this.hostElem.querySelector('[data-swiper-container]');
    const btnPrev = this.hostElem.querySelector('[data-btn-prev]');
    const btnNext = this.hostElem.querySelector('[data-btn-next]');
    const swiperPaginationElem = this.hostElem.querySelector('[data-pagination-slider]');

    this.slider = new Slider(
      swiperContainerElem,
      {mx: 1},
      1,
      btnPrev,
      btnNext,
      swiperPaginationElem,
      20,
      false,
      true
    );

    this.slider.swiper.on("slideChange", (e) => {
      this.state.page = e.activeIndex + 1;
      this.fetchGames();
    });
  }

  getCoordinates(paintsList) {
    let coordinates = "";

    const step = GRID_WIDTH / (paintsList.length - 1);
    let coordinateX = 0;

    paintsList.forEach(paintItem => {
      const coordinateY = 100 - paintItem * 5.75 / 100;
      coordinates = `${coordinates} ${coordinateX},${coordinateY}`;

      coordinateX += step;
    });

    return coordinates;
  }

  state = {
    page: 1,
    filters: {},
    /**
     * @type null | "loading" | "error" | (Object | "loading" | null)[]
     */
    data: null,
  }

  sync() {
    const {
      data,
    } = this.state;

    if (!data) {
      this.hostElem.innerHTML = "";
    } else if (data === "loading") {
      this.showLoader();
    } else if (data === "error") {
      this.showLoadingError();
    } else {
      const swiperContainer = this.hostElem.querySelector("[data-swiper-container]");
      if (swiperContainer) {
        let slideElems = this.slider.swiper.slides;
        if (data.length > slideElems.length) {
          this.slider.swiper.appendSlide(
            new Array(data.length - slideElems.length)
              .fill("<div class=\"swiper-slide js-swiper-slide\"></div>")
          );
        } else if (data.length < slideElems.length) {
          this.slider.swiper.removeSlide(
            new Array(slideElems.length - data.length).fill(0)
              .map((_, i) => i + data.length)
          );
        }
        slideElems = this.slider.swiper.slides;
        slideElems.forEach((slide, index) => {
          const item = data[index];
          if (typeof item === "object" && item !== null) {
            if (index === this.slider.swiper.activeIndex) {
              slide.innerHTML = `<div class="gl-page-content">
                <table class="games-list__table">
                  <thead class="games-list__thead">
                    <tr class="games-list__cell">
                      <th class="games-list__title">№</th>
                      <th class="games-list__title">Name</th>
                      <th class="games-list__title games-list__title--right">Genre</th>
                      <th class="games-list__title">Blockchain</th>
                      <th class="games-list__title">Device</th>
                      <th class="games-list__title">Status</th>
                      <th class="games-list__title">F2P</th>
                      <th class="games-list__title">P2E</th>
                      <th class="games-list__title">Social 24h</th>
                      <th class="games-list__title">Social 7 days</th>
                    </tr>
                  </thead>
                  <tbody class="games-list__tbody">
                    ${
                      item.items.map((game, i) => {
                        return renderGame(game, (i + 1) + gameCount * index);
                      }).join("")
                    }
                  </tbody>
                </table>
              </div>`;
              const svgElems = this.hostElem.querySelectorAll('.js-svg-chart');
              svgElems.forEach(svgElem => {
                const dotsArr = JSON.parse(svgElem.getAttribute('data-dots'));
                const polylineElem = svgElem.querySelector('.js-polyline');
                polylineElem.setAttribute('points', this.getCoordinates(dotsArr));
              });
            }
          } else if (item === "loading") {
            const loaderLayer = document.createElement("div");
            slide.innerHTML = "";
            if (!slide.querySelector("table")) {
              loaderLayer.className = "games-list__loader-container";
            } else {
              loaderLayer.className = "games-list__loader-layer";
            }
            loaderLayer.innerHTML = "<span class='loader' style='font-size: 3em;'/>";
            slide.appendChild(loaderLayer);
          } else {
            slide.innerHTML = "";
          }
        });
      }
    }
  }

  setData(newData) {
    this.state.data = newData;
    this.sync();
  }

  fetchGames() {
    const {
      filters,
      page,
      data,
    } = this.state;
    const params = new URLSearchParams(filters);
    params.append("page", page + "");
    params.append("count", gameCount + "");

    if (!data || data === "error") {
      this.setData("loading");
    } else if (Array.isArray(data)) {
      const newData = [...data];
      newData[page - 1] = "loading";
      this.setData(newData);
    }

    const token = Math.random();
    this.token = token;

    const requestTime = new Date().getTime();

    axios.get(`${window.location.origin}/api/games?${params}`)
      .then((response) => {
        // success
        if (token !== this.token) return;

        const responseTime = new Date().getTime() - requestTime;
        let timeout = 0;
        if (responseTime < minWait) timeout = minWait - responseTime;

        setTimeout(() => {
          const prevData = Array.isArray(data) ? data : [];
          const newData = new Array(response.data.totalPages).fill(null).map((_, i) => prevData[i] || null);
          newData[page - 1] = response.data;
          this.setData(newData);
        }, timeout);
      })
      .catch((error) => {
        // failure
        if (token !== this.token) return;

        const responseTime = new Date().getTime() - requestTime;
        let timeout = 0;
        if (responseTime < minWait) timeout = minWait - responseTime;

        setTimeout(() => {
          console.log(error);
          this.setData("error");
        }, timeout);
      });
  }

  showLoader() {
    this.slider.swiper.removeAllSlides();
    this.slider.swiper.appendSlide(
      `<div class="swiper-slide js-swiper-slide">
        <div class="gl-page-content">
          <div class='games-list__loader-container'><span class='loader' style='font-size: 3em;'/></div>
        </div>
      </div>`
    );
  }

  showLoadingError() {
    this.slider.swiper.removeAllSlides();
    this.slider.swiper.appendSlide(
      `<div class="swiper-slide js-swiper-slide">
        <div class="gl-page-content">
          <div class='games-list__loader-container'>
            <div>
              <p>Error loading games</p>
              <button class="games-list__try-again-btn" data-try-again-btn>Try again</button>
            </div>
          </div>
        </div>
      </div>`
    );
    setTimeout(() => {
      this.slider.swiper.slides[0].querySelector("[data-try-again-btn]").addEventListener("click", () => {
        this.fetchGames();
      });
    }, 1);
  }
}

window.gamesList = new GamesList();

const renderGame = (game, index) => {
  return `<tr class="games-list__row">
  <td class="games-list__cell">${index}</td>
  <td class="games-list__cell">
    <div class="games-list__cell-content-flex games-list__cell-content-flex--left">
      <picture>
        <source srcset="${game.img}">
        <img class="games-list__cell-name-img" src="${game.img}" alt="image" loading="lazy" width="54" height="54">
      </picture>
      <div class="games-list__cell-text-big">${game.name}</div>
    </div>
  </td>
  <td class="games-list__cell">
    ${game.genre.map((genre) => `<div class="games-list__cell-text-right">${genre}</div>`).join("")}
  </td>
  <td class="games-list__cell">
    <div class="games-list__cell-content-flex">
      ${game.blockchain.map((bc) => `<img
          alt=""
          class="games-list__cell-img-big"
          loading="lazy"
          src="img/blockchain/${bc}.svg"
          width="30"
          height="30"
        />`).join("")}
    </div>
  </td>
  <td class="games-list__cell">
    <div class="games-list__cell-content-flex">
      ${game.device.map((device) => `<img
          alt=""
          class="games-list__cell-img-small"
          loading="lazy"
          src="img/devices/${device}.svg"
          width="24"
          height="24"
        />`).join("")}
    </div>
  </td>
  <td class="games-list__cell ${getStatusClass(game.status)}">
    ${game.status}
  </td>
  <td class="games-list__cell">
    ${game.f2p}
  </td>
  <td class="games-list__cell">
    ${game.p2e.map((value) => `<div>${value}</div>`).join("")}
  </td>
  <td class="games-list__cell">
    <div>${game.social24h.users} ${getUsersWord(game.social24h.users)}</div>
    <div class="${getSocialClass(game.social24h.percent)} games-list__cell-text">
      ${game.social24h.percent >= 0 ? "+" : ""}${game.social24h.percent}%
    </div>
  </td>
  <td class="games-list__cell">
    <div class="games-list__svg-wrapper">
      <svg class="js-svg-chart games-list__svg-chart" data-dots="[${game.days.join(',')}]">
        <polyline
          class="js-polyline games-list__polyline-chart"
          fill="none"
          stroke="${game.social24h.percent >= 0 ? "var(--green-color)" : "var(--red-color)"}"
          stroke-width="2"
         ></polyline>
      </svg>
    </div>
  </td>
  </tr>`;
};

const getStatusClass = (_status) => {
  const status = _status.toLowerCase();
  if (status === "live") return "games-list__cell-green";
  if (status === "dev.") return "games-list__cell--blue";
  if (status === "dev") return "games-list__cell--blue";
  if (status === "presale") return "games-list__cell--orange";
  return "";
};

const getSocialClass = (percent) => {
  if (percent > 0) {
    return "games-list__cell-text--green";
  } else if (percent < 0) {
    return "games-list__cell-text--red";
  } else {
    return "";
  }
};

const getUsersWord = (number) => {
  return number === 1 ? "user" : "users";
};
