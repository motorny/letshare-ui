import React from 'react';

import HomePage from '../containers/HomePage/Loadable';
import NotFoundPage from '../containers/NotFoundPage/Loadable';

class Route {
  constructor(path, exact, component) {
    this.path = path;
    this.exact = exact;
    this.component = component;
  }
}

const HomeRoute = (() => {
  const r = new Route();
  r.path = '/';
  r.exact = true;
  r.component = HomePage;
  return r;
})();

const NotFoundRoute = (() => {
  const r = new Route();
  r.path = '';
  r.exact = false;
  r.component = NotFoundPage;
  return r;
})();

const routes = [HomeRoute, NotFoundRoute];

export default routes;