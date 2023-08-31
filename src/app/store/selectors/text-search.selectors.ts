import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TextSearchState } from '../text-search.state';

export const selectTextSearchState = createFeatureSelector<TextSearchState>('textSearch');

export const selectInputText = createSelector(
  selectTextSearchState,
  (state: TextSearchState) => state.inputText
);

export const selectQueryInputs = createSelector(
  selectTextSearchState,
  (state: TextSearchState) => state.queryInputs
);

export const selectSearchMode = createSelector(
  selectTextSearchState,
  (state: TextSearchState) => state.searchMode
);
