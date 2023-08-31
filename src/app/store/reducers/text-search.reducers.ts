import { Action, createReducer, on } from '@ngrx/store';
import { setInputText } from '../actions/text-search.actions';
import { initialState, TextSearchState } from '../text-search.state';

const _textSearchReducer = createReducer(
  initialState,
  on(setInputText, (state, { text }) => ({
    ...state,
    inputText: text
  }))
);

export function textSearchReducer(state: TextSearchState | undefined, action: Action) {
  return _textSearchReducer(state, action);
}
