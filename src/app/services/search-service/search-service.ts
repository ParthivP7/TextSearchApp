import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Subject to manage the search button click state
  private searchButtonClickSubject = new BehaviorSubject<boolean>(false);

  // Observable for the search button click state
  searchButtonClick$: Observable<boolean> = this.searchButtonClickSubject.asObservable();

  /**
   * Set the search button click state.
   * @param value - The value to set for the search button click state.
   */
  setSearchButtonClick(value: boolean): void {
    this.searchButtonClickSubject.next(value);
  }

  /**
   * Get an observable for the search button click state.
   * @returns An observable that emits the search button click state.
   */
  getSearchButtonClicked(): Observable<boolean> {
    return this.searchButtonClickSubject.asObservable();
  }
}
