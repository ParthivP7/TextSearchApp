import { TextSearchService } from './text-search.service';
import { of } from 'rxjs';

describe('TextSearchService', () => {
  let service: TextSearchService;

  beforeEach(() => {
    service = new TextSearchService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search and return results with delay for searchBatch', (done) => {
    const inputText = 'This is a sample text for testing';
    const queryInputs = ['sample', 'testing'];

    service.searchBatch(inputText, queryInputs).subscribe((results) => {
      expect(results).toEqual(['sample', 'testing']);
      done();
    });
  });

  it('should search and return results instantly for searchOnline', (done) => {
    const inputText = 'This is a sample text for testing';
    const queryInputs = ['sample', 'testing'];

    service.searchOnline(inputText, queryInputs).subscribe((results) => {
      expect(results).toEqual(['sample', 'testing']);
      done();
    });
  });

  it('should return cached results for subsequent searchBatch calls', (done) => {
    const inputText = 'This is a sample text for testing';
    const queryInputs = ['sample'];

    // Perform initial search
    service.searchBatch(inputText, queryInputs).subscribe(() => {
      // Perform another search with the same query
      service.searchBatch(inputText, queryInputs).subscribe((results) => {
        expect(results).toEqual(['sample']);
        done();
      });
    });
  });

  it('should return cached results for subsequent searchOnline calls', (done) => {
    const inputText = 'This is a sample text for testing';
    const queryInputs = ['sample'];

    // Perform initial search
    service.searchOnline(inputText, queryInputs).subscribe(() => {
      // Perform another search with the same query
      service.searchOnline(inputText, queryInputs).subscribe((results) => {
        expect(results).toEqual(['sample']);
        done();
      });
    });
  });

  it('should not return cached results for different queries', (done) => {
    const inputText = 'This is a sample text for testing';
    const queryInputs = ['sample', 'testing'];

    // Perform initial search
    service.searchBatch(inputText, queryInputs).subscribe(() => {
      // Perform search with a different query
      const differentQueryInputs = ['different'];
      service.searchBatch(inputText, differentQueryInputs).subscribe((results) => {
        expect(results).toEqual([]);
        done();
      });
    });
  });
});
