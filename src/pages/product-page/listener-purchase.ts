import { currentlocalStorage } from '../../utils/localStorage';
import { modalWindow } from '../modal/modal';
import { createCartBlocks } from '../shopping-cart/blocks-body-cart';
import { fillCartPage } from '../shopping-cart/pages-cart';
import { shoppingCartContent } from '../shopping-cart/shopping-cart';
import { getSummary } from '../shopping-cart/summary';
import { createProductPageContent } from './create-body';

export function buyOnProductPage(event: Event): void {
  if ((event.target as HTMLElement).closest('.product-button-add') !== null) {
    const currantButton = (event.target as HTMLElement).closest(
      '.product-button-add',
    );
    const currantIdProduct = currantButton?.getAttribute('id');
    currentlocalStorage.pullProducts(Number(currantIdProduct));
    currantButton?.classList.toggle('active-button');
    currantButton?.classList.toggle('not-active-button');
    shoppingCartContent.getSummary();
  }

  if ((event.target as HTMLElement).closest('.product-button-buy') !== null) {
    const currantButton = (event.target as HTMLElement).closest(
      '.product-button-buy',
    );
    const currantIdProduct = currantButton?.getAttribute('id');
    if (!currentlocalStorage.getProducts().includes(Number(currantIdProduct))) {
      currentlocalStorage.pullProducts(Number(currantIdProduct));
    }
    shoppingCartContent.getSummary();
    modalWindow.render();
  }
}

export function checkCart(): void {
  const contentStorage = currentlocalStorage.getProducts();

  if (document.querySelector('.catalog_container') !== null) {
    document.querySelectorAll('.card_product__button_add').forEach((el) => {
      const idElement = Number((el as HTMLElement).getAttribute('id'));
      if (contentStorage.includes(idElement)) {
        el.classList.add('not-active-button');
        el.classList.remove('active-button');
      } else {
        el.classList.remove('not-active-button');
        el.classList.add('active-button');
      }
    });
  }
  if (document.querySelector('.product-page_container') !== null) {
    const el = document.querySelector('.product-button-add') as HTMLElement;
    const idElement = Number(el.getAttribute('id'));
    if (contentStorage.includes(idElement)) {
      el.classList.add('not-active-button');
      el.classList.remove('active-button');
    } else {
      el.classList.remove('not-active-button');
      el.classList.add('active-button');
    }
  }
}

window.addEventListener('hashchange', () => {
  const pathURL = document.location.href;
  const name = pathURL.split('#').slice(-1).join('/').split('/')[0];
  if (name === 'product-page') {
    createProductPageContent();
    checkCart();
  }
  if (name === 'shopping-cart') {
    createCartBlocks();
    fillCartPage();
    getSummary();
  }
});
