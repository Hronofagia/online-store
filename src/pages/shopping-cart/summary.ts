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
  const cartBlockCount = document.querySelector('.cart-block-total-count');
  const cartBlockCountTotalPrice = document.querySelector(
    '.cart-block-total-price',
  );
  const priceNumber = document.querySelector('.price__number');
  if (cartBlockCount !== null) cartBlockCount.innerHTML = `${summaryCount}`;
  if (cartBlockCountTotalPrice !== null)
    cartBlockCountTotalPrice.innerHTML = `${summaryPrice}`;
  if (priceNumber !== null) priceNumber.innerHTML = `${summaryPrice}`;
}
