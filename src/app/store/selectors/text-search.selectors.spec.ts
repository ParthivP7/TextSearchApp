import { selectInputText, selectQueryInputs, selectSearchMode, selectTextSearchState } from './text-search.selectors';
import { TextSearchState } from '../text-search.state';

describe('Text Search Selectors', () => {
  const initialState: TextSearchState = {
    inputText: 'Initial input text',
    queryInputs: ['query1', 'query2'],
    searchMode: 'batch',
    results: []
  };

  it('selectTextSearchState should return the textSearch state', () => {
    const selectedState = selectTextSearchState.projector(initialState);
    expect(selectedState).toEqual(initialState);
  });

  it('selectInputText should return the inputText', () => {
    const selectedInputText = selectInputText.projector(initialState);
    expect(selectedInputText).toEqual('Initial input text');
  });

  it('selectQueryInputs should return the queryInputs', () => {
    const selectedQueryInputs = selectQueryInputs.projector(initialState);
    expect(selectedQueryInputs).toEqual(['query1', 'query2']);
  });

  it('selectSearchMode should return the searchMode', () => {
    const selectedSearchMode = selectSearchMode.projector(initialState);
    expect(selectedSearchMode).toEqual('batch');
  });
});
