import { createAction, props } from '@ngrx/store';

export const setInputText = createAction('[Text Search] Set Input Text', props<{ text: string }>());
export const setQueryInputs = createAction('[Text Search] Set Query Inputs', props<{ queries: string[] }>());
export const setSearchMode = createAction('[Text Search] Set Search Mode', props<{ mode: 'batch' | 'online' }>());
export const updateResults = createAction('[Text Search] Update Results', props<{ results: string[] }>());
