import SlimSelect from "slim-select";

export class LangSelect {
  constructor() {
    const selectsArr = document.querySelectorAll('#slim-select');
    if (!selectsArr) return;

    selectsArr.forEach(selectItem => {
      const optionElems = selectItem.querySelectorAll('.js-option');
      const slimSelectData = [];
      optionElems.forEach(option => {
        slimSelectData.push({
          // innerHTML: `<a href="/${option.getAttribute('data-href')}">${option.innerText}</a>`,
          text: option.innerText,
          value: option.value
        })
      })
      new SlimSelect({
        select: selectItem,
        closeOnSelect: false,
        data: slimSelectData
      })
    });
  }
}

new LangSelect();
