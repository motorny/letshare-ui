import { put, takeLatest, call } from 'redux-saga/effects';
import { LOAD_MAIN } from './constants';
import { mainLoaded, mainLoadingError } from './actions';

import { urls } from '../../utils/constants';
import requestAuth from '../../utils/requestAuth';

/**
 * Feed data load handler
 */
export function* loadContent() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  try {
    const res = yield call(requestAuth, urls.req.get, options);
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
