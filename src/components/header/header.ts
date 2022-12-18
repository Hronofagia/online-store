import { createHTML } from '../../utils/createHTML';
import cart from '../../assets/cart.png';

import './header.sass';

export const header = createHTML('header', 'header');
document.body.append(header);
const logo = createHTML('div', 'logo');
header.append(logo);
const logoImg = createHTML('div', 'logo__img');
logo.append(logoImg);
const logoTitle = createHTML('div', 'logo__title', 'online store');
logo.append(logoTitle);
const price = createHTML('div', 'price');
header.append(price);
const priceTitle = createHTML('p', 'price__title', 'Cart total:');
price.append(priceTitle);
const priceNumber = createHTML('p', 'price__number', '2,348 €');
price.append(priceNumber);
const shoppingCart = createHTML('a', 'shopping-cart') as HTMLAnchorElement;
shoppingCart.href = '/#shopping-cart';
const iconContainer = createHTML('div', 'shopping-cart__img');
iconContainer.style.backgroundImage = `url(${cart as string})`;
shoppingCart.append(iconContainer);
header.append(shoppingCart);
