import { createHTML } from '../../utils/createHTML';

export const productPageContainer = createHTML(
  'section',
  'product-page_container',
);
document.querySelector('.main')?.append(productPageContainer);
