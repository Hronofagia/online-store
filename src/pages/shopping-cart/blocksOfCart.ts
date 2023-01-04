import { createHTML } from '../../utils/createHTML';
import './shopping-cart.sass';
import './listProducts.sass';
import { shoppingCartContainer, shoppingCartContent } from './shopping-cart';
import { currentlocalStorage } from '../../utils/localStorage';

export function createCartBlocks(): void {
  const cartBlockTitle = createHTML('div', 'cart-block-title');
  const cartBloclProducts = createHTML('div', 'cart-block-products');
  const cartBlockTotal = createHTML('div', 'cart-block-total');
  shoppingCartContainer?.append(cartBlockTitle);
  shoppingCartContainer?.append(cartBloclProducts);
  shoppingCartContainer?.append(cartBlockTotal);

  const cartTitleName = createHTML(
    'div',
    'cart-block-title-name',
    'Products In Cart',
  );
  const cartTitlePages = createHTML('div', 'cart-block-title-pages');
  const cartTitleCount = createHTML('div', 'cart-block-title-count', '3');
  cartBlockTitle?.append(cartTitleName);
  cartBlockTitle?.append(cartTitlePages);
  cartBlockTitle?.append(cartTitleCount);

  const previousPage = createHTML(
    'div',
    'cart-block-previous-page',
    '\uD83E\uDC44',
  );
  const countPages = createHTML('div', 'cart-count-pages', '1');
  const nextPage = createHTML('div', 'cart-block-next-page', '\uD83E\uDC46');
  cartTitlePages?.append(previousPage);
  cartTitlePages?.append(countPages);
  cartTitlePages?.append(nextPage);
  cartTitlePages.addEventListener('click', turnPageInCart);

  const cartTotalName = createHTML('div', 'cart-block-total-name', 'Summary');
  const cartTotalCountProducts = createHTML(
    'div',
    'cart-block-total-count',
    '0',
  );
  const cartTotalCountPrice = createHTML('div', 'cart-block-total-price', '0');
  const cartTotalDiscount = createHTML('form', 'cart-block-total-discount');
  const cartTotalButton = createHTML(
    'button',
    'cart-block-total-button',
    'BUY NOW',
  );
  cartBlockTotal?.append(cartTotalName);
  cartBlockTotal?.append(cartTotalCountProducts);
  cartBlockTotal?.append(cartTotalCountPrice);
  cartBlockTotal?.append(cartTotalDiscount);
  cartBlockTotal?.append(cartTotalButton);

  cartTotalDiscount.insertAdjacentHTML(
    'afterbegin',
    '<input type="text" class="cart-block-total-input" id="promo-code" placeholder="Enter your promo code">',
  );
}

export function turnPageInCart(event: Event): void {
  const NumberPage = document.querySelector('.cart-count-pages');

  const ProductOnPage = document.querySelector(
    '.cart-block-title-count',
  )?.innerHTML;
  const countProductOnPage = Number(ProductOnPage);

  const IdProducts = currentlocalStorage.getProducts();
  const countPage = Math.ceil(IdProducts.length / Number(countProductOnPage));

  if (
    (event.target as HTMLElement).closest('.cart-block-previous-page') !==
      null &&
    Number(NumberPage?.innerHTML) > 1
  ) {
    (document.querySelector('.cart-count-pages') as Element).innerHTML = `${
      Number(NumberPage?.innerHTML) - 1
    }`;
    shoppingCartContent.render();
  }

  if (
    (event.target as HTMLElement).closest('.cart-block-next-page') !== null &&
    Number(NumberPage?.innerHTML) < countPage
  ) {
    (document.querySelector('.cart-count-pages') as Element).innerHTML = `${
      Number(NumberPage?.innerHTML) + 1
    }`;
    shoppingCartContent.render();
  }
}
