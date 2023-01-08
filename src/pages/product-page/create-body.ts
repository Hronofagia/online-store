import { store } from '../..';
import { createHTML } from '../../utils/createHTML';
import { currentlocalStorage } from '../../utils/localStorage';
// import { buyOnProductPage } from './listener-add-product';
// import { changeMainImg } from './listener-flipping-img';
import { productPageContainer } from './product-page';
import './product-page.sass';

export function createProductPageContent(currantId: string): void {
  const numberId = Number(currantId);

  const productWrapper = createHTML('div', 'product-page-wrapper');
  const productTitle = createHTML(
    'div',
    'product-page-title',
    `Store > ${store.items[numberId].category} > ${store.items[numberId].brand} > ${store.items[numberId].title}`,
  );
  const productImages = createHTML('div', 'product-page-images');
  const productMainImages = createHTML('div', 'product-page-main-imag');
  const blockDescription = createHTML('div', 'product-page-block-description');
  const blockPrice = createHTML('div', 'product-page-block-price');
  productPageContainer?.append(productWrapper);
  productWrapper?.append(productTitle);
  productWrapper?.append(productImages);
  productWrapper?.append(productMainImages);
  productWrapper?.append(blockDescription);
  productWrapper?.append(blockPrice);

  const mainImg = createHTML(
    'img',
    'item-main-imag',
    `${store.items[numberId].thumbnail}`,
  );
  productMainImages?.append(mainImg);

  const images = store.items[numberId].images;

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
    `${store.items[numberId].thumbnail}`,
  );
  ImgItem.setAttribute('id', `${images.length + 1}`);
  productImages.append(ImgWrapper);
  productImages.lastElementChild?.append(ImgItem);

  const title = createHTML(
    'div',
    'description-item',
    `${store.items[numberId].title}`,
  );
  const brand = createHTML(
    'div',
    'description-item',
    `Brand: ${store.items[numberId].brand}`,
  );
  const category = createHTML(
    'div',
    'description-item',
    `Category: ${store.items[numberId].category}`,
  );
  const rating = createHTML(
    'div',
    'description-item',
    `\u2B50 ${store.items[numberId].rating}`,
  );
  const stock = createHTML(
    'div',
    'description-item',
    `Stock: ${store.items[numberId].stock}`,
  );
  const discount = createHTML(
    'div',
    'description-item',
    `- ${store.items[numberId].discountPercentage} %`,
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
    `${store.items[numberId].price} €`,
  );

  const buttonBlock = createHTML('div', 'product-button-block');
  price.append(buttonBlock);

  const buttonAdd = createHTML('button', 'product-button-add', 'ADD TO CART');
  const buttonBuyNow = createHTML('button', 'product-button-buy', 'BUY NOW');
  if (!currentlocalStorage.getProducts().includes(numberId)) {
    buttonAdd.classList.add('active-button');
  }
  buttonBuyNow.classList.add('active-button');
  blockPrice.append(price);
  buttonBlock.append(buttonAdd);
  buttonBlock.append(buttonBuyNow);
  buttonAdd.setAttribute('id', `${currantId}`);
  buttonBuyNow.setAttribute('id', `${currantId}`);

  const description = createHTML(
    'div',
    'description-text',
    `${store.items[numberId].description}`,
  );
  productWrapper.append(description);

  //   buttonBlock.addEventListener('click', buyOnProductPage);
  //   productImages.addEventListener('click', changeMainImg);
}
