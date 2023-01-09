import { createHTML } from '../../utils/createHTML';
import { createCartBlocks } from './blocks-body-cart';
import { fillCartPage as fillBlockOfProducts } from './pages-cart';
import { resetCart } from './resetCart';
import { getSummary } from './summary';

export const shoppingCartContainer = createHTML(
  'section',
  'shopping-cart_container',
);
document.querySelector('.main')?.append(shoppingCartContainer);

export class ShoppingCartContent {
  createNewPage(): void {
    createCartBlocks();
    getSummary();
  }

  render(): void {
    fillBlockOfProducts();
    getSummary();
  }

  getSummary(): void {
    getSummary();
  }

  reset(): void {
    resetCart();
  }
}

export const shoppingCartContent = new ShoppingCartContent();

document.querySelector('.shopping-cart__img')?.addEventListener('click', () => {
  window.location.href = '/dist/#shopping-cart';
  shoppingCartContent.render();
});
