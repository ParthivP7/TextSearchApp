import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectInputText } from './store/selectors/text-search.selectors';
// import { selectInputText } from './state/text-search.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Internal state
  inputText: string = '';
  queryInputs: string[] = [];
  searchMode: 'batch' | 'online' = 'batch';

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Subscribe to the inputText changes from the store
    this.store.select(selectInputText).subscribe((inputText: string) => {
      this.inputText = inputText;
    });
  }

  onInputTextChange(newInputText: string): void {
    this.inputText = newInputText;
  }

  /**
   * Change the search mode.
   * @param mode The new search mode: 'batch' or 'online'.
   */
  onSearchModeChange(mode: 'batch' | 'online'): void {
    this.searchMode = mode;
  }

  /**
   * Update the query inputs.
   * @param queries The new array of query inputs.
   */
  onQueryInputsChange(queries: string[]): void {
    this.queryInputs = queries;
  }
}
