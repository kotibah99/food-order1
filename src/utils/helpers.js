export const NUMBER_FORMATER = (locale, number) => {
  return new Intl.NumberFormat(locale).format(number);
};

export const CURRENCY_FORMATER = (locale, amount) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EGP',
  }).format(amount);
};

export const DATE_FORMATER = (locale, dateString) => {
  const options = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const DISCOUNT_CALCULATOR = (amount, discount) => {
  const discountAmount = (amount * discount) / 100;
  const amountAfter = amount - discountAmount;
  return amountAfter.toFixed(2);
};
