/*
 * NewsPage Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOAD_MAIN, LOAD_MAIN_SUCCESS, LOAD_MAIN_ERROR } from './constants';

/**
 * Load main data, this action starts the request saga
 *
 *
 * @return {object} An action object with a type of LOAD_MAIN passing the eid
 */
export function loadContent() {
  return {
    type: LOAD_MAIN,
  };
}

/**
 * Dispatched when main data is loaded by the request saga
 *
 * @param  {object} main The current main
 *
 * @return {object} An action object with a type of LOAD_MAIN_SUCCESS passing the main data
 */
export function mainLoaded(main) {
  return {
    type: LOAD_MAIN_SUCCESS,
    main,
  };
}

/**
 * Dispatched when loading main data fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_MAIN_ERROR passing the error
 */
export function mainLoadingError(error) {
  return {
    type: LOAD_MAIN_ERROR,
    error,
  };
}
