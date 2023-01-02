import { createProductCardsInCart } from './createProductCardsInCart';
import { currentlocalStorage } from '../../utils/localStorage';

const arrPages: number[][] = [];

export function getArrProductsIdByPages(): number[][] {
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

export function getCurrantProductsOnPage(): void {
  const currentPage =
    Number(document.querySelector('.cart-count-pages')?.innerHTML) - 1;

  createProductCardsInCart({ arrPages, currentPage });
}
