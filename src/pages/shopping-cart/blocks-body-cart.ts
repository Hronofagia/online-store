import { createHTML } from '../../utils/createHTML';
import './shopping-cart.sass';
import './item-ptoduct.sass';
import { shoppingCartContainer, shoppingCartContent } from './shopping-cart';
import { currentlocalStorage } from '../../utils/localStorage';
import { addPromoCode, checkInput } from './promo-code';
import { modalWindow } from '../modal/modal';

export function createCartBlocks(): void {
  const blockTitle = createHTML('div', 'cart-block-title');
  const bloclProducts = createHTML('div', 'cart-block-products');
  const blockSummary = createHTML('div', 'cart-block-total');
  shoppingCartContainer?.append(blockTitle);
  shoppingCartContainer?.append(bloclProducts);
  shoppingCartContainer?.append(blockSummary);

  const blockTitleName = createHTML(
    'div',
    'cart-block-title-name',
    'Products In Cart',
  );
  blockTitle?.append(blockTitleName);

  const blockTitlePages = createHTML('div', 'cart-block-title-pages');
  blockTitle?.append(blockTitlePages);

  const blockTitleCount = createHTML('div', 'cart-block-count-on-page');
  blockTitle?.append(blockTitleCount);

  const selectArray = ['3', '5', '10'];
  const selectList = document.createElement('select');
  selectList.id = 'select-count-on-page';
  blockTitleCount.appendChild(selectList);

  for (let i = 0; i < selectArray.length; i++) {
    const option = document.createElement('option');
    option.value = selectArray[i];
    option.text = selectArray[i];
    if (i === 0) option.selected = true;
    selectList.appendChild(option);
  }

  const previousPage = createHTML(
    'div',
    'cart-block-previous-page',
    '\uD83E\uDC44',
  );
  const countPages = createHTML('div', 'cart-count-pages', '1');
  const nextPage = createHTML('div', 'cart-block-next-page', '\uD83E\uDC46');
  blockTitlePages?.append(previousPage);
  blockTitlePages?.append(countPages);
  blockTitlePages?.append(nextPage);

  const blockSummaryName = createHTML(
    'div',
    'cart-block-total-name',
    'Summary',
  );
  blockSummary?.append(blockSummaryName);

  const blockSummaryCountProducts = createHTML(
    'div',
    'cart-block-total-count',
    '0',
  );
  blockSummary?.append(blockSummaryCountProducts);

  const blockSummaryWrapperCountPrice = createHTML(
    'div',
    'cart-block-wrapper-total-price',
  );
  blockSummary?.append(blockSummaryWrapperCountPrice);

  const summaryCountPrice = createHTML('div', 'cart-block-total-price', '0');
  blockSummaryWrapperCountPrice?.append(summaryCountPrice);

  const NewSmmaryCountPrice = createHTML(
    'div',
    'cart-block-total-new-price hidden',
  );
  blockSummaryWrapperCountPrice?.append(NewSmmaryCountPrice);

  const blockSummaryWrapperDiscount = createHTML(
    'form',
    'cart-block-total-discount-wrapper',
  );
  blockSummary?.append(blockSummaryWrapperDiscount);

  const formDiscount = createHTML('form', 'cart-block-total-discount');
  blockSummaryWrapperDiscount?.append(formDiscount);
  formDiscount.insertAdjacentHTML(
    'afterbegin',
    '<input type="text" class="cart-block-total-input" id="promo-code" placeholder="Promo code (1, 2, 3)">',
  );

  const buttonPromoCode = createHTML('button', 'button-add-promo-code', 'ADD');
  blockSummaryWrapperDiscount?.append(buttonPromoCode);

  // const appliedPromoCode = createHTML('div', 'wrapper-applied-promoCode');
  // blockSummaryWrapperDiscount?.append(appliedPromoCode);

  const cartTotalButton = createHTML(
    'button',
    'cart-block-total-button',
    'BUY NOW',
  );
  blockSummary?.append(cartTotalButton);
  cartTotalButton.addEventListener('click', modalWindow.render);

  selectList.addEventListener('change', changeCountProductOnPage);
  blockTitlePages.addEventListener('click', turnPageInCart);
  buttonPromoCode.addEventListener('click', addPromoCode);
  formDiscount.addEventListener('input', checkInput);
}

export function turnPageInCart(event: Event): void {
  const NumberPage = document.querySelector('.cart-count-pages');

  const selectElement = document.querySelector(
    '#select-count-on-page',
  ) as HTMLSelectElement;
  const countProductOnPage = Number(
    selectElement.options[selectElement?.selectedIndex].value,
  );

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

export function changeCountProductOnPage(event: Event): void {
  shoppingCartContent.render();
}
