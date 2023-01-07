import { currentlocalStorage } from '../../utils/localStorage';

export function addProductToCard(event: Event): void {
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
}
