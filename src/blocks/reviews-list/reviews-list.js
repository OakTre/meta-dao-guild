import Slider from "../../js/common/slider";
import {Modal} from "../../js/common/modal";

import axios from "axios";

const CARDS_IN_SLIDE = 5;
const GAP_CARDS = 20;
const GAP_CARDS_MOBILE = 16;
const CONTAINER_PADDING_BOTTOM = 50;
const CONTAINER_HEIGHT_DEFAULT = 1340;

class ReviewsList {
  slider;
  activeContent = null;
  ratingsContainerElems;
  ratingsWrapperElems;
  swiperContainerElem;
  swipeSlideElems;
  fixContentElems;
  btnsMore;
  btnsMoreContent;
  slidesGroups = [];
  changeHeightIsOpen;
  swiperContainerHeight;

  constructor() {
    const hostElem = document.querySelector('#reviews-list-host');
    this.hostElem = hostElem;
    if (!hostElem) return;

    this.ratingsContainerElems = Array.from(hostElem.querySelectorAll('.js-ratings-container'));
    const btnPrev = hostElem.querySelector('#js-btn-prev');
    const btnNext = hostElem.querySelector('#js-btn-next');
    this.ratingsWrapperElems = Array.from(hostElem.querySelectorAll('.js-ratings-wrapper'));
    this.btnsMore = Array.from(hostElem.querySelectorAll('.js-btn-more'));
    this.btnsMoreContent = Array.from(hostElem.querySelectorAll('.js-btn-more-content'));
    this.swiperContainerElem = hostElem.querySelector('#js-swiper-container');
    const swiperPaginationElem = hostElem.querySelector('#js-pagination-slider');
    this.swipeSlideElems = hostElem.querySelectorAll('.js-swiper-slide');
    this.fixContentElems = hostElem.querySelectorAll('.js-fix-content');

    this.btnsMore.forEach((btn, index) => {
      btn.onclick = () => {
        this.setActiveContent(index);
      }
    })

    this.slider = new Slider(
      this.swiperContainerElem,
      { mx: 1 },
      CARDS_IN_SLIDE,
      btnPrev,
      btnNext,
      swiperPaginationElem,
      20,
      false
    );

    this.slider.swiper.on("slideChangeTransitionStart", () => {
      this.swiperContainerElem.style.height = `${ CONTAINER_HEIGHT_DEFAULT }px`;
      if (this.activeContent) {
        this.onHideItem(this.ratingsContainerElems[this.activeContent]);
      }
      this.slidesGroups.forEach(groupItem => {
        groupItem[0].slide.style.height = `${groupItem[0].heightDefault}px`;
      })
    })

    this.setContainerHeight();
    this.setGroupSlides();

    this.initReviewModal();
  }

  reviewState = {}

  initReviewModal() {
    this.reviewModalElem = document.querySelector("[data-review-modal]");
    this.reviewModal = new Modal(this.reviewModalElem);

    this.reviewModalElem.addEventListener("click", (e) => {
      const starValue = e.target.dataset.starValue;
      const starName = e.target.dataset.starName;
      if (!starValue) return;
      this.reviewModalElem.querySelector(`[data-rating-progress="${starName}"]`)
        .style.width = (Number(starValue) * 140 / 5) + "px";
      this.reviewState[starName] = (starValue * 1) || 0;
    });

    this.hostElem.querySelector("[data-review-modal-open]")
      .addEventListener("click", () => {
        this.reviewModal.onOpenModal();
      });
    this.reviewModalElem.querySelector("[data-review-modal-close]")
      .addEventListener("click", () => {
        this.reviewModal.onCloseModal();
      });
    this.reviewModalElem.querySelector("[data-review-modal-cancel]")
      .addEventListener("click", () => {
        this.reviewModal.onCloseModal();
        this.resetReviewState();
      });

    this.reviewLengthCounterElem = this.reviewModalElem.querySelector("[data-review-length-counter]");
    this.reviewTextareaElem = this.reviewModalElem.querySelector("[data-review-text]")

    this.setReviewText(this.reviewTextareaElem.value || "");
    this.reviewTextareaElem.addEventListener("input", (e) => {
      const text = e.target.value;
      this.setReviewText(text);
    });

    this.reviewModalElem.querySelector("form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitReview();
      });

