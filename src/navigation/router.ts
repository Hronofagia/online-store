import { routes } from './routes';

export default function Routing(): void {
  const hash = window.location.hash.substring(1).replace(/\//gi, '/');
  let route = routes[routes.length - 1];
  for (let index = 0; index < routes.length - 1; index++) {
    const testRoute = routes[index];
    if (hash === testRoute.url) {
      route = testRoute;
    }
  }
  route.callback();
}

window.addEventListener('popstate', () => {
  Routing();
});
