import { createHTML } from '../../utils/createHTML';
import errorImage from '../../assets/error-404.png';
import './404-page.sass';

export const errorContainer = createHTML('section', 'error_container');
document.querySelector('.main')?.append(errorContainer);
const errorImg = createHTML('img', 'error_img') as HTMLImageElement;
errorImg.src = errorImage;
errorContainer.append(errorImg);
const errorTitle = createHTML('p', 'error_title', 'Page not found');
errorContainer.append(errorTitle);
const errorA = createHTML('a', 'error_a', 'Back to store') as HTMLAnchorElement;
errorA.href = './';
errorContainer.append(errorA);
