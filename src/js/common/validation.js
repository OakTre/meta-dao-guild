/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
import 'parsleyjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
require('dayjs/locale/en')

dayjs.extend(customParseFormat);
dayjs.locale('en')


window.Parsley.addValidator('requiredIfChecked', {
  requirementType: 'string',
  validateString: (value, requirement) => {
    const checkbox = document.querySelector(requirement);

    if (!checkbox) {
      return false;
    }

    if (checkbox.checked && !value.trim()) {
      return false;
    }
    return true;
  },
  messages: {
    en: 'Required field',
    ru: 'Обязательное поле',
  },
  priority: 33,
});

window.Parsley.addValidator('fio', {
  requirementType: 'string',
  validateString: (value) => {
    if (value.trim() === '') return true;
    return /^[a-яA-Я\s]+$/.test(value);
  },
  messages: {
    en: 'This value should be a mobile number',
    ru: 'Заполните ФИО',
  },
});

window.Parsley.addValidator('phone', {
  requirementType: 'string',
  validateString: (value) => {
    if (value.trim() === '') return true;
    return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(value);
  },
  messages: {
    en: 'This value should be a mobile number',
    ru: 'Неверный номер моб. телефона',
  },
});

window.Parsley.addValidator('date', {
  requirementType: 'string',
  validateString: (value) => {
    if (value.trim() === '') return true;
    console.log(value);
    return dayjs(value, 'DD.MM.YY', true).isValid();
  },
  messages: {
    en: 'Enter correct date',
    ru: 'Введите правильно дату',
  },
});

window.Parsley.addValidator('maxFileSize', {
  validateString: function(_value, maxSize, parsleyInstance) {
    if (!window.FormData) {
      console.log('Please, Upgrade your browser');
      return true;
    }

    let files = parsleyInstance.$element[0].files;

    console.log(files);

    return files.length != 1  || files[0].size <= maxSize * 1024 * 1024;
  },
  requirementType: 'integer',
  messages: {
    en: 'The file size should not exceed %s MB',
    ru: 'Размер файла не должен превышать %s МБ',
  }
});


window.Parsley.addValidator('fileTypePng', {
  validateString: function(_value, maxSize, parsleyInstance) {
    const types = ["png"]

    let files = parsleyInstance.$element[0].files;
    let uploadedFileType = files[0].name.match(/\w+$/gi)[0];

    const filtederType = types.includes(uploadedFileType);

    return filtederType;
  },
  requirementType: 'integer',
  messages: {
    en: 'Valid file format is png',
    ru: 'Допустимый формат файлов png',
  }
});

window.Parsley.addValidator('fileTypeImages', {
  validateString: function(_value, maxSize, parsleyInstance) {
    const types = ["png", "jpg", "jpeg"]

    let files = parsleyInstance.$element[0].files;

    for (let i = 0; i < files.length; i++) {
      let uploadedFileType = files[i].name.match(/\w+$/gi)[0];

      const filtederType = types.includes(uploadedFileType);

      return filtederType;
    }
  },
  requirementType: 'string',
  messages: {
    en: 'Valid file format is png, jpg, jpeg',
    ru: 'Допустимый формат файлов png, jpg, jpeg',
  }
});

window.Parsley.addValidator('multipleOf', {
  validateString: function(_value, maxSize, parsleyInstance) {
    let files = parsleyInstance.$element[0].files;

    return files.length >= 4 && files.length <= 10;
  },
  requirementType: 'string',
  messages: {
    en: 'The number of files must be between 4 and 10'
  }
});


Parsley.addMessages('ru', {
  defaultMessage: 'Некорректное значение.',
  type: {
    email: 'Неверный email',
    url: 'Адрес сайта введен неверно.',
    number: 'Введите число.',
    integer: 'Введите целое число.',
    digits: 'Введите только цифры.',
    alphanum: 'Введите буквенно-цифровое значение.',
  },
  notblank: 'Это поле должно быть заполнено.',
  required: 'Обязательное поле',
  pattern: 'Некорректное значение',
  min: 'Это значение должно быть не менее чем %s.',
  max: 'Это значение должно быть не более чем %s.',
  range: 'Это значение должно быть от %s до %s.',
  minlength: 'Это значение должно содержать не менее %s символов.',
  maxlength: 'Это значение должно содержать не более %s символов.',
  length: 'Это значение должно содержать от %s до %s символов.',
  mincheck: 'Выберите не менее %s значений.',
  maxcheck: 'Выберите не более %s значений.',
  check: 'Выберите от %s до %s значений.',
  equalto: 'Несовпадающие пароли',
});

Parsley.setLocale('en');

export const isValidEmail = (value) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

export const isValidPhone = (_value) => {
  const value = _value.replace(/ +/g, "");
  return /^\+?\d{4,}$/.test(value);
};

export const isValidPositiveNumber = (_value) => {
  const value = _value.replace(/ +/g, "").replace(",", ".");
  return /^\+?\d+(\.\d*)?$/.test(value);
};
