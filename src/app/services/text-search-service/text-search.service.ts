import { Injectable } from "@angular/core";
import { catchError, delay, Observable, of } from "rxjs";
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TextSearchService {
  private cachedResults: { [query: string]: string[] } = {}; // Cache of search results

  /**
   * Search for matches in the input text using a batch approach.
   * @param inputText The input text to search within.
   * @param queryInputs An array of query strings to search for.
   * @returns An observable emitting an array of matched strings.
   */
  searchBatch(inputText: string, queryInputs: string[]): Observable<string[]> {
    const results: string[] = [];

    for (const query of queryInputs) {
      if (this.cachedResults[query]) {
        results.push(...this.cachedResults[query]);
      } else {
        const matches = inputText.match(new RegExp(query, 'gi'));
        if (matches) {
          results.push(...matches);
          this.cachedResults[query] = matches;
        }
      }
    }

    return of(results).pipe(
      delay(1000), // Simulate delay with delay operator
      catchError(error => {
        console.error("Error occurred during search:", error);
        return throwError("An error occurred during search.");
      })
    );
  }

  /**
   * Search for matches in the input text using an online approach.
   * @param inputText The input text to search within.
   * @param queryInputs An array of query strings to search for.
   * @returns An observable emitting an array of matched strings.
   */
  searchOnline(inputText: string, queryInputs: string[]): Observable<string[]> {
    const results: string[] = [];

    for (const query of queryInputs) {
      if (this.cachedResults[query]) {
        results.push(...this.cachedResults[query]);
      } else {
        const matches = inputText.match(new RegExp(query, 'gi'));
        if (matches) {
          results.push(...matches);
          this.cachedResults[query] = matches;
        }
      }
    }

    return of(results).pipe(
      catchError(error => {
        console.error("Error occurred during search:", error);
        return throwError("An error occurred during search.");
      })
    );
  }

  /**
   * Clear the cached search results.
   */
  clearCachedResults(): void {
    this.cachedResults = {};
  }
}
