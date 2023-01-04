import { createHTML } from '../../utils/createHTML';
import './shopping-cart.sass';
import { store } from '../../index';
import { currentlocalStorage } from '../../utils/localStorage';
import { changeCountOfProducts } from './changeCountOfProducts';

export function createProductCardsInCart({
  arrPages,
  currentPage,
}: {
  arrPages: number[][];
  currentPage: number;
}): void {
  const contentlocalStorage = currentlocalStorage.getProducts();
  const currantArrIdProducts = arrPages[currentPage - 1];

  if (arrPages.length === 0) {
    const emptyCart = createHTML(
      'div',
      'empty-cart',
      "You haven't selected any products yet",
    );
    document.querySelector('.cart-block-products')?.append(emptyCart);
  } else {
    document.querySelector('.empty-cart')?.remove();

    for (let i = 0; i < currantArrIdProducts.length; i++) {
      const currentId = store.findIndex(
        (product) => Number(product.id) === currantArrIdProducts[i],
      );
      const currentElement = store[currentId];
      const wrapperProduct = createHTML('div', 'shopping-cart_product');
      wrapperProduct.setAttribute('id', `${currentElement.id}`);
      document.querySelector('.cart-block-products')?.append(wrapperProduct);

      const allProductsCart = document.querySelectorAll(
        '.shopping-cart_product',
      );
      const lastProductsCart = allProductsCart[allProductsCart.length - 1];

      const indexProduct = createHTML(
        'div',
        'product-cart_index',
        `${contentlocalStorage.indexOf(currantArrIdProducts[i]) + 1}`,
      );
      lastProductsCart?.append(indexProduct);

      const features = Object.keys(currentElement);
      features.forEach(function (el) {
        const content = currentElement[el];
        if (el !== 'id' && el !== 'images' && el !== 'thumbnail') {
          const productCompanent = createHTML(
            'div',
            `product_companent_${el}`,
            `${content as string}`,
          );
          lastProductsCart?.append(productCompanent);
        }
        if (el === 'thumbnail') {
          const content = currentElement[el];
          const productCompanent = createHTML(
            'img',
            `product_companent_${el}`,
            `${content}`,
          );
          lastProductsCart?.append(productCompanent);
        }
      });
      const counterBlock = createHTML('div', 'counter-block');
      lastProductsCart?.append(counterBlock);

      const counterBlockMinus = createHTML('div', 'counter-block_minus', '-');
      const counterBlockNumber = createHTML('div', 'counter-block_number', '1');
      const counterBlockPlus = createHTML('div', 'counter-block_plus', '+');
      counterBlock?.append(counterBlockMinus);
      counterBlock?.append(counterBlockNumber);
      counterBlock?.append(counterBlockPlus);
    }
    if (document.querySelectorAll('.counter-block') !== null) {
      document
        .querySelectorAll('.counter-block')
        .forEach((el) => addEventListener('click', changeCountOfProducts));
    }
  }
}
