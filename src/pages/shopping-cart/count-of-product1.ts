import './shopping-cart.sass';
import { currentlocalStorage } from '../../utils/localStorage';
import { shoppingCartContent } from './shopping-cart';
import { clearDiscount } from './promo-code';
import { store } from '../..';

export function changeCountOfProducts(event: Event): void {
  if (
    (event.target as HTMLElement).closest('.shopping-cart_product') !== null
  ) {
    clearDiscount();
    const currantProduct = (event.target as HTMLElement).closest(
      '.shopping-cart_product',
    );
    const countOfProduct = (currantProduct as HTMLElement)?.querySelector(
      '.counter-block_number',
    );
    const summaryPriceForOneProductEl = (
      currantProduct as HTMLElement
    )?.querySelector('.product_companent_price');
    const summaryPriceForOneProduct = Number(
      (currantProduct as HTMLElement)?.querySelector('.product_companent_price')
        ?.innerHTML,
    );
    const currantStock = Number(
      (currantProduct as HTMLElement).querySelector('.product_companent_stock')
        ?.innerHTML,
    );
    const curranPage = document.querySelector('.cart-count-pages');
    const currantIdProduct = currantProduct?.getAttribute('id');
    const summaryCount = document.querySelector('.cart-block-total-count');
    const summaryPrice = document.querySelector('.cart-block-total-price');

    const currantARRIndex = store.items.findIndex(
      (product) => Number(product.id) === Number(currantIdProduct),
    );

    const currantPrice = store.items[currantARRIndex].price;

    if (
      (event.target as HTMLElement).closest('.counter-block_minus') !== null &&
      Number((countOfProduct as HTMLElement).innerHTML) === 1
    ) {
      currentlocalStorage.removeProducts(Number(currantIdProduct));
      const productsOnPage = document.querySelectorAll(
        '.shopping-cart_product',
      );

      if (productsOnPage.length - 1 === 0) {
        (
          document.querySelector('.cart-count-pages') as HTMLElement
        ).innerHTML = `${Number(curranPage?.innerHTML) - 1}`;
      }

      shoppingCartContent.render();
    }

    if (
      (event.target as HTMLElement).closest('.counter-block_minus') !== null &&
      Number((countOfProduct as HTMLElement).innerHTML) > 1
    ) {
      (
        document.querySelector('.cart-block-total-count') as HTMLElement
      ).innerHTML = `${Number(summaryCount?.innerHTML) - 1}`;
      (
        document.querySelector('.cart-block-total-price') as HTMLElement
      ).innerHTML = `${Number(summaryPrice?.innerHTML) - currantPrice}`;

      (
        (currantProduct as HTMLElement).querySelector(
          '.counter-block_number',
        ) as HTMLElement
      ).innerHTML = `${Number((countOfProduct as HTMLElement).innerHTML) - 1}`;
      (summaryPriceForOneProductEl as HTMLElement).innerHTML = `${
        summaryPriceForOneProduct - currantPrice
      }`;
    }

    if (
      (event.target as HTMLElement).closest('.counter-block_plus') !== null &&
      Number((countOfProduct as HTMLElement).innerHTML) < currantStock
    ) {
      (
        (currantProduct as HTMLElement).querySelector(
          '.counter-block_number',
        ) as HTMLElement
      ).innerHTML = `${Number((countOfProduct as HTMLElement).innerHTML) + 1}`;
      (
        document.querySelector('.cart-block-total-count') as HTMLElement
      ).innerHTML = `${Number(summaryCount?.innerHTML) + 1}`;
      (
        document.querySelector('.cart-block-total-price') as HTMLElement
      ).innerHTML = `${Number(summaryPrice?.innerHTML) + currantPrice}`;
      (summaryPriceForOneProductEl as HTMLElement).innerHTML = `${
        summaryPriceForOneProduct + currantPrice
      }`;
    }
    const newPrice = (
      document.querySelector('.cart-block-total-price') as HTMLElement
    ).innerHTML;
    const newCount = (
      document.querySelector('.cart-block-total-count') as HTMLElement
    ).innerHTML;
    (
      document.querySelector('.price__number') as HTMLElement
    ).innerHTML = `${newPrice}`;
    (
      document.querySelector('.count_header__title') as HTMLElement
    ).innerHTML = `${newCount}`;
  }
}
