import { textSearchReducer } from './text-search.reducers';
import { setInputText } from '../actions/text-search.actions';
import { initialState } from '../text-search.state';

describe('Text Search Reducer', () => {
  it('should update inputText when setInputText action is dispatched', () => {
    const newText = 'New input text';
    const action = setInputText({ text: newText });

    const newState = textSearchReducer(initialState, action);

    expect(newState.inputText).toEqual(newText);
  });

  it('should return the same state for an unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const newState = textSearchReducer(initialState, unknownAction as any);

    expect(newState).toBe(initialState);
  });
});
