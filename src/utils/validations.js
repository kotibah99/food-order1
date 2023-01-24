// import arabic from '../data/ar.json';
// import english from '../data/en.json';

const PHONE = /[0-9]+$/i;
const PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i;
const EMAIL = /^[a-zA-Z]+[-,_,.]?\w*[-,_,.]?@[a-zA-Z]+[.][a-zA-Z]{2,}$/i;

export const VALIDATE_PASSWORD = (password, min = 6, max = 100) => {
  if (!password) {
    return 'Required';
  }
  if (password.trim().length < min) {
    return `Password must be at least ${min} letters.`;
  }
  if (password.length > max) {
    return 'Password is too long.';
  }
  if (!PASSWORD.test(password)) {
    return 'Password must contains english letters and numbers only';
  }
};

export const RANGE_NUMBER = (num, min = 0, max = 999) => {
  if (!num) return 'Required';

  if (min > num || num > max) {
    return `Number must be in range [${min} - ${max}]`;
  }
};

export const VALIDATE_TEXT = (name, min = 3, max = 50) => {
  if (!name) {
    return 'Required';
  }

  const trimed_name = name.trim();
  if (trimed_name.length < min) {
    return `Name must be at least ${min} characters long.`;
  }
  if (trimed_name.length > max) {
    return 'Name is too long.';
  }
};

export const PHONE_NUMBER = (number, min = 6, max = 13) => {
  if (!PHONE.test(number)) return 'Invalid Input';
};

export const VALIDATE_EMAIL = email => {
  if (!email) {
    return 'Required';
  }
  if (!EMAIL.test(email)) {
    return 'Invalid email address';
  }
};
