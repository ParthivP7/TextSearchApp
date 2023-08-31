export interface TextSearchState {
  inputText: string;
  queryInputs: string[];
  searchMode: 'batch' | 'online';
  results: string[];
}

export const initialState: TextSearchState = {
  inputText: 'Bringing a new horizon with Vish',
  queryInputs: [],
  searchMode: 'batch',
  results: []
};
