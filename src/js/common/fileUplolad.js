export default function fileUpload() {
  const elements = Array.from(document.querySelectorAll('.js-file-upload'));

  if (elements.length === 0) return;

  elements.forEach((element) => {
    const input = element.querySelector('input[type="file"]');
    const label = element.querySelector('.js-file-upload-text');
    const text = label.dataset.text;
    const multipleFilesContainer = input.closest('.game-form-step').querySelector('.game-form__files-container');

    input.addEventListener('change', () => {
      if (input.hasAttribute('multiple')) {
        multipleFilesContainer.innerHTML = "";

        for (let i = 0; i < input.files.length; i++) {
          let layout = `
              <span class="gl-input-file__text gl-input-file__text--bg is-active">
                ${input.files[i].name}
              </span>
            `;
          multipleFilesContainer.innerHTML += layout
        }

        multipleFilesContainer.classList.add('is-active');
      } else {
        if (input.files.length) {
          label.textContent = input.files[0].name;
          label.classList.add("is-active");
        } else {
          console.log(label);
          label.innerHTML = text;
          label.classList.remove("is-active");
        }
      }
    });

    label.addEventListener("click", () => {
      input.value = "";
      label.innerHTML = text;
      label.classList.remove("is-active");
    });
  });
}
