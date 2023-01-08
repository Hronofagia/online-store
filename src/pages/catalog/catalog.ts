import { createHTML, createInput, createOption } from '../../utils/createHTML';
import './catalog.sass';
import searchIcon from '../../assets/search-button.svg';
import cardMenuIcon from '../../assets/card-menu.png';
import listMenuIcon from '../../assets/list-menu.png';
import { appendToFilterContainer } from '../../components/filters/filters';
import { store } from '../..';
import { CatalogView, SortTypes } from '../../store';

export const catalogContainer = createHTML('section', 'catalog_container');
document.querySelector('.main')?.append(catalogContainer);

const topPanel = createHTML('div', 'top_panel');
catalogContainer.append(topPanel);

const searchContainer = createHTML('div', 'search_container');
topPanel.append(searchContainer);
searchContainer.addEventListener('submit', (e) => {
  e.preventDefault();
});
const searchBox = createInput('search_box', 'Search product');
searchBox.value = '';

searchBox.addEventListener('input', (e) => {
  store.setSetting('search', (e.target as HTMLInputElement).value);
  showCards();
});

searchBox.name = 'search';
searchContainer.append(searchBox);
const searchbButton = createHTML('button', 'search_button');
searchContainer.append(searchbButton);
const searchbButtonImg = createHTML(
  'img',
  'search_button__img',
) as HTMLImageElement;
searchbButtonImg.src = searchIcon as string;
searchbButton.append(searchbButtonImg);

const foundProducts = createHTML('p', 'found_products', 'Found 100 products');
topPanel.append(foundProducts);

const sortContainer = createHTML('select', 'sort_container');
topPanel.append(sortContainer);
export const mostPopular = createOption('Most popular');
sortContainer.append(mostPopular);
export const lessPopular = createOption('Less popular');
sortContainer.append(lessPopular);
export const minMaxPrice = createOption('Price: Low to high');
sortContainer.append(minMaxPrice);
export const maxMinPrice = createOption('Price: High to low');
sortContainer.append(maxMinPrice);

const viewMenuContainer = createHTML('div', 'view_menu_container');
topPanel.append(viewMenuContainer);
const cardMenu = createHTML(
  'img',
  'card_menu_icon menu_icon',
) as HTMLImageElement;
cardMenu.src = cardMenuIcon as string;
viewMenuContainer.append(cardMenu);
const listMenu = createHTML(
  'img',
  'list_menu_icon menu_icon',
) as HTMLImageElement;
listMenu.src = listMenuIcon as string;
viewMenuContainer.append(listMenu);

const mainContainer = createHTML('div', 'main_container');
catalogContainer.append(mainContainer);
const catalogList = createHTML('div', 'catalog_list');
mainContainer.append(catalogList);
export const filtersContainer = createHTML('div', 'filters_container');
mainContainer.append(filtersContainer);

export const showCards: () => void = () => {
  Array.from(catalogList.children).forEach((el) => el.remove());
  store.sortItems();
  console.log(store.cardView);
  store.filteredItems.forEach((el) => {
    const cardProduct = createHTML('div', store.cardView);
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
  foundProducts.textContent = `Found ${store.filteredItems.length} products`;
};

cardMenu.addEventListener('click', () => {
  console.log('tfgdgfd');

  // cardProduct.classList.remove('list_product');
  // cardProduct.classList.add('card_product');
  listMenu.classList.remove('current__menu_icon');
  cardMenu.classList.add('current__menu_icon');
  store.setView(CatalogView.card);
  showCards();
});
listMenu.addEventListener('click', () => {
  // cardProduct.classList.remove('card_product');
  // cardProduct.classList.add('list_product');
  cardMenu.classList.remove('current__menu_icon');
  listMenu.classList.add('current__menu_icon');
  store.setView(CatalogView.list);
  showCards();
});

appendToFilterContainer(filtersContainer);

export const updateComponents = (): void => {
  searchBox.value = store.settings.search;
};

sortContainer.addEventListener('input', (event) => {
  const currentSort = (event.target as HTMLSelectElement).value;
  if (currentSort === 'Most popular') {
    store.setSetting('sortBy', SortTypes.Popular);
  }
  if (currentSort === 'Less popular') {
    store.setSetting('sortBy', SortTypes.Unpopular);
  }
  if (currentSort === 'Price: Low to high') {
    store.setSetting('sortBy', SortTypes.Cheap);
  }
  if (currentSort === 'Price: High to low') {
    store.setSetting('sortBy', SortTypes.Expensive);
  }
  showCards();
});

const options = {
  lessPopular: 'Less popular',
  mostPopular: 'Most popular',
  minMaxPrice: 'Price: Low to high',
  maxMinPrice: 'Price: High to low',
};

export const showSort = (): void => {
  (sortContainer as HTMLSelectElement).value =
    options[store.settings.sortBy as keyof typeof options];
};

export const showSearch = (): void => {
  searchBox.value = store.settings.search;
};

export const showView = (): void => {};
