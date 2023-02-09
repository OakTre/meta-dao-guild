import tippy from "tippy.js";

new class CopyBtn {
  constructor() {
    const btnsCopy = document.querySelectorAll('.js-copy-btn');

    btnsCopy.forEach(btnCopy => {
      const instance = tippy(btnCopy, {
        content: btnCopy.getAttribute('data-content')
      });

      instance.disable();

      btnCopy.onclick = () => {
        navigator.clipboard.writeText(btnCopy.value)
          .then(() => {
            instance.enable();
            instance.show();

            setTimeout(() => {
              instance.hide();
              instance.disable();
            }, 1000)
          })
      }
    })
  }
}
