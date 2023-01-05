import { Promocode } from '../../types';
import { createHTML } from '../../utils/createHTML';

const AllPromoCode: Promocode = { '1': 2, '2': 5, '3': 10, '4': 15 };

export function addPromoCode(event: Event): void {
  const value = (
    document.querySelector('.cart-block-total-input') as HTMLInputElement
  ).value;
  const keys = Object.keys(AllPromoCode);

  if (keys.includes(value)) {
    const currantPrice = document.querySelector(
      '.cart-block-total-price',
    ) as HTMLElement;
    const newPriceElement = document.querySelector(
      '.cart-block-total-new-price',
    ) as HTMLElement;

    let discont =
      (Number(currantPrice.innerHTML) / 100) * Number(AllPromoCode[value]);

    let newPrice = Number(currantPrice.innerHTML) - discont;

    newPrice = Math.round(newPrice);

    newPrice = Math.round(newPrice);
    discont = Math.round(discont);

    newPriceElement.innerHTML = `${newPrice}`;

    currantPrice.classList.add('crossed');
    newPriceElement.classList.remove('hidden');
    (
      document.querySelector('.cart-block-total-input') as HTMLInputElement
    ).value = ``;
    const promoCodeElement = document.querySelector(
      '.cart-block-total-discount-wrapper',
    ) as HTMLInputElement;

    const promoCode = createHTML(
      'div',
      'applied-promoCode',
      `${value} applied  `,
    );
    promoCodeElement?.after(promoCode);

    const value$DiscountElement = createHTML(
      'span',
      'promoCode-value',
      `${discont}`,
    );
    promoCode?.append(value$DiscountElement);

    const valuePercentElement = createHTML(
      'span',
      'promoCode-percent',
      `${AllPromoCode[value]}`,
    );
    promoCode?.append(valuePercentElement);

    const remove = createHTML('span', 'applied-promoCode-remove', '   \u2573');
    promoCode?.append(remove);

    const blockSummaryElement = document.querySelector(
      '.cart-block-total',
    ) as HTMLElement;
    blockSummaryElement.addEventListener('click', removePromoCode);

    const buttonAddPromoCode = document.querySelector(
      '.button-add-promo-code',
    ) as HTMLInputElement;
    buttonAddPromoCode.classList.remove('input-right-button');
  }
}
document.querySelector('.cart-block-total-input');

export function removePromoCode(event: Event): void {
  if ((event.target as HTMLElement).closest('.applied-promoCode') !== null) {
    const countPromoCodes =
      document.querySelectorAll('.applied-promoCode').length;
    const currantPriceWithDiscount = document.querySelector(
      '.cart-block-total-new-price',
    ) as HTMLElement;
    const currantPromoCodeElement = (event.target as HTMLElement).closest(
      '.applied-promoCode',
    );
    const priceWithoutDiscount = document.querySelector(
      '.cart-block-total-price',
    ) as HTMLElement;
    if (countPromoCodes > 1) {
      const currantPercent = Number(
        (
          currantPromoCodeElement?.querySelector(
            '.promoCode-percent',
          ) as HTMLElement
        )?.innerHTML,
      );
      const newPrice = Math.round(
        Number(currantPriceWithDiscount.innerHTML) +
          (Number(priceWithoutDiscount.innerHTML) / 100) * currantPercent,
      );

      currantPriceWithDiscount.innerHTML = `${newPrice}`;
    } else {
      currantPriceWithDiscount.classList.add('hidden');
      priceWithoutDiscount.classList.remove('crossed');
    }
    currantPromoCodeElement?.remove();
  }
}

export function clearDiscount(): void {
  document.querySelectorAll('.applied-promoCode').forEach((el) => el.remove());
  const priceWithoutDiscount = document.querySelector(
    '.cart-block-total-price',
  ) as HTMLElement;
  priceWithoutDiscount.classList.remove('crossed');
  const currantPriceWithDiscount = document.querySelector(
    '.cart-block-total-new-price',
  ) as HTMLElement;
  currantPriceWithDiscount.classList.add('hidden');
}

export function checkInput(event: Event): void {
  const inputElement = document.querySelector(
    '.cart-block-total-input',
  ) as HTMLInputElement;
  const buttonAddPromoCode = document.querySelector(
    '.button-add-promo-code',
  ) as HTMLInputElement;
  const keys = Object.keys(AllPromoCode);
  if (keys.includes(inputElement.value)) {
    inputElement.classList.add('input-right');
    buttonAddPromoCode.classList.add('input-right-button');
  } else {
    inputElement.classList.remove('input-right');
    buttonAddPromoCode.classList.remove('input-right-button');
  }
}
