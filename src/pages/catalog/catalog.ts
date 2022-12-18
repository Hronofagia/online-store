import { createHTML } from '../../utils/createHTML';

export const catalogContainer = createHTML(
  'section',
  'catalog_container',
  'catalog',
);
document.querySelector('.main')?.append(catalogContainer);
