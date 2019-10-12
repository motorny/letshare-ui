/*
 * AppReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { GET_USER_DATA_SUCCESS, GET_USER_DATA_ERROR } from './constants';

export const initialState = fromJS({
  userData: {
    login: '',
  },
  error: false,
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return state.set('userData', action.data);
    case GET_USER_DATA_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default userReducer;
