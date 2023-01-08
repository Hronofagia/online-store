import { catalogContainer } from '../pages/catalog/catalog';
import { productPageContainer } from '../pages/product-page/product-page';
import { shoppingCartContainer } from '../pages/shopping-cart/shopping-cart';

export let routes: Array<{ url: string; callback: () => void }>;

export const initRoutes = (): void => {
  const appArea = document.querySelector('.main');
  if (appArea !== null)
    routes = [
      {
        url: '',
        callback: function () {
          appArea.innerHTML = '';
          appArea.appendChild(catalogContainer);
        },
      },
      {
        url: 'shopping-cart',
        callback: function () {
          console.log('SHPPING');

          appArea.innerHTML = '';
          appArea.appendChild(shoppingCartContainer);
        },
      },
      {
        url: 'product-page',
        callback: function () {
          appArea.innerHTML = '';
          appArea.appendChild(productPageContainer);
        },
      },
    ];
};
