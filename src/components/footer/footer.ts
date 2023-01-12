import { createHTML } from '../../utils/createHTML';
import gitLogoImage from '../../assets/icon-github.svg';
import rsLogoImage from '../../assets/rs-school.svg';
import './footer.sass';

export const footer = createHTML('footer', 'footer');

const gitContainer = createHTML('div', 'git_container');
footer.append(gitContainer);
const gitLogo = createHTML('div', 'git_logo');
gitLogo.style.backgroundImage = `url(${gitLogoImage as string})`;
gitContainer.append(gitLogo);
const gitNames = createHTML('div', 'git_names');
gitContainer.append(gitNames);
const firstName = createHTML(
  'a',
  'git_name',
  'hronofagia',
) as HTMLAnchorElement;
firstName.href = 'https://github.com/Hronofagia';
gitNames.append(firstName);
const secondName = createHTML(
  'a',
  'git_name',
  'marinakhotko',
) as HTMLAnchorElement;
secondName.href = 'https://github.com/marinakhotko';
gitNames.append(secondName);

const yearOfCreation = createHTML('p', 'year_of_creation', '2023');
footer.append(yearOfCreation);

const rsLogo = createHTML('a', 'rs_logo') as HTMLAnchorElement;
rsLogo.href = 'https://rs.school/js/';
footer.append(rsLogo);
const rsLogoImg = createHTML('img', 'rs_logo__img') as HTMLImageElement;
rsLogoImg.src = rsLogoImage as string;
rsLogo.append(rsLogoImg);
