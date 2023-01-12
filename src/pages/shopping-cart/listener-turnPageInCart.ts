import { shoppingCartContent } from './shopping-cart';
import { currentlocalStorage } from '../../utils/localStorage';
import { addQueryParam } from '../../utils/utils';

export function turnPageInCart(event: Event): void {
  const NumberPage = document.querySelector('.cart-count-pages');

  const selectElement = document.querySelector(
    '#select-count-on-page',
  ) as HTMLSelectElement;
  const countProductOnPage = Number(
    selectElement.options[selectElement?.selectedIndex].value,
  );

  const IdProducts = currentlocalStorage.getProducts();
  const countPage = Math.ceil(IdProducts.length / Number(countProductOnPage));

  if (
    (event.target as HTMLElement).closest('.cart-block-previous-page') !==
      null &&
    Number(NumberPage?.innerHTML) > 1
  ) {
    const currentPage = Number(NumberPage?.innerHTML) - 1;

    (
      document.querySelector('.cart-count-pages') as Element
    ).innerHTML = `${currentPage}`;

    addQueryParam('currantPage', `${currentPage}`);

    shoppingCartContent.render();
  }

  if (
    (event.target as HTMLElement).closest('.cart-block-next-page') !== null &&
    Number(NumberPage?.innerHTML) < countPage
  ) {
    const currentPage = Number(NumberPage?.innerHTML) + 1;
    (
      document.querySelector('.cart-count-pages') as Element
    ).innerHTML = `${currentPage}`;

    addQueryParam('currantPage', `${currentPage}`);

    shoppingCartContent.render();
  }
}
