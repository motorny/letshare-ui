import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_MAIN, getMainQuery } from './constants';
import { mainLoaded, mainLoadingError } from './actions';

import { requestDataUrl } from '../../utils/constants';

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
  const { res, err } = yield fetchUrl(requestDataUrl, getMainQuery);
  if (err) {
    yield put(mainLoadingError(err));
  } else if (res.data) yield put(mainLoaded(res.data));
  else yield put(mainLoaded(false));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadContentData() {
  yield takeLatest(LOAD_MAIN, loadContent);
}
