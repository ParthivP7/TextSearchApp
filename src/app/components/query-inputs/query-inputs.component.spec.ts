import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search-service/search-service';
import { QueryInputsComponent } from './query-inputs.component';

describe('QueryInputsComponent', () => {
  let component: QueryInputsComponent;
  let fixture: ComponentFixture<QueryInputsComponent>;
  let mockSearchService: Partial<SearchService>;

  beforeEach(() => {
    mockSearchService = {
      setSearchButtonClick: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [QueryInputsComponent],
      imports: [
        FormsModule
      ],
      providers: [{ provide: SearchService, useValue: mockSearchService }],
    });
    fixture = TestBed.createComponent(QueryInputsComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new query input', () => {
    const initialQueryInputCount = component.queryInputs.length;
    component.addQueryInput();
    expect(component.queryInputs.length).toBe(initialQueryInputCount + 1);
  });

  it('should remove a query input', () => {
    const initialQueryInputCount = component.queryInputs.length;
    const inputIndexToRemove = 0;
    component.removeQueryInput(inputIndexToRemove);
    expect(component.queryInputs.length).toBe(initialQueryInputCount - 1);
  });

  it('should emit queriesChanged event on removing a query input', () => {
    const emitSpy = jest.spyOn(component.queriesChanged, 'emit');
    component.queryInputs = ['query1', 'query2'];
    component.removeQueryInput(0);
    expect(emitSpy).toHaveBeenCalledWith(['query2']);
  });

  it('should call setSearchButtonClick and emit queriesChanged event on search', () => {
    const emitSpy = jest.spyOn(component.queriesChanged, 'emit');
    component.search();
    expect(mockSearchService.setSearchButtonClick).toHaveBeenCalledWith(true);
    expect(emitSpy).toHaveBeenCalledWith(component.queryInputs);
  });

  it('should disable "Add Query" button when last input is empty', () => {
    component.queryInputs = ['non-empty'];
    expect(component.isAddButtonDisabled()).toBe(false);

    component.queryInputs = [''];
    expect(component.isAddButtonDisabled()).toBe(true);
  });

  it('should enable search button for batch mode', () => {
    component.searchMode = 'batch';
    fixture.detectChanges();
    const searchButton = fixture.nativeElement.querySelector('.search-button');
    expect(searchButton.disabled).toBe(false);
  });

  it('should enable search button for online mode', () => {
    component.searchMode = 'online';
    fixture.detectChanges();
    const searchButton = fixture.nativeElement.querySelector('.online-mode');
    expect(searchButton.disabled).toBe(false);
  });


  it('should track items by index in trackByIndex function', () => {
    const result = component.trackByIndex(2, 'query');
    expect(result).toBe(2);
  });


  it('should unsubscribe input subscriptions on destroy', () => {
    fixture.detectChanges();
    const componentInstance = fixture.componentInstance as any;
    const mockSubscription = { unsubscribe: jest.fn() };
    componentInstance.inputSubscriptions = [mockSubscription, mockSubscription];
    componentInstance.ngOnDestroy();
    expect(mockSubscription.unsubscribe).toHaveBeenCalledTimes(2);
  });

});
