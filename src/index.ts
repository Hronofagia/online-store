import { footer } from './components/footer/footer';
import { header } from './components/header/header';
import Routing from './navigation/router';
import { initRoutes } from './navigation/routes';
import { createHTML } from './utils/createHTML';
import { showCards, showSearch, showSort } from './pages/catalog/catalog';
import { Store } from './store';
import {
  showBrand,
  showCategory,
  showPrice,
  showStock,
} from './components/filters/filters';
import { shoppingCartContent } from './pages/shopping-cart/shopping-cart';
import './styles.sass';

document.body.append(header);
document.body.appendChild(createHTML('main', 'main'));
document.body.append(footer);
initRoutes();
Routing();

const searchParams = new URLSearchParams(window.location.search);
const searchKeys = searchParams.keys();

const initStoreValues = Array.from(searchKeys).reduce((res, key) => {
  if (key === 'price' || key === 'stock') {
    const prices = searchParams
      .get(key)
      ?.split('+')
      .reduce((acc, curr) => {
        const current = curr.split('=');
        return { ...acc, [current[0]]: current[1] };
      }, {});
    return { ...res, [key]: prices };
  }

  if (key === 'category' || key === 'brand') {
    return { ...res, [key]: searchParams.get(key)?.split(',') };
  }

  if (key === 'search' || key === 'sortBy') {
    return { ...res, [key]: searchParams.get(key) };
  }

  if (key === 'cardView') {
    return { ...res, [key]: searchParams.get(key) };
  }

  return { ...res };
}, {});

export const store = new Store(initStoreValues ?? {});
console.log(store);

const fetchData = async (): Promise<void> => {
  const data = await (await fetch('./data/categories.json')).json();
  const allData = await Promise.all(
    (data.categories as string[]).map(async (category) => {
      return await (await fetch(`./data/${category}.json`)).json();
    }),
  );
  allData.forEach((element) => {
    store.setItems(element);
  });
  store.filterItems();
  store.sortItems();
  showCards();
  showCategory();
  showBrand();
  showPrice();
  showStock();
  showSort();
  showSearch();
  shoppingCartContent.createNewPage();
};

void fetchData();
