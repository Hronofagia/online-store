import { store } from '../..';
import { updateComponents } from '../../pages/catalog/catalog';
import { createHTML } from '../../utils/createHTML';

const buttonContainer = createHTML('div', 'button_container');
const resetButton = createHTML('button', 'reset_button', 'Reset filters');
buttonContainer.append(resetButton);
const saveButton = createHTML('button', 'save_button', 'Save filters');
buttonContainer.append(saveButton);

const categoryListContainer = createHTML('div', 'category_list_container');
const categoryListContainerTitle = createHTML(
  'p',
  'container_title',
  'Category',
);
categoryListContainer.append(categoryListContainerTitle);

const brandListContainer = createHTML('div', 'brand_list_container');

const brandListContainerTitle = createHTML('p', 'container_title', 'Brand');
brandListContainer.append(brandListContainerTitle);

const priceInputContainer = createHTML('div', 'price_input_container');

const priceInputContainerTitle = createHTML('p', 'container_title', 'Price');
priceInputContainer.append(priceInputContainerTitle);

const stockInputContainer = createHTML('div', 'price_input_container');

const stockInputContainerTitle = createHTML('p', 'container_title', 'Stock');
stockInputContainer.append(stockInputContainerTitle);

export const appendToFilterContainer = (
  filtersContainer: HTMLElement,
): void => {
  filtersContainer.append(buttonContainer);
  filtersContainer.append(categoryListContainer);
  filtersContainer.append(brandListContainer);
  filtersContainer.append(priceInputContainer);
  filtersContainer.append(stockInputContainer);
};

resetButton.addEventListener('click', () => {
  store.resetSetting();
  updateComponents();
});
