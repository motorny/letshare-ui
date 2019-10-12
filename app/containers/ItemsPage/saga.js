import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_MAIN } from './constants';
import { mainLoaded, mainLoadingError } from './actions';

import { requestDataUrl } from '../../utils/constants';

import items_info from '../../mockups/items.json';

function fetchUrl(url, body) {
  // url is only the last part of the full path
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(res => ({ res }))
    .catch(err => ({ err }));
}

/**
 * Feed data load handler
 */
export function* loadContent() {
  // const { res, err } = yield fetchUrl(requestDataUrl, getMainQuery);
  // if (err) {
  //   yield put(mainLoadingError(err));
  // } else if (res.data) yield put(mainLoaded(res.data));
  // else yield put(mainLoaded(false));
  yield put(mainLoaded(items_info));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadContentData() {
  yield takeLatest(LOAD_MAIN, loadContent);
}
