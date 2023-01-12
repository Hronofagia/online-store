import { currentlocalStorage } from '../../utils/localStorage';
import { getQueryParam } from '../../utils/utils';
import { createProductListInCart } from './create-product-list';

export function fillCartPage(): void {
  const arrPages: number[][] = [];
  const selectElement = document.querySelector(
    '#select-count-on-page',
  ) as HTMLSelectElement;

  if (selectElement !== null) {
    let countProductOnPage = Number(
      selectElement.options[selectElement?.selectedIndex].value,
    );

    const countProductOnPagURL = getQueryParam('countProductOnPage');
    if (countProductOnPagURL !== null) {
      if (countProductOnPagURL === '3') {
        selectElement.options.selectedIndex = 0;
      }
      if (countProductOnPagURL === '5') {
        selectElement.options.selectedIndex = 1;
      }
      if (countProductOnPagURL === '10') {
        selectElement.options.selectedIndex = 2;
      }
      countProductOnPage = Number(countProductOnPagURL);
    }
    const IdProducts = currentlocalStorage.getProducts();
    const countPage = Math.ceil(IdProducts.length / countProductOnPage);
    for (let i = 0; i < countPage; i++) {
      let IdSet = [];
      IdSet = IdProducts.slice(
        i * countProductOnPage,
        i * countProductOnPage + countProductOnPage,
      );
      arrPages.push(IdSet);
    }
    getNumberCartPage(arrPages);
  }
}

export function getNumberCartPage(arrPages: number[][]): void {
  clearCartPage();

  let currentPage = Number(
    document.querySelector('.cart-count-pages')?.innerHTML,
  );

  const currentPageURL = getQueryParam('currantPage');
  if (currentPageURL !== null) {
    (
      document.querySelector('.cart-count-pages') as HTMLElement
    ).innerHTML = `${currentPageURL}`;
    currentPage = Number(currentPageURL);
  }

  if (currentPage > arrPages.length) {
    (
      document.querySelector('.cart-count-pages') as Element
    ).innerHTML = `${arrPages.length}`;
    currentPage = arrPages.length;
  }
  createProductListInCart({ arrPages, currentPage });
}

export function clearCartPage(): void {
  const AllProduct = document.querySelectorAll('.shopping-cart_product');
  AllProduct.forEach((product) => product.remove());
}
