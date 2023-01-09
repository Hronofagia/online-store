import { footer } from './components/footer/footer';
import { header } from './components/header/header';
import Routing from './navigation/router';
import { initRoutes } from './navigation/routes';
import { createHTML } from './utils/createHTML';
import { showCards } from './pages/catalog/catalog';

import './styles.sass';
import { Store } from './store';
import { showBrand, showCategory } from './components/filters/filters';
import { shoppingCartContent } from './pages/shopping-cart/shopping-cart';
// import { productPage } from './pages/product-page/product-page';
import { createProductPageContent } from './pages/product-page/create-body';

document.body.append(header);
document.body.appendChild(createHTML('main', 'main'));
document.body.append(footer);

export const SAVED_ID: string[] = []; // ??????????????????????????????????????????????

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

  initRoutes();
  Routing();

  store.filterItems();
  showCards();
  showCategory();
  showBrand();

  shoppingCartContent.createNewPage();
  shoppingCartContent.render();
  // productPage.render();
  createProductPageContent();
};

void fetchData();
// initRoutes();
// Routing();
