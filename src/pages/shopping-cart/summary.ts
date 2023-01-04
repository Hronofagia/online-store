import './shopping-cart.sass';
import { store } from '../../index';
import { currentlocalStorage } from '../../utils/localStorage';

export function getSummary(): void {
  let summaryPrice: number = 0;
  let summaryCount: number = 0;
  const contentlocalStorage = currentlocalStorage.getProducts();

  for (let i = 0; i < contentlocalStorage.length; i++) {
    console.log(contentlocalStorage[i]);
    const currantId = store.findIndex(
      (product) => Number(product.id) === contentlocalStorage[i],
    );
    summaryPrice += store[currantId].price;
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
