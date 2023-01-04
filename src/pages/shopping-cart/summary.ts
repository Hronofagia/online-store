import './shopping-cart.sass';
import { store } from '../../index';
import { currentlocalStorage } from '../../utils/localStorage';

export function getSummary(): void {
  let summaryPrice: number = 0;
  let summaryCount: number = 0;
  const contentlocalStorage = currentlocalStorage.getProducts();

  for (let i = 0; i < contentlocalStorage.length; i++) {
    summaryPrice += store[contentlocalStorage[i]].price;
    summaryCount += 1;
  }
  (
    document.querySelector('.cart-block-total-count') as HTMLElement
  ).innerHTML = `${summaryCount}`;
  (
    document.querySelector('.cart-block-total-price') as HTMLElement
  ).innerHTML = `${summaryPrice}`;
  (
    document.querySelector('.price__number') as HTMLElement
  ).innerHTML = `${summaryPrice}`;
}
