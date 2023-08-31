import { TestBed } from '@angular/core/testing';
import { SearchService } from './search-service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the correct value when setSearchButtonClick is called', () => {
    const testValue = true;
    service.setSearchButtonClick(testValue);
    service.searchButtonClick$.subscribe((value) => {
      expect(value).toBe(testValue);
    });
  });

  it('should emit the correct value when getSearchButtonClicked is used', () => {
    const testValue = true;
    service.setSearchButtonClick(testValue);
    service.getSearchButtonClicked().subscribe((value) => {
      expect(value).toBe(testValue);
    });
  });
});
