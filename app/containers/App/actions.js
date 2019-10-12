/*
 * App Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { GET_USER_DATA_SUCCESS, GET_USER_DATA_ERROR } from './constants';

/**
 * Dispatched when getting user data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GET_USER_DATA_ERROR passing the error
 */
export function userDataGettingError(error) {
  return {
    type: GET_USER_DATA_ERROR,
    error,
  };
}

/**
 * Dispatched when user data is got by the request saga
 *
 * @param  {object} data The current user
 *
 * @return {object} An action object with a type of GET_USER_DATA_SUCCESS passing user data
 */
export function userDataGot(data) {
  return {
    type: GET_USER_DATA_SUCCESS,
    data,
  };
}
