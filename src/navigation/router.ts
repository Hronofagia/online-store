import { routes } from './routes';

export default function Routing(): void {
  const hash = window.location.hash.substring(1).replace(/\//gi, '/');
  let route;
  for (let index = 0; index < routes.length - 1; index++) {
    const testRoute = routes[index];
    if (hash === testRoute.url) {
      route = testRoute;
    }
  }
  if (route !== undefined) {
    route.callback();
  } else {
    window.location.href = `/404-page.html`;
  }
}

window.addEventListener('popstate', () => {
  Routing();
});
