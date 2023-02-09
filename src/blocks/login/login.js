import ready from "../../js/utils/documentReady";
import {getParent} from "../../js/common/getParent";
import {isValidEmail} from "../../js/common/validation";

ready(function() {
  const container = document.querySelector("#login");
  if (!container) return;

  const form = container.querySelector("form");
  let wasSubmitAttempted = false;

  const validate = () => {
    const formData = new FormData(form);
    let isValid = true;

    Array.from(formData).forEach(([name, value]) => {
      const input = form.querySelector(`input[name="${name}"]`);
      const inputContainer = getParent(input, "[data-input-container]", form);
      if ("required" in input.dataset && !value) {
        inputContainer?.classList.add("mod-error");
        inputContainer.querySelector("[data-input-error]")
          .innerText = input.dataset.required || "";
        isValid = false;
      } else if ("email" in input.dataset && !isValidEmail(value)) {
        inputContainer?.classList.add("mod-error");
        inputContainer.querySelector("[data-input-error]")
          .innerText = input.dataset.email || "";
        isValid = false;
      } else {
        inputContainer?.classList.remove("mod-error");
      }
    });

    return isValid;
  };

  form.addEventListener("input", () => {
    if (!wasSubmitAttempted) return;
    validate();
  });

  form.addEventListener("submit", (e) => {
    wasSubmitAttempted = true;
    if (!validate()) e.preventDefault();
  });
});
