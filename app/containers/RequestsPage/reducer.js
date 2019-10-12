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
});

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MAIN:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false);
    case LOAD_MAIN_SUCCESS:
      return state.set('loading', false).set('data', action.main);
    case LOAD_MAIN_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default mainReducer;
