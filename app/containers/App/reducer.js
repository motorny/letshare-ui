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
    username: '',
  },
  error: false,
});

function userReducer(state = initialState, action) {
  let error;
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return state.set('userData', action.data).set('error', false);
    case GET_USER_DATA_ERROR:
      error = "Something went wrong";
      if (action.error !== "Failed to fetch")
        error = action.error;
      return state.set('error', error);
    default:
      return state;
  }
}

export default userReducer;
