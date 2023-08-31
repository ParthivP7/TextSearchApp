import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InputTextComponent } from './input-text.component';
import { selectInputText } from '../../store/selectors/text-search.selectors';

@Component({
  selector: 'app-store', // Mock the Store component
  template: '',
})
class MockStoreComponent {}

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;
  let store: MockStore;

  const initialState = {
    textSearch: {
      inputText: 'Initial text',
      queryInputs: [],
      searchMode: 'online',
      results: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTextComponent, MockStoreComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update inputText in the store when input changes', () => {
    const newText = 'New input text';

    // Create a mock input element and trigger input event
    const inputElement = document.createElement('textarea');
    inputElement.value = newText;
    inputElement.dispatchEvent(new Event('input'));

    // Simulate store selectInputText observable subscription
    store.overrideSelector(selectInputText, newText);

    // Trigger ngOnInit and ngOnChanges
    fixture.detectChanges();

    // Assert the inputText is updated
    expect(component.inputText).toBe(newText);
  });
});
