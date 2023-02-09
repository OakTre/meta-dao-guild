export class SideBar {
  isOpenSideBar = false;
  burgerBtn;
  bodyElem;
  sideBarElem;

  constructor(burgerBtn) {
    this.burgerBtn = burgerBtn;
    this.bodyElem = document.querySelector('body');
    this.sideBarElem = document.querySelector('#side-bar');
    const closeBtn = document.querySelector('#side-bar-close-btn');
    closeBtn.onclick = () => {
      this.onCloseSideBar();
    }
  }

  onOpenSideBar() {
    this.burgerBtn.classList.add('mod-close');
    this.sideBarElem.classList.add('mod-show');
    this.bodyElem.classList.add('mod-no-scroll');
    const simplebar = document.querySelector('.simplebar-track.simplebar-vertical');
    if (simplebar) {
      simplebar.classList.add("mod-hide");
    }
  }

  onCloseSideBar() {
    this.burgerBtn.classList.remove('mod-close');
    this.sideBarElem.classList.remove('mod-show');
    this.isOpenSideBar = false;
    this.bodyElem.classList.remove('mod-no-scroll');
    const simplebar = document.querySelector('.simplebar-track.simplebar-vertical');
    if (simplebar) {
      simplebar.classList.remove("mod-hide");
    }
  }
}
