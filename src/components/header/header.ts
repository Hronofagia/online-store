import { createHTML } from '../../utils/createHTML';
import cart from '../../assets/cart.png';

import './header.sass';

export const header = createHTML('header', 'header');
document.body.append(header);
const logo = createHTML('a', 'logo', 'ONLINE STORE') as HTMLAnchorElement;
logo.href = '/#';
header.append(logo);
const price = createHTML('div', 'price');
header.append(price);
const priceTitle = createHTML('p', 'price__title', 'Cart total:');
price.append(priceTitle);
const priceNumber = createHTML('p', 'price__number', '0 €');
price.append(priceNumber);
const shoppingCart = createHTML('a', 'shopping-cart') as HTMLAnchorElement;
shoppingCart.href = '/#shopping-cart';
header.append(shoppingCart);
const iconContainer = createHTML('div', 'shopping-cart__img');
iconContainer.style.backgroundImage = `url(${cart as string})`;
shoppingCart.append(iconContainer);
