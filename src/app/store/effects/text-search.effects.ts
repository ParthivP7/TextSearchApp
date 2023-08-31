import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as actions from '../actions/text-search.actions';
import { TextSearchService } from '../../services/text-search-service/text-search.service';
import { selectQueryInputs, selectSearchMode } from '../selectors/text-search.selectors';

@Injectable()
export class TextSearchEffects {
  constructor(private actions$: Actions, private textSearchService: TextSearchService, private store: Store) {}

  searchBatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.setSearchMode),
      withLatestFrom(this.store.select(selectSearchMode), this.store.select(selectQueryInputs)),
      switchMap(([action, searchMode, queryInputs]) => {
        if (searchMode === 'batch' && Array.isArray(queryInputs)) {
          const inputText = ''; // Set the actual input text here
          return this.textSearchService.searchBatch(inputText, queryInputs).pipe(
            map(results => actions.updateResults({ results })),
            catchError(error => of())
          );
        }
        return of();
      })
    )
  );
}
