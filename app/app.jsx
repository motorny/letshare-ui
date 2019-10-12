/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App/index';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider/index';

// Load the .htaccess file
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

// Load the images
import '!file-loader?name=[name].[ext]!../public/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/logo.svg';
import '!file-loader?name=[name].[ext]!./images/photo.png';
import '!file-loader?name=[name].[ext]!./images/partners_comitet.png';
import '!file-loader?name=[name].[ext]!./images/partners_devfest.png';
import '!file-loader?name=[name].[ext]!./images/partners_polytech.png';
import '!file-loader?name=[name].[ext]!./images/partners_vsm.png';

import '!file-loader?name=[name].[ext]!./images/home-main__background.jpg';
import '!file-loader?name=[name].[ext]!./images/home-solutions__slide_1.jpg';
import '!file-loader?name=[name].[ext]!./images/home-solutions__slide_2.jpg';
import '!file-loader?name=[name].[ext]!./images/home-solutions__slide_3.jpg';
import '!file-loader?name=[name].[ext]!./images/home-solutions__slide_4.jpg';
import '!file-loader?name=[name].[ext]!./images/home-work__background.jpg';
import '!file-loader?name=[name].[ext]!./images/home-community.png';

// Load the fonts
import '!file-loader?name=[name].[ext]!./fonts/Montserrat-Regular.ttf';

import configureStore from './configureStore';

// Import CSS reset and Global Styles
import './global-styles/global-styles';

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/ru.js'),
      ]),
    )
    .then(() => render())
    .catch(err => {
      throw err;
    });
} else {
  render();
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
