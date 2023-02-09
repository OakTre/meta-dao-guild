export default () => {
  const countElements = Array.from(document.querySelectorAll('.js-length-count'));

  if (countElements.length === 0) return;

  countElements.forEach((elemnt) => {
    elemnt.addEventListener('keyup', (e) => {
      const length = e.target.value.length;
      const maxLengt = e.target.dataset.parsleyMaxlength;
      const parent = elemnt.closest('.gl-controls-count-wrapper');

      parent.setAttribute("data-count", `${length}/${maxLengt}`);
    });
  });
};
