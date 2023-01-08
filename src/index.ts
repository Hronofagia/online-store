import { footer } from './components/footer/footer';
import { header } from './components/header/header';
import Routing from './navigation/router';
import { initRoutes } from './navigation/routes';
import { createHTML } from './utils/createHTML';
import { LocalStorageUtil } from './utils/localStorage';
import { showCards } from './pages/catalog/catalog';
import './styles.sass';
import { Store } from './store';
import {
  showBrand,
  showCategory,
  showPrice,
  showStock,
} from './components/filters/filters';

document.body.append(header);
document.body.appendChild(createHTML('main', 'main'));
document.body.append(footer);
initRoutes();
Routing();

export const store = new Store();
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
  store.searchProduct();
  store.sortItems();
  showCards();
  showCategory();
  showBrand();
  showPrice();
  showStock();
};

void fetchData();

const localStorageUtil = new LocalStorageUtil();
localStorageUtil.pullProducts(2);
