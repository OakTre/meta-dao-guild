class Details {
  hostElem;

  constructor() {
    this.hostElem = document.querySelector('#details-host');
    if (!this.hostElem) return;
    this.converterValueInput = document.querySelector("#converter-value");
    this.converterResultInput = document.querySelector("#converter-result");

    this.converterValueInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/,/g, ".");
      const val = parseFloat(e.target.value);
      if (val > Number.MAX_SAFE_INTEGER || val < -Number.MAX_SAFE_INTEGER) {
        this.converterResultInput.value = "";
        return;
      }
      const coef = parseFloat(this.converterResultInput.dataset.coef) / parseFloat(e.target.dataset.coef);
      const newVal = val * coef;
      this.converterResultInput.value = newVal ?
        newVal
          .toFixed(6)
          .replace(/[,.]?0+$/, "")
          .replace(",", ".") :
        "";
    });

    this.converterResultInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/,/g, ".");
      const val = parseFloat(e.target.value);
      if (val > Number.MAX_SAFE_INTEGER || val < -Number.MAX_SAFE_INTEGER) {
        this.converterValueInput.value = "";
        return;
      }
      const coef = parseFloat(this.converterValueInput.dataset.coef) / parseFloat(e.target.dataset.coef);
      const newVal = val * coef;
      this.converterValueInput.value = newVal ?
        newVal
          .toFixed(6)
          .replace(/[,.]?0+$/, "")
          .replace(",", ".") :
        "";
    });
  }
}

new Details();
