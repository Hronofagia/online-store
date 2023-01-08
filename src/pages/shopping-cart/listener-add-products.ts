import { currentlocalStorage } from '../../utils/localStorage';
import { createProductPageContent } from '../product-page/create-body';

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
  }
  if (
    (event.target as HTMLElement).closest('.card_product__button_about') !==
    null
  ) {
    const currantButton = (event.target as HTMLElement).closest(
      '.card_product__button_about',
    );
    const currantId = String(currantButton?.getAttribute('id'));
    window.location.href = '/dist/#product-page';

    createProductPageContent(currantId);
  }
}
