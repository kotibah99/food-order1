// db pathes
export const PATH = Object.freeze({
  USER: 'api/client/user',
  CART: 'api/client/cart',
  ORDER: 'api/client/order',
  SEARCH: 'api/cp/Product/search',
  CATEGORY: 'api/client/category',
  PRODUCTS: 'api/client/Product',
  ADDRESS: 'api/client/deliveryaddress',
  FILE: 'https://www.rawaa.somee.com/api/file/',
});

export const SIZE_PRICE_MAPPER = Object.freeze({
  1: 'smallSizePrice',
  2: 'mediumSizePrice',
  3: 'bigSizePrice',
});

export const SCROLLBAR_STYLE = {
  '&::-webkit-scrollbar': {
    w: 2,
  },
  '&::-webkit-scrollbar-track': {
    w: 6,
    bg: 'gray.100',
    rounded: 'md',
  },
  '&::-webkit-scrollbar-thumb': {
    rounded: 'md',
    bg: 'gray.400',
  },
};