    this.reviewModalElem.querySelector("[data-curtain]")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });

    const reviewTextarea = this.reviewModalElem.querySelector("[data-review-text]");
    this.maxReviewLength = parseInt(reviewTextarea.dataset.maxLength.split(";")[0] || "600");
    this.reviewModalElem.querySelector("[data-review-length-counter]").innerText = reviewTextarea.value.length;
    this.reviewModalElem.querySelector("[data-review-length-limit]").innerText = "/" + this.maxReviewLength;
  }

  setReviewText(text) {
    this.reviewState.text = text;
    this.reviewLengthCounterElem.innerText = text.length;
    this.validateState();
  }

  submitReview() {
    this.reviewState.wasSubmitAttempted = true;
    const isValid = this.validateState();
    if (!isValid) return;
    const gameId = window.gameId || 0;
    const reviewData = {
      ...this.reviewState,
    };
    delete reviewData.wasSubmitAttempted;
    this.disableForm();

    const errorMessageElem = this.reviewModalElem.querySelector("[data-review-error-message]");

    axios.post(window.location.origin + `/api/games/${gameId}/review`, reviewData, {
      withCredentials: true,
    })
      .then(() => {
        setTimeout(() => {
          this.enableForm();
          this.reviewModal.onCloseModal();
          this.resetReviewState();
        }, 500);
      })
      .catch((res) => {
        console.log(res);
        setTimeout(() => {
          this.enableForm();
          this.setReviewError(errorMessageElem.dataset.networkError);
        }, 500);
      });
  }

  disableForm() {
    this.reviewModal.disableModal();
    this.reviewModalElem.querySelector("[data-curtain]")
      .classList.add("review-modal__curtain");
    this.reviewModalElem.querySelector("button[type='submit']")
      .classList.add("mod-loading");
  }

  enableForm() {
    this.reviewModal.enableModal();
    this.reviewModalElem.querySelector("[data-curtain]")
      .classList.remove("review-modal__curtain");
    this.reviewModalElem.querySelector("button[type='submit']")
      .classList.remove("mod-loading");
  }

  validateState() {
    const { text, wasSubmitAttempted } = this.reviewState;

    const textareaElem = this.reviewModalElem.querySelector("[data-review-text]");

    if (wasSubmitAttempted && (!text || text.length === 0)) {
      this.setReviewError(textareaElem.dataset.required || "This field is required");
      return false;
    }
    if (this.reviewState.text && this.reviewState.text.length > this.maxReviewLength) {
      this.setReviewError(textareaElem.dataset.maxLength.split(";")[1] || "Text is too long");
      return false;
    } else {
      this.clearReviewError();
      return true;
    }
  }

  clearReviewError() {
    this.reviewModalElem.classList.remove("mod-error");
    const errMsgElem = this.reviewModalElem.querySelector("[data-review-error-message]");
    errMsgElem.classList.add("mod-hide");
  }

  setReviewError(msg) {
    this.reviewModalElem.classList.add("mod-error");
    const errMsgElem = this.reviewModalElem.querySelector("[data-review-error-message]");
    errMsgElem.innerText = msg;
    errMsgElem.classList.remove("mod-hide");
  }

  resetReviewState() {
    this.reviewState = {};
    [...this.reviewModalElem.querySelectorAll("[data-rating-progress]")]
      .forEach((elem) => elem.style.width = "0px");
    this.reviewModalElem.querySelector("[data-review-text]").value = "";
    this.clearReviewError();
  }

  setActiveContent(indexCheck) {
    this.ratingsContainerElems.forEach((item, index) => {
      if (index === indexCheck) {
        if (this.btnsMore[index].classList.value.includes('mod-less')) {
          this.btnsMore[index].classList.remove('mod-less');
          this.activeContent = null;
          this.onHideItem(item);
        } else {
          this.btnsMore[index].classList.add('mod-less');
          this.activeContent = index;
          this.onShowItem(item, index);
        }
      } else {
        this.btnsMore[index].classList.remove('mod-less');
        this.onHideItem(item);
      }
    })

    if (this.activeContent !== null) {
      this.setContainerHeight(true);
      this.changeHeightNeighboringGroups(indexCheck, true);
    } else {
      setTimeout(() => {
        this.setContainerHeight(false);
        this.changeHeightNeighboringGroups(indexCheck, false);
      }, 400)
    }
  }

  onShowItem(item, index) {
    item.classList.remove('mod-hide');
    item.style.maxHeight = `${ this.ratingsWrapperElems[index].clientHeight }px`;
  }

  onHideItem(item) {
    item.classList.add('mod-hide');
    item.style.maxHeight = '0';
  }

  setContainerHeight(isOpen) {
    let gap = window.innerWidth < 768 ? GAP_CARDS_MOBILE : GAP_CARDS;
    if (this.activeContent) {
      if (isOpen) {
        this.changeHeightIsOpen = this.ratingsWrapperElems[this.activeContent].clientHeight;
        this.swiperContainerHeight = CONTAINER_HEIGHT_DEFAULT + this.changeHeightIsOpen + gap;
      } else {
        this.swiperContainerHeight = CONTAINER_HEIGHT_DEFAULT;
      }
    } else {
      this.swiperContainerHeight = CONTAINER_HEIGHT_DEFAULT;
    }
    this.swiperContainerElem.style.height = `${ this.swiperContainerHeight }px`;
    this.swiperContainerElem.style.paddingBottom = `${ CONTAINER_PADDING_BOTTOM }px`;
  }

  setGroupSlides() {
    const wrapperHeight = this.swiperContainerElem.clientHeight - CONTAINER_PADDING_BOTTOM;
    let newGroup = [];
    let slideHeight = 0;

    this.swipeSlideElems.forEach((slide, index) => {
      let gap = window.innerWidth < 768 ? GAP_CARDS_MOBILE : GAP_CARDS;
      slideHeight += slide.clientHeight + gap;
      if ((wrapperHeight - slideHeight) < 0) {
        this.slidesGroups.push(newGroup);
        newGroup = [];
        slideHeight = slide.clientHeight + gap;
      }
      newGroup.push({ index, slide, heightDefault: slide.clientHeight });

      if (index === this.swipeSlideElems.length - 1) {
        this.slidesGroups.push(newGroup);
      }
    })
  }

  changeHeightNeighboringGroups(indexCheck, isOpen) {
    // здесь небольшой костыль: при увеличении высоты в текущей группе слайдов,
    // мы на эту же высоту увеличиваем первые слайды соседних групп, чтобы слайдры не перегруппировывались

    this.slidesGroups.forEach(groupItem => {
      const isCurrentGroup = groupItem.find(item => item.index === indexCheck);
      const firstSlideWithGroup = groupItem[0].slide;
      if (!isCurrentGroup) {
        const firstSlideHeight = groupItem[0].heightDefault;
        if (isOpen) {
          firstSlideWithGroup.style.height = `${firstSlideHeight + this.changeHeightIsOpen}px`;
        } else {
          firstSlideWithGroup.style.height = `${firstSlideHeight}px`;
        }
      } else {
        firstSlideWithGroup.style.height = 'auto';
      }
    })
  }
}

new ReviewsList();
