import { currentlocalStorage } from '../../utils/localStorage';
import { modalWindow } from '../modal/modal';
import { shoppingCartContent } from '../shopping-cart/shopping-cart';
import { createProductPageContent } from './create-body';

export function buyOnProductPage(event: Event): void {
  if ((event.target as HTMLElement).closest('.product-button-add') !== null) {
    const currantButton = (event.target as HTMLElement).closest(
      '.product-button-add',
    );
    const currantIdProduct = currantButton?.getAttribute('id');
    currentlocalStorage.pullProducts(Number(currantIdProduct));
    currantButton?.classList.toggle('active-button');
    shoppingCartContent.getSummary();
  }

  if ((event.target as HTMLElement).closest('.product-button-buy') !== null) {
    window.location.href = '/dist/#shopping-cart';
    const currantButton = (event.target as HTMLElement).closest(
      '.product-button-buy',
    );
    const currantIdProduct = currantButton?.getAttribute('id');
    if (!currentlocalStorage.getProducts().includes(Number(currantIdProduct))) {
      currentlocalStorage.pullProducts(Number(currantIdProduct));
    }
    shoppingCartContent.render();
    modalWindow.render();
  }
}

window.addEventListener('hashchange', () => {
  const pathURL = document.location.href;
  const name = pathURL.split('/').slice(-2, -1).join('/');
  if (name === '#product-page') {
    createProductPageContent();
  }
});
