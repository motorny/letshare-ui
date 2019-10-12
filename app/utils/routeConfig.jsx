import React from 'react';

import HomePage from '../containers/HomePage/Loadable';
import LoginPage from '../containers/LoginPage/Loadable';
import RegisterPage from '../containers/RegisterPage/Loadable';
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

const NotFoundRoute = (() => {
  const r = new Route();
  r.path = '';
  r.exact = false;
  r.component = NotFoundPage;
  return r;
})();

const routes = [HomeRoute, LoginRoute, RegisterRoute, NotFoundRoute];

export default routes;
