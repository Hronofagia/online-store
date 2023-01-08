import { store } from '../..';
import {
  showCards,
  showSearch,
  showSort,
  updateComponents,
} from '../../pages/catalog/catalog';
import { createHTML } from '../../utils/createHTML';
import { resetAllParams } from '../../utils/utils';
import { createSlider } from '../double-slider/double-slider';
import './filters.sass';

const resetSliders: Array<() => void> = [];

const buttonContainer = createHTML('div', 'button_container');
const resetButton = createHTML('button', 'filter_button', 'Reset filters');
buttonContainer.append(resetButton);
const saveButton = createHTML('button', 'filter_button', 'Save filters');
buttonContainer.append(saveButton);

const categoryListContainer = createHTML('div', 'filter_list_container');
const categoryListContainerTitle = createHTML(
  'p',
  'container_title',
  'Category',
);
categoryListContainer.append(categoryListContainerTitle);

const brandListContainer = createHTML('div', 'filter_list_container');

const brandListContainerTitle = createHTML('p', 'container_title', 'Brand');
brandListContainer.append(brandListContainerTitle);

const priceInputContainer = createHTML('div', 'filter_list_container');

const priceInputContainerTitle = createHTML('p', 'container_title', 'Price');
priceInputContainer.append(priceInputContainerTitle);

export const showPrice = (): void => {
  // priceInputContainer.removeChild('sliderContainer');
  const [priceSlider, resetSlider] = createSlider(
    store.settings.price,
    store.setPrice,
    '15',
    '2271',
  );
  resetSliders.push(resetSlider);
  priceInputContainer.append(priceSlider);
};

export const showStock = (): void => {
  const [stockSlider, resetSlider] = createSlider(
    store.settings.stock,
    store.setStock,
    '1',
    '28',
  );
  resetSliders.push(resetSlider);
  stockInputContainer.append(stockSlider);
};

const stockInputContainer = createHTML('div', 'filter_list_container');

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
  document.querySelectorAll('.chosen_item').forEach((el) => {
    el.classList.remove('chosen_item');
  });
  resetSliders.forEach((reset) => reset());
  updateComponents();
  showCards();
  showSort();
  showSearch();
  resetAllParams();
});

export const showCategory = (): void => {
  const categories = store.items.reduce((res, curr) => {
    res.add(curr.category);
    return res;
  }, new Set());

  const categoryWrapper = createHTML('div', 'filters_wrapper');
  const categoryContainer = createHTML('ul', 'filters_container');
  categoryWrapper.append(categoryContainer);
  const items = (Array.from(categories) as string[]).map((el) => {
    const li = createHTML('li', 'filter_item', el);
    li.addEventListener('click', () => {
      if (store.settings.category.includes(el)) {
        store.resetCategoryFIlterValue(el);
        li.classList.remove('chosen_item');
      } else {
        store.setSetting('category', el);
        li.classList.add('chosen_item');
      }
      showCards();
    });
    return li;
  });
  categoryContainer.append(...items);
  categoryListContainer.append(categoryWrapper);
};

export const showBrand = (): void => {
  const brands = store.items.reduce((res, curr) => {
    res.add(curr.brand);
    return res;
  }, new Set());

  const brandWrapper = createHTML('div', 'filters_wrapper');
  const brandContainer = createHTML('ul', 'filters_container');
  brandWrapper.append(brandContainer);
  const items = (Array.from(brands) as string[]).map((el) => {
    const li = createHTML('li', 'filter_item', el);
    li.addEventListener('click', () => {
      if (store.settings.brand.includes(el)) {
        store.resetBrandFIlterValue(el);
        li.classList.remove('chosen_item');
      } else {
        store.setSetting('brand', el);
        li.classList.add('chosen_item');
      }
      showCards();
    });
    return li;
  });
  brandContainer.append(...items);
  brandListContainer.append(brandWrapper);
};
