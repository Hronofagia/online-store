import { createProductCardsInCart } from './createProductCardsInCart';
import { currentlocalStorage } from '../../utils/localStorage';

let arrPages: number[][] = [];

export function getArrProductsIdByPages(): number[][] {
  arrPages = [];
  const selectElement = document.querySelector(
    '#select-count-on-page',
  ) as HTMLSelectElement;

  const countProductOnPage = Number(
    selectElement.options[selectElement?.selectedIndex].value,
  );
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
  return arrPages;
}

export function getNumberCartPage(): void {
  clearCartPage();

  let currentPage = Number(
    document.querySelector('.cart-count-pages')?.innerHTML,
  );
  if (currentPage > arrPages.length) {
    (
      document.querySelector('.cart-count-pages') as Element
    ).innerHTML = `${arrPages.length}`;
    currentPage = arrPages.length;
  }

  createProductCardsInCart({ arrPages, currentPage });
}

export function clearCartPage(): void {
  const AllProduct = document.querySelectorAll('.shopping-cart_product');
  AllProduct.forEach((product) => product.remove());
}
