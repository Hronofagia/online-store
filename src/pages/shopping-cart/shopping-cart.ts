import { createHTML } from '../../utils/createHTML';
import { createCartBlocks } from './blocks-body-cart';
import { getNumberCartPage, getArrProductsIdByPages } from './pages-cart';
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
    // this.render();
  }

  render(): void {
    getArrProductsIdByPages();
    getNumberCartPage();
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
