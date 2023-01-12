import { createHTML } from '../../utils/createHTML';
import { shoppingCartContainer } from '../shopping-cart/shopping-cart';
import { closeModal, onlyNumber, splitCVV, validation } from './listeners';
import './modal.sass';

export function createModalWindow(): void {
  const form = createHTML('form', 'wrapper-modal-form');

  if (document.querySelector('.shopping-cart_container') !== null) {
    document.querySelector('.cart-block-title')?.classList.add('hidden');
    document.querySelector('.cart-block-products')?.classList.add('hidden');
    document
      .querySelector('.cart-block-total-discount-wrapper')
      ?.classList.add('hidden');
    document.querySelector('.cart-block-total-button')?.classList.add('hidden');
    shoppingCartContainer?.append(form);
  }
  if (document.querySelector('.product-page_container') !== null) {
    document
      .querySelector('.product-page-wrapper')
      ?.setAttribute('id', 'hidden');
    document.querySelector('.product-page_container')?.append(form);
  }

  const cross = createHTML('div', 'cross-esc', '\u2573');
  form?.append(cross);

  const blockPersonalInf = createHTML('section', 'section-personal-inf');
  form?.append(blockPersonalInf);

  blockPersonalInf.insertAdjacentHTML(
    'beforeend',
    '<input type="text" class="modal-input-personal" id="modal-input-name" placeholder="Your first and last name" pattern="[A-Za-z]{3,} [A-Za-z]{3,}" required>',
  );
  blockPersonalInf.insertAdjacentHTML(
    'beforeend',
    '<input type="tel" class="modal-input-personal" id="modal-input-phone" placeholder="Phone Number +xxx xxx xxx xxx" pattern="[+]([0-9]{3,} ?){3,}" required>',
  );
  blockPersonalInf.insertAdjacentHTML(
    'beforeend',
    '<input type="text" class="modal-input-personal" id="modal-input-address" placeholder="Delivery address" pattern="([a-zA-Z0-9]{5,} ?){3,}" required>',
  );
  blockPersonalInf.insertAdjacentHTML(
    'beforeend',
    '<input type="email" class="modal-input-personal" id="modal-input-email" placeholder="E-mail" required>',
  );

  const blockCreditCard = createHTML('section', 'section-credit-card');
  form?.append(blockCreditCard);

  const bankImg = createHTML('div', 'block-img');
  blockCreditCard?.append(bankImg);

  blockCreditCard.insertAdjacentHTML(
    'beforeend',
    '<input type="text" class="credit-card-number" placeholder="Card Number" pattern="[0-9]{16,16}" required>',
  );
  blockCreditCard.insertAdjacentHTML(
    'beforeend',
    '<input type="text" class="credit-card-term" placeholder="MM/YYYY" pattern="[0-9]{2}/[0-9]{2}" required>',
  );
  blockCreditCard.insertAdjacentHTML(
    'beforeend',
    '<input type="text" class="credit-card-CVV" placeholder="CVV" pattern="[0-9]{3}" inputmode="numeric" required>',
  );

  form.insertAdjacentHTML(
    'beforeend',
    '<input type="submit" class="credit-card-button" value="CONFIRM">',
  );

  document
    .querySelector('.credit-card-term')
    ?.addEventListener('input', splitCVV);

  document
    .querySelector('.section-credit-card')
    ?.addEventListener('keyup', onlyNumber);

  document.querySelector('.cross-esc')?.addEventListener('click', closeModal);
  document
    .querySelector('.credit-card-button')
    ?.addEventListener('click', validation);
}
