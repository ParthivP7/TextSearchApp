import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search-service/search-service';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'query-inputs',
  templateUrl: './query-inputs.component.html',
  styleUrls: ['./query-inputs.component.scss'],
})
export class QueryInputsComponent implements OnInit, OnDestroy {
  @Input() searchMode!: 'batch' | 'online';
  @Output() queriesChanged = new EventEmitter<string[]>(); // Emit event to notify parent component

  // Array to store query inputs
  queryInputs: string[] = [''];

  // Array to store input subscriptions
  private inputSubscriptions: Subscription[] = [];

  constructor(private searchService: SearchService, private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Initialize input subscriptions
    for (let i = 0; i < this.queryInputs.length; i++) {
      const subscription = this.createInputSubscription(i);
      this.inputSubscriptions.push(subscription);
    }
  }

  // Create an input subscription for a given index
  createInputSubscription(index: number): Subscription {
    const inputSubscription = new Subscription();

    // Listen to input events and update the queryInputs array
    const inputElement = this.elementRef.nativeElement.querySelector(`#queryInput${index}`);

    if (inputElement) {
      const inputEventSubscription = this.renderer.listen(inputElement, 'input', (event: Event) => {

        const newQueryInputs = [...this.queryInputs];
        newQueryInputs[index] = (event.target as HTMLInputElement).value;
        this.queryInputs = newQueryInputs;
        this.onQueriesChange(this.queryInputs);
      });
      inputSubscription.add(inputEventSubscription);
    }

    if (!this.inputSubscriptions[index]) {
      this.inputSubscriptions[index] = inputSubscription; // Initialize the subscription
    }

    return inputSubscription;
  }

  // Handle query input change event
  onQueryInputChange(index: number, event: Event): void {
    try {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    const newQueryInputs = [...this.queryInputs];
    newQueryInputs[index] = query;
    this.queryInputs = newQueryInputs;
    this.onQueriesChange(this.queryInputs); // Notify parent component about the change
  } catch (error) {
    console.error("Error occurred during query input change:", error);
  }
}

  // Remove a query input at a specific index
  removeQueryInput(index: number): void {
    const newQueryInputs = [...this.queryInputs];
    newQueryInputs.splice(index, 1);
    this.queryInputs = newQueryInputs;

    if (this.inputSubscriptions[index]) {
      this.inputSubscriptions[index].unsubscribe(); // Unsubscribe from the removed input
      this.inputSubscriptions.splice(index, 1); // Remove the subscription
    }

    this.onQueriesChange(this.queryInputs);
  }

  // Add a new query input
  addQueryInput(): void {
    const newQueryInputs = [...this.queryInputs, ''];
    this.queryInputs = newQueryInputs;

    const lastInputIndex = this.queryInputs.length - 1;
    this.inputSubscriptions[lastInputIndex] = this.createInputSubscription(lastInputIndex); // Update subscription for the new input
  }

  /**
   * Determines whether the "Add Query" button should be disabled.
   * The button is disabled when the last query input is empty.
   * @returns {boolean} True if the button should be disabled, otherwise false.
   */
  isAddButtonDisabled(): boolean {
    const lastInputIndex = this.queryInputs.length - 1;

    if(this.queryInputs[lastInputIndex] !== undefined) {
    const isDisabled = this.queryInputs[lastInputIndex].trim() === '';
    return isDisabled;
    } else  {
      return false;
    }
  }

  // Trigger search action
  search(): void {
    this.searchService.setSearchButtonClick(true); // Set the search button clicked
    this.queriesChanged.emit(this.queryInputs);
  }

  // Notify parent component about queries change
  onQueriesChange(queries: string[]): void {
    this.queriesChanged.emit(queries);
  }

  // TrackBy function for ngFor
  trackByIndex(index: number, item: string): number {
    return index;
  }

  ngOnDestroy(): void {
    try {
      // Unsubscribe from input subscriptions during component destruction
      this.inputSubscriptions.forEach(subscription => subscription.unsubscribe());
    } catch (error) {
      console.error("Error occurred during ngOnDestroy:", error);
    }
  }
}
