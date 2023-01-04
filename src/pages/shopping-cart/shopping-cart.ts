import { createHTML } from '../../utils/createHTML';
import { createCartBlocks } from './blocksOfCart';
import { createProductCardsInCart } from './createProductCardsInCart';
import { getNumberCartPage, getArrProductsIdByPages } from './getPagesCart';
import { getSummary } from './summary';

export const shoppingCartContainer = createHTML(
  'section',
  'shopping-cart_container',
);
document.querySelector('.main')?.append(shoppingCartContainer);

export class ShoppingCartContent {
  createNewPage(): void {
    createCartBlocks();
    this.render();
  }

  render(): void {
    getArrProductsIdByPages();
    getNumberCartPage();
    getSummary();
  }

  getSummary(): void {
    getSummary();
  }
}

export const shoppingCartContent = new ShoppingCartContent();
