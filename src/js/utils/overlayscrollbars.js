import { OverlayScrollbars } from 'overlayscrollbars';

const overlayscrollbarsElems = document.querySelectorAll('.overlayscrollbars');

overlayscrollbarsElems.forEach(elem => {
  const isBody = elem.classList.contains("gl-layout-container");
  const instance = OverlayScrollbars(elem, {
    clickScroll: true,
    overflow: {
      x: "hidden",
    }
  });
  if (isBody) {
    window.scrollbar = instance;
  }
})
