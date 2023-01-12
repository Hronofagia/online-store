import { store } from '..';
import { catalogContainer } from '../pages/catalog/catalog';
import { checkCart } from '../pages/product-page/listener-purchase';
import { productPageContainer } from '../pages/product-page/product-page';
import { shoppingCartContainer } from '../pages/shopping-cart/shopping-cart';

export let routes: Array<{ url: string; callback: () => void }>;

export const initRoutes = (): void => {
  const appArea = document.querySelector('.main');
  if (appArea !== null) {
    routes = [
      {
        url: '',
        callback: function () {
          appArea.innerHTML = '';
          appArea.appendChild(catalogContainer);
          checkCart();
        },
      },
      {
        url: 'shopping-cart',
        callback: function () {
          appArea.innerHTML = '';
          appArea.appendChild(shoppingCartContainer);
        },
      },
    ];

    const CountProducts = store.items.length;
    for (let i = 0; i < CountProducts; i++) {
      const item: { url: string; callback: () => void } = {
        url: `product-page/${store.items[i].id}`,
        callback: function () {
          appArea.innerHTML = '';
          appArea.appendChild(productPageContainer);
        },
      };
      routes.push(item);
    }
  }
};
