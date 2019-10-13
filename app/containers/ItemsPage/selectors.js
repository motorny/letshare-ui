/**
 * NewsPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFeed = state => state.get('itemsId', initialState);

const makeSelectLoading = () =>
  createSelector(selectFeed, mainState => mainState.get('loading'));

const makeSelectError = () =>
  createSelector(selectFeed, mainState => mainState.get('error'));

const makeSelectData = () =>
  createSelector(selectFeed, mainState => mainState.get('data'));

const makeSelectSearch = () =>
  createSelector(selectFeed, mainState => mainState.get('search'));

export { selectFeed, makeSelectLoading, makeSelectError, makeSelectData, makeSelectSearch };
