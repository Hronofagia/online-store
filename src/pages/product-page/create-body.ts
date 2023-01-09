import { store } from '../..';
import { createHTML } from '../../utils/createHTML';
import { currentlocalStorage } from '../../utils/localStorage';
import { changeMainImg } from './listener-flipping-img';
import { buyOnProductPage } from './listener-purchase';

import './product-page.sass';

export function createProductPageContent(): void {
  const pathURL = document.location.href;
  const numberId = Number(pathURL.split('/').slice(-1).join());

  const numberInStoreARR = store.items.findIndex(
    (product) => Number(product.id) === numberId,
  );

  const productWrapper = createHTML('div', 'product-page-wrapper');
  const productTitle = createHTML(
    'div',
    'product-page-title',
    `Store > ${store.items[numberInStoreARR].category} > ${store.items[numberInStoreARR].brand} > ${store.items[numberInStoreARR].title}`,
  );
  const productImages = createHTML('div', 'product-page-images');
  const productMainImages = createHTML('div', 'product-page-main-imag');
  const blockDescription = createHTML('div', 'product-page-block-description');
  const blockPrice = createHTML('div', 'product-page-block-price');
  document.querySelector('.product-page_container')?.append(productWrapper);
  productWrapper?.append(productTitle);
  productWrapper?.append(productImages);
  productWrapper?.append(productMainImages);
  productWrapper?.append(blockDescription);
  productWrapper?.append(blockPrice);

  const mainImg = createHTML(
    'img',
    'item-main-imag',
    `${store.items[numberInStoreARR].thumbnail}`,
  );
  productMainImages?.append(mainImg);

  const images = store.items[numberInStoreARR].images;

  for (let i = 0; i < images.length; i++) {
    const ImgWrapper = createHTML('div', 'product-page-img');
    const ImgItem = createHTML('img', 'item-img', `${images[i]}`);
    ImgItem.setAttribute('id', `${i}`);
    productImages.append(ImgWrapper);
    productImages.lastElementChild?.append(ImgItem);
  }

  const ImgWrapper = createHTML('div', 'product-page-img');
  const ImgItem = createHTML(
    'img',
    'item-img',
    `${store.items[numberInStoreARR].thumbnail}`,
  );
  ImgItem.setAttribute('id', `${images.length + 1}`);
  productImages.append(ImgWrapper);
  productImages.lastElementChild?.append(ImgItem);

  const title = createHTML(
    'div',
    'description-item',
    `${store.items[numberInStoreARR].title}`,
  );
  const brand = createHTML(
    'div',
    'description-item',
    `Brand: ${store.items[numberInStoreARR].brand}`,
  );
  const category = createHTML(
    'div',
    'description-item',
    `Category: ${store.items[numberInStoreARR].category}`,
  );
  const rating = createHTML(
    'div',
    'description-item',
    `\u2B50 ${store.items[numberInStoreARR].rating}`,
  );
  const stock = createHTML(
    'div',
    'description-item',
    `Stock: ${store.items[numberInStoreARR].stock}`,
  );
  const discount = createHTML(
    'div',
    'description-item',
    `- ${store.items[numberInStoreARR].discountPercentage} %`,
  );
  blockDescription.append(title);
  blockDescription.append(brand);
  blockDescription.append(category);
  blockDescription.append(rating);
  blockDescription.append(stock);
  blockDescription.append(discount);

  const price = createHTML(
    'div',
    'product-page-price',
    `${store.items[numberInStoreARR].price} €`,
  );

  const buttonBlock = createHTML('div', 'product-button-block');
  price.append(buttonBlock);

  const buttonAdd = createHTML('button', 'product-button-add', 'ADD TO CART');
  const buttonBuyNow = createHTML('button', 'product-button-buy', 'BUY NOW');
  if (!currentlocalStorage.getProducts().includes(numberInStoreARR)) {
    buttonAdd.classList.add('active-button');
  }
  buttonBuyNow.classList.add('active-button');
  blockPrice.append(price);
  buttonBlock.append(buttonAdd);
  buttonBlock.append(buttonBuyNow);
  buttonAdd.setAttribute('id', `${store.items[numberInStoreARR].id}`);
  buttonBuyNow.setAttribute('id', `${store.items[numberInStoreARR].id}`);

  const description = createHTML(
    'div',
    'description-text',
    `${store.items[numberInStoreARR].description}`,
  );
  productWrapper.append(description);

  buttonBlock.addEventListener('click', buyOnProductPage);
  productImages.addEventListener('click', changeMainImg);
}
