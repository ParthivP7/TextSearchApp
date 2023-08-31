import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { HighlightService } from '../../services/highlight-service/highlight-service';
import { SearchService } from '../../services/search-service/search-service';
import { TextSearchService } from '../../services/text-search-service/text-search.service';

@Component({
  selector: 'results-area',
  templateUrl: './results-area.component.html',
})
export class ResultsAreaComponent implements OnChanges, OnDestroy {
  @Input() inputText!: string;
  @Input() queryInputs!: string[];
  @Input() searchMode!: 'batch' | 'online';
  @Input() searchButtonClicked: boolean = false;

  highlightColors: string[] = [];
  results: string[] = [];
  showNoResultMsg = false;
  private searchButtonClickedSubscription!: Subscription;
  private queryRegExpMap: Map<string, RegExp> = new Map();

  constructor(
    private textSearchService: TextSearchService,
    private sanitizer: DomSanitizer,
    private searchService: SearchService,
    private highlightService: HighlightService
  ) {
    this.setupSearchButtonClickSubscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const inputTextChanged = changes['inputText'];
    const queriesChanged = changes['queryInputs'];
    const searchModeChanged = changes['searchMode'];

    if (inputTextChanged || queriesChanged || searchModeChanged) {
      // Handle changes in inputText, queryInputs, or searchMode
      this.handleInputOrQueriesOrSearchModeChange(inputTextChanged !== undefined, searchModeChanged !== undefined);

      if (queriesChanged) {
        this.updateHighlightColors();

        if (this.searchMode === 'batch') {
          this.clearSearchResults();
          this.showNoResultMsg = false;
        }
      }
    }
  }

  private updateHighlightColors(): void {
    this.highlightColors = this.highlightService.generateColors(this.queryInputs.length);
  }

  private handleInputOrQueriesOrSearchModeChange(inputChanged: boolean, searchModeChanged: boolean): void {
    if (inputChanged) {
      // Handle inputText change
      this.clearSearchResults();
      this.textSearchService.clearCachedResults();
    }

    // Handle queryInputs and searchMode changes
    if (this.shouldPerformSearch(inputChanged, searchModeChanged)) {
      this.buildQueryRegExpMap();
      this.updateHighlightColors(); // Centralized color generation
      this.performSearch();
    }
  }

  private shouldPerformSearch(inputChanged: boolean, searchModeChanged: boolean): boolean {
    // Only perform search if in online mode or input/query changes
    return this.searchMode === 'online' || inputChanged || searchModeChanged;
  }

  // Apply highlighting to the search results
  highlightText(result: string): SafeHtml {
    const highlightedResult = this.highlightService.applyHighlight(result, this.queryInputs, this.highlightColors);
    return this.sanitizer.bypassSecurityTrustHtml(highlightedResult);
  }

  private buildQueryRegExpMap(): void {
    // Build a map of query strings to regular expressions for highlighting
    this.queryInputs.forEach((query: string) => {
      this.queryRegExpMap.set(query, new RegExp(query, 'gi'));
    });
  }

  private setupSearchButtonClickSubscription(): void {
    this.subscribeToSearchButtonClick();
  }

  private subscribeToSearchButtonClick(): void {
    this.searchButtonClickedSubscription = this.searchService
      .getSearchButtonClicked()
      .subscribe((clicked) => {
        this.onSearchButtonClicked(clicked);
      });
  }

  private onSearchButtonClicked(clicked: boolean): void {
    this.searchButtonClicked = clicked;
    if (this.searchButtonClicked && this.searchMode === 'batch') {
      this.performSearch(); // perform search
    }
  }

  private clearSearchResults(): void {
    this.results = []; // Empty result set on input text change
  }

  private performSearch(): void {

    const inputText = this.inputText.trim(); // Trim the input text to remove leading/trailing spaces
    this.showNoResultMsg = false; // Reset the error flag at the beginning of the search

    if (!inputText || this.queryInputs.length === 0) {
      this.results = []; // Clear results if inputText is empty or no queryInputs
      return;
    }

    let searchObservable: Observable<string[]>;

    if ((this.searchButtonClicked && this.searchMode === 'batch') || this.searchMode === 'online') {
      if (this.searchButtonClicked && this.searchMode === 'batch') {
        this.searchService.setSearchButtonClick(false);
      }

      searchObservable = this.searchMode === 'batch'
        ? this.textSearchService.searchBatch(inputText, this.queryInputs)
        : this.textSearchService.searchOnline(inputText, this.queryInputs);

      searchObservable.subscribe((results: string[]) => {
        this.results = results;
        this.showNoResultMsg = results.length === 0 || this.queryInputs.length === 0;
      });
    } else {
      this.results = []; // Clear results for unsupported search modes
      return;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeFromSearchButton();
  }

  private unsubscribeFromSearchButton(): void {
    this.searchButtonClickedSubscription.unsubscribe();
  }
}
