import { addQueryParam } from '../../utils/utils';
import { shoppingCartContent } from './shopping-cart';

export function changeCountProductOnPage(event: Event): void {
  const selectElement = document.querySelector(
    '#select-count-on-page',
  ) as HTMLSelectElement;

  const countProductOnPage = Number(
    selectElement.options[selectElement?.selectedIndex].value,
  );
  addQueryParam('countProductOnPage', `${countProductOnPage}`);
  shoppingCartContent.render();
}
