import Cookies from 'universal-cookie';
import { DEFAULT_LOCALE, appLocales } from './i18n';

const cookies = new Cookies();

export function setLogined(logined) {
  cookies.set('logined', logined, { path: '/' });
}

export function getLogined() {
  return cookies.get('logined');
}

export function setSession(session) {
  cookies.set('user_session', session, { path: '/' });
}

export function getSession() {
  return cookies.get('user_session');
}

export function rmSession() {
  return cookies.remove('user_session', { path: '/' });
}

export function setLocale(locale) {
  cookies.set('locale', locale, { path: '/' });
}

export function getLocale() {
  const locale = cookies.get('locale');
  return appLocales.includes(locale) ? locale : DEFAULT_LOCALE;
}

export function setUser(username, points, photo_url) {
  const user = JSON.stringify({ username, points, photo_url });
  cookies.set('cur_user', user, { path: '/' });
}

export function getUser() {
  const user = cookies.get('cur_user');
  if (user instanceof Object) return user;
  return { username: 'user', points: 0, photo_url: 'http://museeach.ru/photo.png' };
}

export function rmUser() {
  return cookies.remove('cur_user', { path: '/' });
}
