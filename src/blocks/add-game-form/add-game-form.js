/* eslint-disable no-unused-vars */
import $ from 'jquery';
import 'parsleyjs';
import fileUpload from '../../js/common/fileUplolad';
import ready from '../../js/utils/documentReady';
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';

import axios from "axios";
import countLength from '../../js/utils/countLength';

ready(() => {
  countLength();
  fileUpload();

  const gameForm = document.querySelector('.add-game-form');
  const inpuDate = document.querySelector('.js-date-inpt');
  const stepsContainers = Array.from(document.querySelectorAll('.game-form-step'));
  const headings = Array.from(document.querySelectorAll('.js-heading-form'));
  const navBtns = Array.from(document.querySelectorAll('.js-step-btn'));
  const nextBtn = document.querySelector(".js-next-btn");
  const prevBtn = document.querySelector(".js-prev-btn");
  const btnSumbit = document.querySelector('.js-sumbit-btn');
  let currentStep = 0;
  // для дев разработки
  // const inptCurrentStep = document.querySelector('.js-current-step').value;
  const genreChecks = Array.from(document.querySelectorAll('.js-check-genre'));
  const blockchainChecks = Array.from(document.querySelectorAll('.js-check-blockchain'));
  const deviceChecks = Array.from(document.querySelectorAll('.js-check-device'));
  const form = document.querySelector('.js-add-game-form');
  const successModal = document.querySelector('.js-succes-modal');
  const errorModal = document.querySelector('.js-error-modal');
  const modalCloseBtns = document.querySelectorAll('.js-close-modal');

  if (!gameForm) return;

  new AirDatepicker('.js-date-inpt', {
    inline: true,
    locale: localeEn,
    dateFormat: 'dd.MM.yy',
    minDate: new Date(),
    autoClose: true,
    onSelect ({date, formattedDate, datepicker}) {
      datepicker.$el.closest('.game-form__input').classList.remove('is-calendar-active');
    },
  })

  inpuDate.addEventListener('click', () => {
    inpuDate.closest('.game-form__input').classList.add("is-calendar-active");
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.game-form__input')) {
      inpuDate.closest('.game-form__input').classList.remove("is-calendar-active");
    }
  });

  const setCurrentStep = (num) => {
    stepsContainers.forEach(step => step.classList.remove('is-visible'));
    stepsContainers[Number(num)].classList.add('is-visible');
  };

  const setCurrentHeading = (num) => {
    headings.forEach(step => step.classList.remove('is-visible'));
    headings[Number(num)].classList.add('is-visible');
  };

  const setCurrentNavBtn = (num) => {
    if (Number(num) === 0) {
      navBtns[num + 1].classList.remove('is-filled');
    } else {
      const filledNumbers = Array.from(document.querySelectorAll('.js-step-btn.is-filled'))

      if (Number(num) < filledNumbers.length) {
        filledNumbers[num + 1].classList.remove('is-filled');
      } else {
        navBtns[Number(num)].classList.add('is-filled');
      }
    }
  };

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      btn.closest('.game-form-modal').classList.remove('is-active');
    });
  });

  const setGroupValidation = (num) => {
    nextBtn.setAttribute("data-current-group", navBtns[Number(num)].dataset.stepLabel);
  }

  // для дев разработки
  // if (inptCurrentStep) {
    // currentStep = inptCurrentStep
    // setCurrentStep(inptCurrentStep);
    // setCurrentNavBtn(inptCurrentStep);
    // setCurrentHeading(inptCurrentStep);
    // setGroupValidation(inptCurrentStep)
  // }

  nextBtn.addEventListener('click', (btn) => {
    const isValidate = $('.js-add-game-form').parsley({
      errorsContainer: function (field) {
        return field.$element.closest('.js-validate-container');
      },
    }).validate({ group: btn.target.dataset.currentGroup })

    if (isValidate) {
      currentStep++;
      // console.log('next', currentStep);

      if (currentStep === stepsContainers.length - 1) {
        currentStep = stepsContainers.length - 1

        // console.log('lsat', currentStep);

        nextBtn.classList.add("is-hidden");
        btnSumbit.classList.add('is-active');
      } else {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.remove("is-hidden");
        btnSumbit.classList.remove('is-active');
      }
      setCurrentStep(currentStep);
      setCurrentHeading(currentStep);
      setCurrentNavBtn(currentStep);

      btn.target.setAttribute("data-current-group", navBtns[currentStep].dataset.stepLabel);
    }
  });

  prevBtn.addEventListener('click', () => {
    currentStep--;

    // console.log('prev', currentStep);

    if (currentStep <= 0) {
      currentStep = 0
      prevBtn.classList.add("is-hidden");

      // console.log('first', currentStep);
    } else {
      nextBtn.classList.remove("is-hidden");
      prevBtn.classList.remove("is-hidden");
      btnSumbit.classList.remove('is-active');
    }

    nextBtn.setAttribute("data-current-group", navBtns[currentStep].dataset.stepLabel);

    setCurrentStep(currentStep);
    setCurrentNavBtn(currentStep);
    setCurrentHeading(currentStep);
  });




  const checkValidation = (group) => {
    let checks = 0;
    let valuesArray = [];

    group.forEach((check) => {
      check.addEventListener('change', (inpt) => {
        const genreRealInpt = inpt.target.closest('.game-form-step').querySelector('.js-real-inpt');

        if (inpt.target.checked && checks !== 3) {
          checks++;
          if (checks === 3) {
            genreChecks.forEach(ch => {
              if (!ch.checked) {
                ch.closest(".gl-checkbox-arrow").classList.add("is-disabled")
              }
            });
          }
          valuesArray.push(inpt.target.value)
          genreRealInpt.value = valuesArray.join(',')
        } else {
          valuesArray = valuesArray.filter(v => v !== inpt.target.value)
          genreRealInpt.value = valuesArray.join(',');
          checks--;
          genreChecks.forEach(ch => ch.closest(".gl-checkbox-arrow").classList.remove("is-disabled"));
        }
      });
    });
  };

  checkValidation(genreChecks);
  checkValidation(blockchainChecks);
  checkValidation(deviceChecks);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    if ($(form).parsley().isValid()) {
      axios.post(`${window.location.origin}/api/add-game`, formData)
        .then((response) => {
          console.log(response);

          successModal.classList.add("is-active");

          $(form).trigger("reset");

          navBtns.forEach((btn, i) => {
            if (i !== 0) {
              btn.classList.remove('is-filled');
            }
          });

          currentStep = 0
          setCurrentStep(currentStep);
          setCurrentNavBtn(currentStep);
          setCurrentHeading(currentStep);
          setGroupValidation(currentStep)
        })
        .catch((error) => {
          console.log(error.message);

          errorModal.classList.add("is-active");
        });
    }
  });
});
