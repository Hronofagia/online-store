import { createHTML } from '../../utils/createHTML';
import errorImage from '../../assets/error-404.png';
import './404-page.sass';

export const errorContainer = createHTML('section', 'error_container');
document.querySelector('.main')?.append(errorContainer);
const errorImg = createHTML('div', 'error_img');
errorImg.style.backgroundImage = `url(${errorImage as string})`;
errorContainer.append(errorImg);
const errorTitle = createHTML('p', 'error_title', 'Page not found');
errorContainer.append(errorTitle);
