import { currentlocalStorage } from '../../utils/localStorage';

export function resetCart(): void {
  (
    document.querySelector('.shopping-cart_container') as HTMLElement
  ).innerHTML = '';

  const contentLocalStorage = currentlocalStorage.getProducts();
  contentLocalStorage.forEach((item) => currentlocalStorage.pullProducts(item));
}
