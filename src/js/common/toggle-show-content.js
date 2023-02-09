/**
 * @param {HTMLElement} toggleShowContainer - обертка для блока с переключением скртыь/показать контент
 * внтури этого блока должны быть блоки с классами:
 * .js-toggle-show-btn - кнопка, которая скрывает/раскрывает контент
 * .js-toggle-show-container - верхняя обертка для переключаемого контента
 * .js-toggle-show-wrapper - непосредственная обертка контента
 * */
export class ToggleShowContent {
  formContainerElem;
  formWrapperElem;
  btnFilterHide;
  isHideFilter = false;
  marginTop;

  constructor(toggleShowContainer, marginTop) {
    this.btnFilterHide = toggleShowContainer.querySelector('.js-toggle-show-btn');
    this.isHideFilter = this.btnFilterHide.classList.value.includes('mod-hide');
    this.formContainerElem = toggleShowContainer.querySelector('.js-toggle-show-container');
    this.formWrapperElem = toggleShowContainer.querySelector('.js-toggle-show-wrapper');
    this.marginTop = marginTop;

    setTimeout(() => {
      this.filterSetHeight();
    })

    this.initFilterHide();

    let timeout;
    window.addEventListener('resize', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.filterSetHeight(this.isHideFilter);
      }, 300)
    })
  }

  initFilterHide() {
    this.btnFilterHide.onclick = () => {
      this.isHideFilter = !this.isHideFilter;
      if (this.isHideFilter) {
        this.btnFilterHide.classList.add('mod-hide');
      } else {
        this.btnFilterHide.classList.remove('mod-hide');
      }
      this.filterSetHeight();
    }
  }

  filterSetHeight() {
    if (this.isHideFilter) {
      this.formContainerElem.style.maxHeight = 0;
      this.formContainerElem.style.marginTop = 0;
    } else {
      this.formContainerElem.style.maxHeight = `${ this.formWrapperElem.clientHeight }px`;
      this.formContainerElem.style.marginTop = `${this.marginTop}px`;
    }
  }
}
