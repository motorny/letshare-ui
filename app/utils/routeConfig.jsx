import React from 'react';

import HomePage from '../containers/HomePage/Loadable';
import LoginPage from '../containers/LoginPage/Loadable';
import RegisterPage from '../containers/RegisterPage/Loadable';
import ItemsPage from '../containers/ItemsPage/Loadable';
import RequestsPage from '../containers/RequestsPage/Loadable';
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

const LoginRoute = (() => {
  const r = new Route();
  r.path = '/login';
  r.exact = false;
  r.component = LoginPage;
  return r;
})();

const RegisterRoute = (() => {
  const r = new Route();
  r.path = '/signup';
  r.exact = false;
  r.component = RegisterPage;
  return r;
})();

const ItemsRoute = (() => {
  const r = new Route();
  r.path = '/products';
  r.exact = true;
  r.component = ItemsPage;
  return r;
})();

const RequestsRoute = (() => {
  const r = new Route();
  r.path = '/requests';
  r.exact = true;
  r.component = RequestsPage;
  return r;
})();

const NotFoundRoute = (() => {
  const r = new Route();
  r.path = '';
  r.exact = false;
  r.component = NotFoundPage;
  return r;
})();

const routes = [HomeRoute, LoginRoute, RegisterRoute, ItemsRoute, RequestsRoute, NotFoundRoute];

export default routes;
