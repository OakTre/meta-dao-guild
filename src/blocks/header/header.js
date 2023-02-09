import { SideBar } from "../side-bar/side-bar";

export class Header {
  constructor() {
    const hostElem = document.querySelector('#header-host');
    if(!hostElem) return;

    const burgerBtn = hostElem.querySelector('#btn-burger');

    let isOpenSideBar = false;

    const sideBar = new SideBar(burgerBtn);

    burgerBtn.onclick = () => {
      if (isOpenSideBar) {
        sideBar.onCloseSideBar();
      } else {
        sideBar.onOpenSideBar();
      }
    };
  }
}

new Header();
