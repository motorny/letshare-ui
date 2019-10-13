import { select, put, takeLatest, call } from 'redux-saga/effects';
import { LOAD_MAIN } from './constants';
import { mainLoaded, mainLoadingError } from './actions';
import { makeSelectUserData } from '../App/selectors';

import { requestDataUrl } from '../../utils/constants';

import items_info from '../../mockups/items.json';
import requestAuth from '../../utils/requestAuth';

/**
 * Feed data load handler
 */
export function* loadContent() {
  const user = yield select(makeSelectUserData());
  console.log(user);
  const body = {
    user_id: user.id,
  };
  const url = 'http://185.91.53.50:5000/item/';
  try {
    const res = yield call(requestAuth, url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    // console.log(res);
    if (res) yield put(mainLoaded(res));
    else yield put(mainLoaded(false));
  } catch (err) {
    yield put(mainLoadingError(err));
  }
  // const { res, err } = yield fetchUrl(requestDataUrl, getMainQuery);
  // if (err) {
  //   yield put(mainLoadingError(err));
  // } else if (res.data) yield put(mainLoaded(res.data));
  // else yield put(mainLoaded(false));

  // yield put(mainLoaded(items_info));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadContentData() {
  yield takeLatest(LOAD_MAIN, loadContent);
}
