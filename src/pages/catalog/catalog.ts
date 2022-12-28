import { store } from '../..';
import { createHTML } from '../../utils/createHTML';
import './catalog.sass';

export const catalogContainer = createHTML('section', 'catalog_container');
document.querySelector('.main')?.append(catalogContainer);

const topPanel = createHTML('div', 'top_panel');
catalogContainer.append(topPanel);
const mainContainer = createHTML('div', 'main_container');
catalogContainer.append(mainContainer);
const catalogList = createHTML('div', 'catalog_list');
mainContainer.append(catalogList);
const filtersContainer = createHTML('div', 'filters_container');
mainContainer.append(filtersContainer);

export const showCards: () => void = () => {
  store.forEach((el) => {
    const cardProduct = createHTML('div', 'card_product');
    catalogList.append(cardProduct);
    const cardProductImage = createHTML('div', 'card_product__image');
    cardProductImage.style.backgroundImage = `url("${el.thumbnail}")`;
    cardProduct.append(cardProductImage);
    const cardProductName = createHTML('p', 'card_product__name', el.title);
    cardProduct.append(cardProductName);
    const cardProductButtonContainer = createHTML(
      'div',
      'card_product__button_container',
    );
    cardProduct.append(cardProductButtonContainer);
    const cardProductButtonAbout = createHTML(
      'button',
      'card_product__button_about',
      'about',
      el.id,
    );
    cardProductButtonContainer.append(cardProductButtonAbout);
    const cardProductButtonAdd = createHTML(
      'button',
      'card_product__button_about',
      'add',
      el.id,
    );
    cardProductButtonContainer.append(cardProductButtonAdd);
  });
};
