import { footer } from './components/footer/footer';
import { header } from './components/header/header';
import Routing from './navigation/router';
import { initRoutes } from './navigation/routes';
import { CatalogItem } from './types';
import { createHTML } from './utils/createHTML';
import { LocalStorageUtil } from './utils/localStorage';
import { showCards } from './pages/catalog/catalog';
import './styles.sass';

document.body.append(header);
document.body.appendChild(createHTML('main', 'main'));
document.body.append(footer);
initRoutes();
Routing();

export const store: CatalogItem[] = [];

const fetchData = async (): Promise<void> => {
  const data = await (await fetch('./data/categories.json')).json();
  const allData = await Promise.all(
    (data.categories as string[]).map(async (category) => {
      return await (await fetch(`./data/${category}.json`)).json();
    }),
  );
  allData.forEach((element) => {
    store.push(...element);
  });
  showCards();
};

void fetchData();

const localStorageUtil = new LocalStorageUtil();
localStorageUtil.pullProducts(2);
// console.log(localStorageUtil.getProducts());
