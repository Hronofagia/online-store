import { footer } from './components/footer/footer';
import { header } from './components/header/header';
import Routing from './navigation/router';
import { initRoutes } from './navigation/routes';

import './styles.sass';
import { createHTML } from './utils/createHTML';

document.body.append(header);
document.body.appendChild(createHTML('main', 'main'));
document.body.append(footer);
initRoutes();
Routing();

// const store: { data: string[] } = {
//   data: [],
// };

// const fetchData = async (): Promise<void> => {
//   const data = await (await fetch('./data/categories.json')).json();
//   console.log(data);
//   const allData = await Promise.all(
//     (data.categories as string[]).map(async (category) => {
//       return await (await fetch(`./data/${category}.json`)).json();
//     }),
//   );
//   console.log(allData);
//   allData.forEach((element) => {
//     store.data.push(...element.products);
//   });

//   console.log(store);
// };

// void fetchData();

const CATALOG: object[] = [];

const fetchData = async (): Promise<void> => {
  const data = await (await fetch('./data/categories.json')).json();
  const allData = await Promise.all(
    (data.categories as string[]).map(async (category) => {
      return await (await fetch(`./data/${category}.json`)).json();
    }),
  );
  allData.forEach((element) => {
    CATALOG.push(...element);
  });
};

void fetchData();

console.log(CATALOG);
