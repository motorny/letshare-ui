/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 *   IMPORTANT: This file is used by the internal build
 *   script `extract-intl`, and must use CommonJS module syntax
 *   You CANNOT use import/export in this file.
 */
const _ = require('lodash');
const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
const enLocaleData = require('react-intl/locale-data/en');
const ruLocaleData = require('react-intl/locale-data/ru');

addLocaleData(enLocaleData);
addLocaleData(ruLocaleData);

const browserLanguagePropertyKeys = [
  'languages',
  'language',
  'browserLanguage',
  'userLanguage',
  'systemLanguage',
];

// prettier-ignore
const appLocales = [
  'EN',
  'RU',
];

const getSystemLocale = () => {
  const defaultLocale = 'EN';
  const systemLocale = _.chain(window.navigator)
    .pick(browserLanguagePropertyKeys)
    .values()
    .flatten()
    .compact()
    .map(x => x.substr(0, 2))
    .find(x => _.includes(appLocales, x.toLocaleUpperCase()))
    .value();
  return systemLocale.toLocaleUpperCase() || defaultLocale;
};

const DEFAULT_LOCALE = getSystemLocale();

exports.appLocales = appLocales;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
