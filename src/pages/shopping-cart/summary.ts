import './shopping-cart.sass';
import { store } from '../../index';
import { currentlocalStorage } from '../../utils/localStorage';

export function getSummary(): void {
  let summaryPrice: number = 0;
  let summaryCount: number = 0;
  const contentlocalStorage = currentlocalStorage.getProducts();

  for (let i = 0; i < contentlocalStorage.length; i++) {
    const currantId = store.items.findIndex(
      (product) => Number(product.id) === contentlocalStorage[i],
    );
    summaryPrice += store.items[currantId].price;
    summaryCount += 1;
  }
  if (document.querySelector('.cart-block-total-count') !== null) {
    (
      document.querySelector('.cart-block-total-count') as HTMLElement
    ).innerHTML = `${summaryCount}`;
  }
  if (document.querySelector('.cart-block-total-price') !== null) {
    (
      document.querySelector('.cart-block-total-price') as HTMLElement
    ).innerHTML = `${summaryPrice}`;
  }

  (
    document.querySelector('.price__number') as HTMLElement
  ).innerHTML = `${summaryPrice}`;
  (
    document.querySelector('.count_header__title') as HTMLElement
  ).innerHTML = `${summaryCount}`;
}
