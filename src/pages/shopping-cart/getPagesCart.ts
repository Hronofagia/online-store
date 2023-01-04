import { createProductCardsInCart } from './createProductCardsInCart';
import { currentlocalStorage } from '../../utils/localStorage';

let arrPages: number[][] = [];

export function getArrProductsIdByPages(): number[][] {
  arrPages = [];
  const ProductOnPage = document.querySelector(
    '.cart-block-title-count',
  )?.innerHTML;
  const countProductOnPage = Number(ProductOnPage);
  const IdProducts = currentlocalStorage.getProducts();
  const countPage = Math.ceil(IdProducts.length / Number(countProductOnPage));
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
  const currentPage = Number(
    document.querySelector('.cart-count-pages')?.innerHTML,
  );

  createProductCardsInCart({ arrPages, currentPage });
}

export function clearCartPage(): void {
  const AllProduct = document.querySelectorAll('.shopping-cart_product');
  AllProduct.forEach((product) => product.remove());
}
