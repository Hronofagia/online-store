import { currentlocalStorage } from '../../utils/localStorage';

import { shoppingCartContent } from './shopping-cart';

export function listenerAddAndAbout(event: Event): void {
  if (
    (event.target as HTMLElement).closest('.card_product__button_add') !== null
  ) {
    const currantButton = (event.target as HTMLElement).closest(
      '.card_product__button_add',
    );
    const currantIdProduct = currantButton?.getAttribute('id');
    currentlocalStorage.pullProducts(Number(currantIdProduct));
    currantButton?.classList.toggle('active-button');
    shoppingCartContent.getSummary();
  }
  if (
    (event.target as HTMLElement).closest('.card_product__button_about') !==
    null
  ) {
    const currantId = String((event.target as HTMLElement).getAttribute('id'));
    window.location.href = `/#product-page/${currantId}`;
  }
}
