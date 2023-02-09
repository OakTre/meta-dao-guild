import { ToggleShowContent } from "../../js/common/toggle-show-content";

import {emit} from "../../js/common/events";
import {debounce} from "../../js/utils/debounce";

const getData = (form) => {
  const formData = new FormData(form);

  const result = {};

  Array.from(formData).forEach((entry) => {
    const [name, value] = entry;
    const lowerCaseValue = value.toLowerCase();
    if (lowerCaseValue !== "yes" && lowerCaseValue !== "no") {
      if (!result[name]) {
        result[name] = value;
      } else {
        result[name] = result[name] + "," + value;
      }
    } else {
      result[name] = lowerCaseValue === "yes" ?
        true :
        lowerCaseValue === "no" ?
          false :
          undefined;
    }
  });

  return result;
};

class Filters {
  hostElem;

  constructor() {
    this.hostElem = document.querySelector('#filters-host');
    if (!this.hostElem) return;

    const toggleShowContainer = this.hostElem.querySelector('#toggle-show-container');
    new ToggleShowContent(toggleShowContainer, 24);

    const btnReset = this.hostElem.querySelector('#filter-btn-reset');
    const inputsArr = Array.from(this.hostElem.querySelectorAll('.js-checkbox'));

    this.onChange = debounce(() => {
      emit("gameFiltersChange", getData(this.formElem));
      if (inputsArr.some(item => item.checked)) {
        btnReset.classList.add('show');
      } else {
        btnReset.classList.remove('show');
      }
    }, 700, false);

    btnReset.addEventListener("click", () => {
      inputsArr.forEach(inputItem => {
        inputItem.checked = false;
        btnReset.classList.remove('show');
      });
      this.onChange();
    });

    this.formElem = this.hostElem.querySelector("[data-form]");
    this.formElem.addEventListener("change", (e) => {
      const checked = e.target.checked;
      if (checked && e.target.dataset.exclusive) {
        [...this.formElem.querySelectorAll(`input[name="${e.target.name}"]`)].forEach((input) => {
          input.checked = false;
        });
        e.target.checked = true;
      }
    });
    this.formElem.addEventListener("change", this.onChange);

    this.initResetForm();
    setTimeout(() => {
      this.onChange();
    }, 1);
  }

  initResetForm() {
    const btnReset = this.hostElem.querySelector('#filter-btn-reset');
    const inputsArr = Array.from(this.hostElem.querySelectorAll('.js-checkbox'));

    inputsArr.forEach(inputItem => {
      if (inputItem.checked) btnReset.classList.add("show");
      inputItem.onchange = () => {
        if (inputsArr.some(item => item.checked)) {
          btnReset.classList.add('show');
        } else {
          btnReset.classList.remove('show');
        }
      }
    });
  }
}

new Filters();
