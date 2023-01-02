import { routes } from './routes';

export default function Routing(): void {
  const hash = window.location.hash.substring(1).replace(/\//gi, '/');
  console.log(hash);

  let route = routes[1];

  for (let index = 1; index < routes.length; index++) {
    const testRoute = routes[index];
    if (hash === testRoute.url) {
      route = testRoute;
    }
  }

  route.callback();
}

window.addEventListener('popstate', () => {
  console.log('change');

  Routing();
});
