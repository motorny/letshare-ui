/*
 * NewsPageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { LOAD_MAIN, LOAD_MAIN_SUCCESS, LOAD_MAIN_ERROR } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  search: '',
});

function itemsReducer(state = initialState, action) {
  let search;
  switch (action.type) {
    case LOAD_MAIN:
      search = action.search;
      if (search === undefined)
        search = '';
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false)
        .set('search', search);
    case LOAD_MAIN_SUCCESS:
      return state.set('loading', false).set('data', action.main);
    case LOAD_MAIN_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default itemsReducer;
