import { BanksLogo } from '../../types';
import { createHTML } from '../../utils/createHTML';
import { shoppingCartContent } from '../shopping-cart/shopping-cart';

const ArrBanksLogo: BanksLogo = {
  '2': 'https://content.onliner.by/news/970x485/c29822b85d1ba85616b98c231c73119c.jpeg',
  '3': 'https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png',
  '4': 'https://e7.pngegg.com/pngimages/338/270/png-clipart-logo-credit-card-visa-debit-card-credit-card-blue-text.png',
  '5': 'https://w7.pngwing.com/pngs/962/794/png-transparent-mastercard-credit-card-mastercard-logo-mastercard-logo-love-text-heart.png',
};

export function splitCVV(event: Event): void {
  const valueStr = (event.target as HTMLInputElement).value;
  console.log(valueStr.length);
  console.log(Number(valueStr.substring(valueStr.length - 2)));
  if (Number(valueStr.substring(0, 2)) > 12) {
    (event.target as HTMLInputElement).value = ``;
  }
  if (valueStr.length === 2 && !valueStr.includes('/')) {
    (event.target as HTMLInputElement).value = `${valueStr}/`;
  }
}

export function onlyNumber(event: Event): void {
  console.log(6);
  const valueStr = (event.target as HTMLInputElement).value;
  const lastSym = Number(valueStr.substring(valueStr.length - 1));
  console.log(lastSym);
  if (
    !(
      (event.target as HTMLInputElement).closest('.credit-card-term') !==
        null && valueStr.length === 3
    )
  ) {
    if (isNaN(lastSym)) {
      const newValue = valueStr.slice(0, -1);
      (event.target as HTMLInputElement).value = newValue;
    }
    if (
      (event.target as HTMLInputElement).closest('.credit-card-CVV') !== null &&
      valueStr.length > 3
    ) {
      const newValue = valueStr.slice(0, -1);
      (event.target as HTMLInputElement).value = newValue;
    }
    if (
      (event.target as HTMLInputElement).closest('.credit-card-number') !==
        null &&
      valueStr.length > 16
    ) {
      const newValue = valueStr.slice(0, -1);
      (event.target as HTMLInputElement).value = newValue;
    }
    if (
      (event.target as HTMLInputElement).closest('.credit-card-term') !==
        null &&
      valueStr.length > 5
    ) {
      const newValue = valueStr.slice(0, -1);
      (event.target as HTMLInputElement).value = newValue;
    }
    if (
      (event.target as HTMLInputElement).closest('.credit-card-number') !==
        null &&
      valueStr.length === 1
    ) {
      getBankLogo(event);
    }
  }
}

export function closeModal(event: Event): void {
  document.querySelector('.wrapper-modal-form')?.remove();

  document.querySelector('.cart-block-title')?.classList.remove('hidden');
  document.querySelector('.cart-block-products')?.classList.remove('hidden');
  document
    .querySelector('.cart-block-total-discount-wrapper')
    ?.classList.remove('hidden');
  document
    .querySelector('.cart-block-total-button')
    ?.classList.remove('hidden');
}

export function getBankLogo(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  const BanksLogoKeys = Object.keys(ArrBanksLogo);

  if (BanksLogoKeys.includes(value)) {
    console.log('ok');
    const bankImg = document.querySelector('.bank-logo');
    if (bankImg !== null) {
      document.querySelector('.bank-logo')?.remove();
    }
    const BlockBank = document.querySelector('.block-img');
    const logo = createHTML('img', 'bank-logo', `${ArrBanksLogo[value]}`);
    (BlockBank as HTMLElement).append(logo);
  }
}

export function validation(event: Event): void {
  document.querySelectorAll('.error-message').forEach((item) => item.remove());
  event.preventDefault();
  const wrapper = document.querySelector(
    '.wrapper-modal-form',
  ) as HTMLFormElement;
  wrapper.checkValidity();
  const inputs = document.querySelectorAll('.wrapper-modal-form input');
  let count = 0;
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i] as HTMLInputElement;
    input.classList.remove('red-border');
    input.checkValidity();
    const validity = input.validity;
    if (!validity.valid) {
      input.insertAdjacentHTML(
        'beforebegin',
        `<span class ="error-message" id ="error-message${i}">ERROR</span>`,
      );
      input.classList.add('red-border');
      count += 1;
    }
  }
  if (count === 0) {
    (document.querySelector('.cart-block-total') as HTMLElement).classList.add(
      'hidden',
    );
    wrapper.innerHTML = 'Your order has been confirmed';
    wrapper.classList.add('message-order-position');

    setTimeout(() => {
      shoppingCartContent.reset();
      shoppingCartContent.createNewPage();
      window.location.href = '/dist/index.html';
    }, 3000);
  }
}
