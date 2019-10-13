import { put, takeLatest, call, select } from 'redux-saga/effects';
import { LOAD_MAIN } from './constants';
import { mainLoaded, mainLoadingError } from './actions';

import { requestDataUrl, urls } from '../../utils/constants';

import items_info from '../../mockups/items.json';
import { makeSelectSearch } from './selectors';
import requestAuth from '../../utils/requestAuth';

/**
 * Feed data load handler
 */
export function* loadContent() {
  const search = (yield select(makeSelectSearch()));
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({find_str: search}),
  };
  try {
    const res = yield call(requestAuth, urls.items.get, options);
    if (res) yield put(mainLoaded(res));
    else yield put(mainLoaded(false));
  } catch (err) {
    yield put(mainLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadContentData() {
  yield takeLatest(LOAD_MAIN, loadContent);
}
