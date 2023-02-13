import { OverlayScrollbars } from 'overlayscrollbars';

const overlayscrollbarsElems = document.querySelectorAll('.overlayscrollbars');

overlayscrollbarsElems.forEach(elem => {
  const isBody = elem.classList.contains("gl-layout-container");
  const instance = OverlayScrollbars(elem, {
    clickScroll: true,
    update: {
      debounce: [0, 189],
    },
    overflow: {
      x: "hidden",
    },
  });
  if (isBody) {
    window.scrollbar = instance;
  }
})
