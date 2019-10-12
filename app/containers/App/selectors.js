/**
 * App selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state => state.get('user', initialState);

const makeSelectError = () =>
  createSelector(selectUser, mainState => mainState.get('error'));

const makeSelectUserData = () =>
  createSelector(selectUser, mainState => mainState.get('userData'));

export { selectUser, makeSelectError, makeSelectUserData };
