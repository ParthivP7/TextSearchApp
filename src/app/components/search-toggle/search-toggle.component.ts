import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-toggle',
  templateUrl: './search-toggle.component.html',
})
export class SearchToggleComponent {
  @Output() modeChanged = new EventEmitter<'batch' | 'online'>(); // Emit event to notify parent component

  searchMode: 'batch' | 'online' = 'batch'; // The current search mode

  // Handle mode change event
  onModeChange(mode: 'batch' | 'online'): void {
    this.searchMode = mode; // Update the search mode
    this.modeChanged.emit(mode);
  }
}
