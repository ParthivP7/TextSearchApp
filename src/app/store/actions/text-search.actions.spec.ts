import { setInputText, setQueryInputs, setSearchMode, updateResults } from './text-search.actions';

describe('Text Search Actions', () => {
  it('should create the Set Input Text action', () => {
    const text = 'Sample input text';
    const action = setInputText({ text });

    expect(action.type).toEqual('[Text Search] Set Input Text');
    expect(action.text).toEqual(text);
  });

  it('should create the Set Query Inputs action', () => {
    const queries = ['query1', 'query2'];
    const action = setQueryInputs({ queries });

    expect(action.type).toEqual('[Text Search] Set Query Inputs');
    expect(action.queries).toEqual(queries);
  });

  it('should create the Set Search Mode action', () => {
    const mode = 'batch';
    const action = setSearchMode({ mode });

    expect(action.type).toEqual('[Text Search] Set Search Mode');
    expect(action.mode).toEqual(mode);
  });

  it('should create the Update Results action', () => {
    const results = ['result1', 'result2'];
    const action = updateResults({ results });

    expect(action.type).toEqual('[Text Search] Update Results');
    expect(action.results).toEqual(results);
  });
});
