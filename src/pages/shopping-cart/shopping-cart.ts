import { createHTML } from '../../utils/createHTML';

export const shoppingCartContainer = createHTML(
  'section',
  'shopping-cart_container',
  'shopping cart',
);
document.querySelector('.main')?.append(shoppingCartContainer);
