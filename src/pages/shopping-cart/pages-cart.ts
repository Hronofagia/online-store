import { createProductCardsInCart } from './create-product-cart';
import { currentlocalStorage } from '../../utils/localStorage';

export function fillCartPage(): void {
  const arrPages: number[][] = [];
  const selectElement = document.querySelector(
    '#select-count-on-page',
  ) as HTMLSelectElement;

  if (selectElement !== null) {
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
    getNumberCartPage(arrPages);
  }
}

export function getNumberCartPage(arrPages: number[][]): void {
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
