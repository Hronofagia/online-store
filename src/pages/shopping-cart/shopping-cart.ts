import { createHTML } from '../../utils/createHTML';
import { createCartBlocks } from './blocksOfCart';
import {
  getCurrantProductsOnPage,
  getArrProductsIdByPages,
} from './getPagesCart';

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
    getCurrantProductsOnPage();
  }
}

export const shoppingCartContent = new ShoppingCartContent();
