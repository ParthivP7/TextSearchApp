import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { setInputText } from '../../store/actions/text-search.actions'
import { selectInputText } from '../../store/selectors/text-search.selectors';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {
  // Internal state to store the input text
  @Input() inputText: string = '';
  @Output() inputTextChanged = new EventEmitter<string>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Subscribe to inputText changes from the store
    this.store.select(selectInputText).subscribe((inputText: string) => {
      this.inputText = inputText;
    });
  }

  /**
   * Event handler for input text change.
   * Updates the input text in the store.
   *
   * @param event The input change event.
   */
  onInputChange(event: Event): void {
    if (event.target instanceof HTMLTextAreaElement) {
       // Get the new text from the input event
        const newText = (event.target as HTMLTextAreaElement).value;

        // Dispatch an action to update the input text in the store
        this.store.dispatch(setInputText({ text: newText }));
    }
  }
}
