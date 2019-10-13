import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_MAIN } from './constants';
import { mainLoaded, mainLoadingError } from './actions';

import { requestDataUrl } from '../../utils/constants';
import requests_info from '../../mockups/requests.json';
import requestAuth from '../../utils/requestAuth';

function fetchUrl(url) {
  // url is only the last part of the full path
  return requestAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(res => ({ res }))
    .catch(err => ({ err }));
}

/**
 * Feed data load handler
 */
export function* loadContent() {
  const { res, err } = yield fetchUrl('http://185.91.53.50:5000/req/');
  console.log(res, err);
  if (err) {
    yield put(mainLoadingError(err));
  } else if (res) yield put(mainLoaded(res));
  else yield put(mainLoaded(false));
  // yield put(mainLoaded(requests_info));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadContentData() {
  yield takeLatest(LOAD_MAIN, loadContent);
}
